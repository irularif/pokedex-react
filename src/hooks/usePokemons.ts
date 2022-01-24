import { useLazyQuery } from "@apollo/client";
import { cloneDeep } from "@apollo/client/utilities";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Client from "../api";
import { GET_POKEMON, GET_POKEMONS, GET_POKEMON_DETAIL } from "../api/query";
import { PokemonsContext } from "../store";
import { IPokemon, PokemonStateAction } from "../store/pokemon";
import fuzzyMatch from "../utils/fuzzy-match";
import { useAppSelector } from "./useStore";

const usePokemons = () => {
  const dispatch = useDispatch();
  const pokemonStore = useAppSelector((state) => state.pokemon);
  const pokemonsCtx = useContext(PokemonsContext);
  if (pokemonsCtx === null) {
    throw new Error(
      "'PokemonsContext' cannot be null, please add 'PokemonsContext' to the root component."
    );
  }
  const limit = 100;
  const [pokemons, setPokemons] = pokemonsCtx;
  const [filter, setfilter] = useState("");
  const [isLoading, setloading] = useState(false);

  const loadMore = () => {
    let filteredItems: any = [];
    let npokemons = cloneDeep(pokemons);
    let nlength = npokemons.length;
    if (!!filter) {
      filteredItems = pokemonStore.items.filter((x) =>
        fuzzyMatch(x.name.replaceAll("-", ""), filter.toLowerCase())
      );
      nlength = filteredItems.length;
    }
    if (nlength === pokemonStore.count) return;
    let start = nlength + 1;
    let end = start + limit;
    if (!!filter) {
      npokemons = npokemons.concat(filteredItems.slice(start, end));
    } else {
      npokemons = npokemons.concat(pokemonStore.items.slice(start, end));
    }
    setPokemons(npokemons);
  };

  const onFilter = (keyword: string = "") => {
    setfilter(keyword);
    if (!keyword) return;
    let filteredItems = pokemonStore.items.filter((x) =>
      fuzzyMatch(x.name.replaceAll("-", " "), keyword.toLowerCase())
    );
    setPokemons(filteredItems.slice(0, limit));
  };

  const getPokemons = () => {
    Client.query({
      query: GET_POKEMONS,
      variables: {
        limit: 10000,
        offset: 0,
      },
    }).then((res) => {
      setloading(res.loading);
      if (res.data?.pokemons?.results?.length) {
        dispatch(
          PokemonStateAction.update({
            items: res.data.pokemons.results,
            count: res.data.pokemons.count,
          })
        );
        setPokemons(res.data?.pokemons?.results.slice(0, limit));
      }
    });
  };

  const getPokemon = (id: number) => {
    let pokemon = pokemonStore.items.find((x) => x.id === id);
    if (pokemon?.detail?.id) {
      return;
    }
    if (!!pokemon) {
      Client.query({
        query: GET_POKEMON,
        variables: {
          name: pokemon?.name,
        },
      }).then((res) => {
        setloading(res.loading);
        if (res.data.pokemon?.id) {
          dispatch(
            PokemonStateAction.updateItem({
              id: pokemon?.id,
              data: res.data.pokemon,
            })
          );
        }
      });
    }
  };

  const getPokemonDetail = (id: number, refresh = false) => {
    let pokemon = pokemonStore.items.find((x) => x.id === id);
    if (pokemon?.detail?.id && !refresh) {
      return;
    }
    if (!!pokemon) {
      Client.query({
        query: GET_POKEMON_DETAIL,
        variables: {
          name: pokemon?.name,
        },
      }).then((res) => {
        setloading(res.loading);
        if (res.data.pokemon?.id) {
          dispatch(
            PokemonStateAction.updateItem({
              id: pokemon?.id,
              data: res.data.pokemon,
            })
          );
        }
      });
    }
  };

  const findPokemon = (name: string): Partial<IPokemon> => {
    let pokemon = pokemonStore.items.find((x) => x.name === name);

    if (!!pokemon?.id) {
      return pokemon;
    }

    return {};
  };

  useEffect(() => {
    if (!!pokemonStore.init && !pokemonStore.count) {
      getPokemons();
    }

    if (!pokemons.length && !!pokemonStore.count) {
      setPokemons(pokemonStore.items.slice(0, limit));
    }
  }, [pokemonStore.init]);

  return {
    pokemons,
    isLoading,
    getPokemon,
    getPokemonDetail,
    setPokemons,
    findPokemon,
    loadMore,
    onFilter,
  };
};

export default usePokemons;
