import {ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache} from '@apollo/client';
import {graphql} from '../../generated';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // const accessToken = getAccessToken();
  // if (accessToken) {
  //   operation.setContext({
  //     headers: { 'Authorization': `Bearer ${accessToken}` },
  //   });
  // }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const pageQuery = graphql(`
  query Page($environment: String!, $channel: String!, $path: String!, $token: String) {
    page(environment: $environment, channel: $channel, path: $path, token: $token) {
      name
      data
      containers {
        name
        components {
          name
          content
          properties
        }
      }
      menus {
        name
        items {
          href
          name
        }
      }
    }
  }
`);


