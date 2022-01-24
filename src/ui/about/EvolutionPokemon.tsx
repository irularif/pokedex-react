/** @jsxImportSource @emotion/react */
import { useLazyQuery, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { get } from "lodash";
import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { GET_EVOLUTION, GET_POKEMON_DETAIL } from "../../api/query";
import useFetch from "../../hooks/useFetch";
import usePokemons from "../../hooks/usePokemons";
import { IPokemon } from "../../store/pokemon";

interface IViewPokemon {
  item?: IPokemon;
}

const EvolutionPokemon = (props: IViewPokemon) => {
  const { item } = props;
  const { data, isLoading } = useFetch(
    `https://pokeapi.co/api/v2/evolution-chain/${item?.id}/`
  );

  const evolutions: any = [];
  const generateEvo = (data: any) => {
    if (data?.evolves_to?.length) {
      const from = data.species;
      const to = get(data, "evolves_to.0.species", {});
      const evolution_detail = get(
        data,
        "evolves_to.0.evolution_details.0",
        {}
      );

      evolutions.push({
        from,
        to,
        evolution_detail,
      });
      generateEvo(get(data, "evolves_to.0"));
    }
  };
  generateEvo(data?.chain);

  return (
    <div className="px-2">
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">Evolution Chain</h1>
        {evolutions.map((item: any, key: number) => (
          <Evolution key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

const Evolution = (props: any) => {
  const { findPokemon } = usePokemons();
  const { from, to, evolution_detail } = props;
  const pokemonFrom = findPokemon(from.name);
  const pokemonTo = findPokemon(to.name);

  return (
    <div className="border-b border-gray-100 py-8 flex">
      <div className="flex flex-col items-center justify-center flex-1">
        <img
          src={pokemonFrom?.artwork}
          className="w-40 h-40"
          alt={pokemonFrom.name}
        />
        <div className="capitalize">
          {pokemonFrom?.name?.replaceAll("-", " ")}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <BsArrowRight className="w-6 h-6 text-gray-400" />
        <div className="font-bold">Lvl {evolution_detail?.min_level}</div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <img
          src={pokemonTo?.artwork}
          className="w-40 h-40"
          alt={pokemonTo.name}
        />
        <div className="capitalize">
          {pokemonTo?.name?.replaceAll("-", " ")}
        </div>
      </div>
    </div>
  );
};

export default EvolutionPokemon;
