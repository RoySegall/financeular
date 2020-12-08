import {gql} from "@apollo/client";

export const FILES = gql`
query {
  me {
    files {
      id
      name
      created_at
    }
  }
}
`;
