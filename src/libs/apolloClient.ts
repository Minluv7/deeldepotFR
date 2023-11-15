import { ApolloClient, DefaultOptions, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// @ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// if we want no cache
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
      ...headers,
    },
  };
});


const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  headers: {
    // "keep-alive": "true"
  }
});


export const client = new ApolloClient({
  link: authLink.concat(uploadLink), // Replace with your Strapi GraphQL endpoint
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  connectToDevTools: true
});