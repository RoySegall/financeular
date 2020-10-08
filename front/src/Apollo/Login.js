import {gql} from "@apollo/client";

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
    expires
    refresh_token
  }
}
`;
