import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const typeDefs = gql`
  type BaseResponse {
    message: String
    status: Boolean
    response: JSON
    params: JSON
  }

  type BaseList {
    count: Int
    next: String
    previous: String
    results: [BaseName]
    status: Boolean
    message: String
  }

  type Ability {
    ability: BaseName
    is_hidden: Boolean
    slot: Int
  }

  type GameIndex {
    game_index: Int
    version: BaseName
  }

  type VersionDetail {
    rarity: Int
    version: BaseName
  }

  type HeldItem {
    item: BaseName
    version_details: [VersionDetail]
  }

  type VersionGroupDetail {
    level_learned_at: Int
    move_learn_method: BaseName
    version_group: BaseName
  }

  type Move {
    move: BaseName
    version_group_details: [VersionGroupDetail]
  }

  type Sprite {
    back_default: String
    back_female: String
    back_shiny: String
    back_shiny_female: String
    front_default: String
    front_female: String
    front_shiny: String
    front_shiny_female: String
  }

  type Stat {
    base_stat: Int
    effort: Int
    stat: BaseName
  }

  type Type {
    slot: Int
    type: BaseName
  }

  type BaseName {
    id: Int
    url: String
    name: String
  }

  type Pokemon {
    abilities: [Ability]
    base_experience: Int
    forms: [BaseName]
    game_indices: [GameIndex]
    height: Int
    held_items: [HeldItem]
    id: Int
    is_default: Boolean
    location_area_encounters: String
    moves: [Move]
    name: String
    order: Int
    species: BaseName
    sprites: Sprite
    stats: [Stat]
    types: [Type]
    weight: Int
    status: Boolean
    message: String
  }

  type PokemonItem {
    id: Int
    url: String
    name: String
    image: String
    artwork: String
    dreamworld: String
  }

  type PokemonList {
    count: Int
    next: String
    previous: String
    nextOffset: Int
    prevOffset: Int
    params: JSON
    results: [PokemonItem]
    status: Boolean
    message: String
  }

  type Query {
    abilities: BaseList
    ability(ability: String!): BaseResponse
    berries: BaseList
    berry(berry: String!): BaseResponse
    eggGroups: BaseList
    eggGroup(eggGroup: String!): BaseResponse
    encounterMethods: BaseList
    encounterMethod(encounterMethod: String!): BaseResponse
    evolutionChains: BaseList
    evolutionChain(id: String!): BaseResponse
    evolutionTriggers: BaseList
    evolutionTrigger(name: String!): BaseResponse
    genders: BaseList
    gender(gender: String!): BaseResponse
    growthRates: BaseList
    growthRate(growthRate: String!): BaseResponse
    locations: BaseList
    location(location: String!): BaseResponse
    moves: BaseList
    move(move: String!): BaseResponse
    natures: BaseList
    nature(nature: String!): BaseResponse
    pokemons(limit: Int, offset: Int): PokemonList
    pokemon(name: String!): Pokemon
    regions: BaseList
    region(region: String!): BaseResponse
    species: BaseList
    types: BaseList
  }
`;

const Client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  name: "Pokemon",
  version: "2",
  typeDefs,
});

export default Client;
