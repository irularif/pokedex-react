/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import usePokemons from "../hooks/usePokemons";
import { useAppSelector } from "../hooks/useStore";
import AboutPokemon from "../ui/about/AboutPokemon";
import EvolutionPokemon from "../ui/about/EvolutionPokemon";
import FindoutPokemon from "../ui/about/FindoutPokemon";
import Header from "../ui/about/Header";
import StatsPokemon from "../ui/about/StatsPokemon";
import pokemonColors from "../utils/pokemon-color";

const tabs = ["About", "Base Stats", "Evolution", "Find Out"];

const Pokemon = () => {
  let params = useParams();
  const { getPokemonDetail } = usePokemons();
  const { items } = useAppSelector((state) => state.pokemon);
  const item = items.find((x) => x.id === Number(params?.id));
  const listInnerRef: any = useRef();
  const [tab, settab] = useState("About");
  const [scrollTop, setscrollTop] = useState(0);

  useEffect(() => {
    if (!!item?.id) {
      getPokemonDetail(Number(params?.id), true);
    }
  }, [item?.id]);

  if (!item) return null;

  const type = get(item, "detail.types.0.type.name", "");
  const color = (pokemonColors as any)[type];

  const onScroll = () => {
    if (listInnerRef.current) {
      setscrollTop(listInnerRef.current.scrollTop);
    }
  };

  return (
    <div
      className="page overflow-hidden flex-1 flex flex-col bg-gray-100"
      css={css`
        background: ${color};
      `}
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <Header item={item} scrollTop={scrollTop} />
      <div className="flex flex-col flex-grow bg-white z-10">
        <div className="flex flex-row border-b border-gray-200">
          {tabs.map((item, key) => (
            <div
              key={key}
              className={`flex-1 p-2 py-3 text-center cursor-pointer rounded-t hover:bg-gray-100 ${
                tab === item
                  ? "border-blue-500 border-b-4 bg-blue-50 font-bold"
                  : ""
              }`}
              onClick={() => settab(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-grow flex-col">
          {
            {
              About: <AboutPokemon item={item} />,
              "Base Stats": <StatsPokemon item={item} />,
              Evolution: <EvolutionPokemon item={item} />,
              "Find Out": <FindoutPokemon item={item} />,
            }[tab]
          }
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
