import {GraphQLError} from 'graphql';
import {Resolvers} from "./generated/schema";
import {Component, Configuration, initialize, isContainer, isMenu, Reference, Menu, Page} from "@bloomreach/spa-sdk";
import axios from "axios";

import {createRequire} from "module";

const require = createRequire(import.meta.url);

const traverse = require('traverse');

export const resolvers: Resolvers = {
    Query: {
        page: async (_root, {environment, channel, path, segments, token}) => {

            let page: Page
            try {
                page = await initialize({
                    path: path ?? '/',
                    endpoint: `https://${environment}.bloomreach.io/delivery/site/v1/channels/${channel}/pages`,
                    httpClient: axios,
                    // debug: true
                } as Configuration)
            } catch (e) {
                throw notFoundError("no page object found")
            }

            if (!page) {
                throw notFoundError("no page object found")
            }


            //@ts-ignore
            const documentModel = page.getDocument()?.model?.data

            const rootComponent = page?.getComponent()
            //@ts-ignore
            const containers = rootComponent ? flatten(rootComponent.getChildren()).filter(component => isContainer(component.item)) : []

            const menus: [Menu] = getMenus(rootComponent, page);

            return {
                //@ts-ignore
                model: page?.model,
                preview: page.isPreview(),
                //@ts-ignore
                name: `${getComponentName(rootComponent)}`,
                path: path,
                data: documentModel,
                channel: page.getChannelParameters(),
                menus: menus.map((menu: Menu) => {
                    //@ts-ignore
                    return {
                        //@ts-ignore
                        name: menu.getName(),
                        //@ts-ignore
                        items: menu.getItems()?.map(item => {
                            return {
                                //@ts-ignore
                                name: item.getName(),
                                selected: item.isSelected(),
                                expanded: item.isExpanded(),
                                href: item.getUrl()
                            }
                        }) ?? []
                    }
                }),
                containers: containers.map(container => {
                    return {
                        name: container.path,
                        components: container.item.children.map(component => {
                            const componentModel = component.model
                            traverse(componentModel).forEach(function (x) {
                                if (x && x.$ref && x.$ref != null) {
                                    const content = page.getContent(x.$ref)
                                    //@ts-ignore
                                    this.update(content.data ?? content.model?.data ?? content.model ?? content);
                                }
                            });

                            return {
                                name: componentModel.ctype,
                                content: componentModel.content,
                                properties: component.getProperties()
                            }
                        })
                    }

                })
            };
        },

    }
};

function notFoundError(message: string) {
    return new GraphQLError(message, {
        extensions: {code: 'NOT_FOUND'},
    });
}

function unauthorizedError(message: string) {
    return new GraphQLError(message, {
        extensions: {code: 'UNAUTHORIZED'},
    });
}

//@ts-ignore
export function flatten(arr?: [any], parent?: any) {
    return arr ? arr.reduce((result, item) => [
        ...result,
        {
            path: `${parent ? parent + '/' : ''}${item.getName?.()}`,
            type: item.model.type,
            id: item.model.id,
            item: item
        },
        ...flatten(item.getChildren(),
            `${parent ? parent + '/' : ''}${item.getName()}`)
    ], []) : [];
}

//@ts-ignore
export function getMenus(rootComponent: any, page: Page): [Menu] {
    //@ts-ignore
    return rootComponent ? flatten(rootComponent.getChildren()).map(component => {
        const componentItem: Component = component.item;
        //@ts-ignore
        if (componentItem?.model?.componentClass === "org.hippoecm.hst.component.support.bean.dynamic.MenuDynamicComponent") {
            const menuRef = componentItem?.getModels<MenuModels>()?.menu;
            //@ts-ignore
            const menu = menuRef && page?.getContent<BrMenu>(menuRef);
            return menu
        }
        return componentItem
    }).filter((component: Component) => {
        return isMenu(component)
    }) : []
}

export function getComponentName(component: Component) {
    //@ts-ignore
    return component?.model?.meta?.pageTitle ?? component?.model?.label ?? component.getName()
}

export interface MenuModels {
    menu: Reference;
}

