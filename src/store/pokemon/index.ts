import { cloneDeep } from "@apollo/client/utilities";
import { createSlice } from "@reduxjs/toolkit";

interface BaseName {
  id: number;
  url: string;
  name: string;
}

interface GameIndex {
  game_index: number;
  version: BaseName;
}

interface VersionDetail {
  rarity: number;
  version: BaseName;
}

interface HeldItem {
  item: BaseName;
  version_details: Array<VersionDetail>;
}
interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: BaseName;
  version_group: BaseName;
}
interface Sprite {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
interface Stat {
  base_stat: number;
  effort: number;
  stat: BaseName;
}

interface Type {
  slot: number;
  type: BaseName;
}
interface Move {
  move: BaseName;
  version_group_details: Array<VersionGroupDetail>;
}

interface Ability {
  ability: BaseName;
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonDetail {
  abilities: Array<Ability>;
  base_experience: number;
  forms: Array<BaseName>;
  game_indices: Array<GameIndex>;
  height: number;
  held_items: Array<HeldItem>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<Move>;
  name: string;
  order: number;
  species: BaseName;
  sprites: Sprite;
  stats: Array<Stat>;
  types: Array<Type>;
  weight: number;
  status: boolean;
  message: string;
}

export interface IPokemon {
  id: number;
  image: string;
  artwork: string;
  url: string;
  name: string;
  detail: Partial<IPokemonDetail>;
}

export interface IPokemonStore {
  items: Array<IPokemon>;
  count: number;
  init: boolean;
}

export const initialPokemonStore: IPokemonStore = {
  items: [],
  count: 0,
  init: false,
};

const PokemonState = createSlice({
  name: "pokemon",
  initialState: initialPokemonStore,
  reducers: {
    update(state, action) {
      let nstate = cloneDeep(state);
      Object.assign(nstate, action.payload);
      localStorage.setItem("pokemon", JSON.stringify(nstate));
      return nstate;
    },
    updateItem(state, action) {
      const { id, data } = action.payload;
      let nstate = cloneDeep(state);
      let idx = nstate.items.findIndex((x) => x.id === id);
      if (idx > -1) {
        nstate.items[idx].detail = data;
      }
      localStorage.setItem("pokemon", JSON.stringify(nstate));
      return nstate;
    },
    loadStorage(state, action) {
      let nstore = localStorage.getItem("pokemon");
      let store = cloneDeep(initialPokemonStore);
      if (!!nstore) {
        store = JSON.parse(nstore);
      }
      store.init = true;
      return store;
    },
  },
});

export const PokemonStateAction = PokemonState.actions;

export default PokemonState;
