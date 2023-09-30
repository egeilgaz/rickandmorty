import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query characters($page: Int, $name: String) {
    characters(page: $page, filter:{name: $name} ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        id
        location {name}
        image
      }
    }
  }
`;