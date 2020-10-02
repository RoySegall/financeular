import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, concat} from '@apollo/client';
import {backendAddress} from "./config";

const httpLink = createHttpLink({
  uri: `${backendAddress()}/graphql`
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // todo: check if we have only one mutation - login or refresh token.
  //  If only login - check if the access token is expires or not. If expires, then refresh the token. If not expires -
  //  send the request. In case the token is no longer valid - remove the access token. listen to an event of local
  //  storage changes and if any of them was remove redirect to the front page and raise a nce error to the user.
  //  If only refresh token then continue with the request and don't do anything.

  console.log('a');
  // Add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
