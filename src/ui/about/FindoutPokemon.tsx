/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { get } from "lodash";
import React from "react";
import { IPokemon } from "../../store/pokemon";

interface IViewPokemon {
  item?: IPokemon;
}

const FindoutPokemon = (props: IViewPokemon) => {
  const { item } = props;

  const catchPokemon = () => {
    let rand = Math.floor(Math.random() * 90);
    let win = rand % 2 === 1;
  };

  return (
    <div className="px-2 flex flex-1">
      <div className="p-4 flex-1">
        <div>
          <h1 className="font-bold text-xl capitalize mb-2">
            Catch the {item?.name.replaceAll("-", " ")}
          </h1>
          <p>
            Let's play to get the pokémon {item?.name.replaceAll("-", " ")} and
            collect them all. Hit the pokéball to get the pokémon.
          </p>
        </div>
        <div className="flex-1 py-20 flex items-center justify-center">
          <div
            className="cursor-pointer active:opacity-50"
            onClick={catchPokemon}
          >
            <img
              src="/pokeball.png"
              className="w-40 h-40 animate-bounce"
              alt="Pokédex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindoutPokemon;
