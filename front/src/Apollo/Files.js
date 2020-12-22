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

export const FILE = gql`
    query($id: ID) {
        file(id: $id) {
            name
            status
        }
    }
`

export const PROCESS_FILE = gql`
    mutation($id: ID) {
        fileProcess(id: $id) {
            status
        }
    }
`;
