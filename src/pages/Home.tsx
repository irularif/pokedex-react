/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import usePokemons from "../hooks/usePokemons";
import ListPokemons from "../ui/home/ListPokemons";

function Home() {
  const { onFilter, loadMore } = usePokemons();

  const listInnerRef: any = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore();
      }
    }
  };

  return (
    <div
      className="page overflow-hidden flex-1 bg-gray-100"
      onScroll={() => onScroll()}
      ref={listInnerRef}
    >
      <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden">
        <img
          src="/bg-pokeball.png"
          className="opacity-5 -top-14 -right-14 absolute"
          alt="Pokédex"
        />
      </div>
      <div className="m-4">
        <div className="font-bold text-3xl mb-1">Pokédex</div>
        <div className="text-gray-500">
          Pokedex gives you easy access to the info of Pokémons, like its type,
          height, weight, and evolutions, and go from there to explore a rich
          trove of Pokémon details.
        </div>
      </div>
      <div className="sticky top-4 m-4 mb-8 z-10">
        <div className="flex items-center text-gray-500 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <BsSearch className="text-gray-500" />
          </span>
          <input
            className="h-10 pl-9 bg-gray-50 border border-gray-200 rounded-md flex-1 shadow-md focus:bg-white"
            placeholder="Search pokemons by name"
            css={css`
              ::-webkit-input-placeholder {
                font-style: italic;
              }
              :-moz-placeholder {
                font-style: italic;
              }
              ::-moz-placeholder {
                font-style: italic;
              }
              :-ms-input-placeholder {
                font-style: italic;
              }
            `}
            onChange={(e) => onFilter(e.target.value)}
          />
        </div>
      </div>
      <ListPokemons />
    </div>
  );
}

export default Home;
