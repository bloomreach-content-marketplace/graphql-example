import {Component, Menu, Page} from "./generated/graphql";

export function getComponentsFromContainer(page: Page | any, name: string): [Component] {
    return page.containers.filter(container => container.name === name).map(container => container.components).flat();
}

export function getMenu(page: Page | any, name: string): Menu | undefined {
    const menus = page.menus.filter(menu => menu.name === name);
    return menus.length === 1 && menus[0]
}
