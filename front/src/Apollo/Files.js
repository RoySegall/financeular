import {gql} from "@apollo/client";

export const FILES = gql`
query {
  files {
    id
    name
    createDate
  }
}
`;
