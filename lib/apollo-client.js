import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
    //   uri: "https://headlessecodev.wpengine.com/graphql",
    //   uri: `${process.env.host}/graphql`,
        uri: `https://cms.datatangente.com/graphql`,
    }),
    cache: new InMemoryCache(),
  });
}

const cache = new InMemoryCache({
  typePolicies: {
    Language: {
      keyFields: ["es", "en"],
    },
  },
});