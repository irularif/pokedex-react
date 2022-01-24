import { cloneDeep } from "@apollo/client/utilities";
import { createSlice } from "@reduxjs/toolkit";
import { IPokemon } from "../pokemon";

export interface IMyPokemonStore {
  items: Array<IPokemon>;
}

export const initialMyPokemonStore: IMyPokemonStore = {
  items: [],
};

const MyPokemonState = createSlice({
  name: "my_pokemon",
  initialState: initialMyPokemonStore,
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
      let nstore = localStorage.getItem("mypokemon");
      let store = cloneDeep(initialMyPokemonStore);
      if (!!nstore) {
        store = JSON.parse(nstore);
      }
      return store;
    },
  },
});

export const MyPokemonStateAction = MyPokemonState.actions;

export default MyPokemonState;
