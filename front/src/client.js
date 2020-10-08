import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache, concat} from '@apollo/client';
import {backendAddress} from "./config";
import {getAuthInfo, tokenIsValid} from "./services/auth";
import {createUploadLink} from "apollo-upload-client/public/index";

const httpLink = createUploadLink({
  uri: `${backendAddress()}/graphql`
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // First check if the query includes a refresh or login mutation.
  const definitions = operation.query.definitions;
  let attachRefreshToken = true;

  if (definitions.length === 1) {
    const operation = definitions[0].selectionSet.selections[0].name.value;

    if (['login', 'refresh_token'].includes(operation)) {
      // The query is for login or refreshing the token. No need to attach the access or managing the expiration of the
      // tokens.
      attachRefreshToken = false;
    }
  }

  // First, check if the token has expired or not.
  if (attachRefreshToken) {
    const {accessToken} = getAuthInfo();

    if (tokenIsValid()) {
      // todo: handle here the refresh token.
    }

    // Add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}` || null,
      }
    });
  }

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
