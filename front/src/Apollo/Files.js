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
            status
            expenses {
                month
                year

                title
                value
                date
            }

            incomes {
                month
                year

                title
                value
            }

            limitations {
                month
                year

                value_per_week
                description
                time_per_month
                title
            }
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
