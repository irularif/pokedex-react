/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { get } from "lodash";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IPokemon } from "../../store/pokemon";
import pokemonColors from "../../utils/pokemon-color";

interface IViewPokemon {
  item?: IPokemon;
  scrollTop: number;
}

const Header = (props: IViewPokemon) => {
  const { item, scrollTop } = props;

  if (!item) return null;

  const type = get(item, "detail.types.0.type.name", "");
  const color = (pokemonColors as any)[type];

  return (
    <div className="">
      <div className="absolute inset-x-0 top-0 z-0">
        <img
          src="/bg-patern.png"
          className="w-full h-1/2 opacity-20 z-0"
          alt="Pokédex"
        />
      </div>
      <div
        className={`text-white flex flex-row sticky top-0 p-4 transition-all duration-300 items-center z-20`}
        css={css`
          background: ${scrollTop > 80 ? color : color + "00"};
        `}
      >
        <Link to="/">
          <div className="bg-white bg-opacity-10 p-2 rounded cursor-pointer active:bg-opacity-30">
            <BsArrowLeft className="w-6 h-6" color="#fff" />
          </div>
        </Link>
        <div
          className={`capitalize ml-2 font-bold text-xl flex-1 transition-all ${
            scrollTop > 80 ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.name.replaceAll("-", " ")}
        </div>
        <div
          className={`font-bold my-1 transition-all ${
            scrollTop > 80 ? "opacity-100" : "opacity-0"
          }`}
        >
          #{("00" + item.id).slice(-3)}
        </div>
      </div>
      <div className="flex flex-row text-white px-4 left-14">
        <div className="capitalize mb-2 font-bold text-3xl flex-1">
          {item.name.replaceAll("-", " ")}
        </div>
        <div className="font-bold my-1">#{("00" + item.id).slice(-3)}</div>
      </div>
      <div className="p-4 z-10 flex-1 text-white">
        <div className="flex flex-row">
          {item.detail?.types?.map((type, key) => (
            <div
              key={key}
              className="px-3 rounded-full bg-white bg-opacity-20 capitalize ml-1"
            >
              {type.type?.name}
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center z-0 overflow-x-clip">
        <img
          src="/bg-pokeball.png"
          className="opacity-5 w-80 h-80 z-0"
          alt="Pokédex"
        />
        <div className="h-20 w-full bg-white rounded-t-3xl absolute inset-x-0 bottom-0 z-0 " />
        <div className="absolute top-0 inset-x-0 flex items-center justify-center">
          <span className="animate-ping absolute inline-flex w-80 h-80 rounded-full bg-white opacity-75"></span>
          <img
            src={item.artwork}
            className="w-80 h-80 self-center z-0"
            alt="Pokédex"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
