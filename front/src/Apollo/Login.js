import {gql} from "@apollo/client";
import {clientId, clientSecret} from "../config";

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(email: $username, password: $password, client_id: "${clientId}", client_secret: "${clientSecret}") {
    accessToken
    expires
  }
}
`;
