import {gql} from "@apollo/client";

export const UPLOAD = gql`
mutation($file: Upload!) {
  uploadFile(file:$file) {
    status
    message
    fileId
  }
}
`;
