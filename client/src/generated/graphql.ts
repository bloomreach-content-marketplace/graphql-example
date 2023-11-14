/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Component = {
  content?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  properties?: Maybe<Scalars['JSON']>;
};

export type Container = {
  components?: Maybe<Array<Maybe<Component>>>;
  name: Scalars['String'];
};

export type Image = {
  id: Scalars['String'];
  src: Scalars['String'];
};

export type Menu = {
  items?: Maybe<Array<Maybe<MenuItem>>>;
  name: Scalars['String'];
};

export type MenuItem = {
  expanded: Scalars['Boolean'];
  href?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<MenuItem>>>;
  name: Scalars['String'];
  selected: Scalars['Boolean'];
};

export type Page = {
  channel?: Maybe<Scalars['JSON']>;
  containers?: Maybe<Array<Maybe<Container>>>;
  data?: Maybe<Scalars['JSON']>;
  layout?: Maybe<Scalars['String']>;
  menus?: Maybe<Array<Maybe<Menu>>>;
  model?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  path: Scalars['String'];
  preview: Scalars['Boolean'];
};

export type Query = {
  page?: Maybe<Page>;
};


export type QueryPageArgs = {
  channel: Scalars['String'];
  environment: Scalars['String'];
  path: Scalars['String'];
  segments?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  token?: InputMaybe<Scalars['String']>;
};

export type PageQueryVariables = Exact<{
  environment: Scalars['String'];
  channel: Scalars['String'];
  path: Scalars['String'];
  token?: InputMaybe<Scalars['String']>;
}>;


export type PageQuery = { page?: { name: string, data?: any | null, containers?: Array<{ name: string, components?: Array<{ name: string, content?: any | null, properties?: any | null } | null> | null } | null> | null, menus?: Array<{ name: string, items?: Array<{ href?: string | null, name: string } | null> | null } | null> | null } | null };


export const PageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Page"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"environment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"environment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"environment"}}},{"kind":"Argument","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"containers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"menus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PageQuery, PageQueryVariables>;