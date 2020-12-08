import {gql} from "@apollo/client";

export const UPLOAD = gql`
mutation($file: Upload!) {
  fileUpload(file:$file) {
    id 
    name 
    path
  }
}
`;
