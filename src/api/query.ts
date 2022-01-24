import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
        artwork
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          id
          url
          name
        }
        is_hidden
        slot
      }
      base_experience
      forms {
        id
        url
        name
      }
      game_indices {
        game_index
        version {
          id
          url
          name
        }
      }
      height
      held_items {
        item {
          id
          url
          name
        }
        version_details {
          rarity
          version {
            id
            url
            name
          }
        }
      }
      id
      is_default
      location_area_encounters
      moves {
        move {
          id
          url
          name
        }
        version_group_details {
          level_learned_at
          move_learn_method {
            id
            url
            name
          }
          version_group {
            id
            url
            name
          }
        }
      }
      name
      order
      species {
        id
        url
        name
      }
      sprites {
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      stats {
        base_stat
        effort
        stat {
          id
          url
          name
        }
      }
      types {
        slot
        type {
          id
          url
          name
        }
      }
      weight
      status
      message
    }
  }
`;

export const GET_EVOLUTION = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      params
      status
      message
      response
    }
  }
`;
