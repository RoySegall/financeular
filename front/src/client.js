import { ApolloClient, InMemoryCache } from '@apollo/client';
import {backendAddress} from "./config";

export const client = new ApolloClient({
  uri: `${backendAddress()}/graphql`,
  cache: new InMemoryCache()
});
