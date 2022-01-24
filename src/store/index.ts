import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { createContext } from "react";
import thunkMiddleware from "redux-thunk";
import PokemonState, { IPokemon } from "./pokemon";

export const PokemonsContext = createContext<
  [IPokemon[], React.Dispatch<React.SetStateAction<IPokemon[]>>] | null
>(null);

const configureStore = (ExtraArgument: Array<any> = []) => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware, ...ExtraArgument);
  const rootReducer = combineReducers({
    pokemon: PokemonState.reducer,
  });

  const store = createStore(rootReducer, {}, middlewareEnhancer);

  return store;
};

const RootStore = configureStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof RootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof RootStore.dispatch;

export default RootStore;
