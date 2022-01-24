/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { get } from "lodash";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import usePokemons from "../../hooks/usePokemons";
import { useAppSelector } from "../../hooks/useStore";
import { IPokemon } from "../../store/pokemon";
import pokemonColors from "../../utils/pokemon-color";

interface IViewPokemon {
  item?: IPokemon;
  loading?: boolean;
}

const Pokemon = (props: IViewPokemon) => {
  const { getPokemon, isLoading } = usePokemons();

  const { items } = useAppSelector((state) => state.pokemon);
  const item = items.find((x) => x.id === props.item?.id);

  useEffect(() => {
    if (item?.id) {
      getPokemon(item.id);
    }
  }, []);

  if (props.loading || isLoading) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 relative h-36 shadow">
        <Skeleton
          width={80}
          baseColor="rgb(243 244 246)"
          highlightColor="#fff"
        />
        <Skeleton
          width={70}
          baseColor="rgb(243 244 246)"
          highlightColor="#fff"
        />
        <Skeleton
          width={70}
          baseColor="rgb(243 244 246)"
          highlightColor="#fff"
        />
        <div className="absolute bottom-0 right-0 m-1">
          <Skeleton
            width={60}
            height={60}
            baseColor="rgb(243 244 246)"
            highlightColor="#fff"
            className="rounded-md"
          />
        </div>
      </div>
    );
  }

  if (!item) return null;

  const type = get(item, "detail.types.0.type.name", "");
  const color = (pokemonColors as any)[type];

  return (
    <Link to={`/pokemon/${item.id}`}>
      <div
        className={`bg-gray-200 rounded-lg p-4 relative h-36 shadow flex flex-col items-start text-white cursor-pointer active:opacity-80`}
        css={css`
          background: ${color};
        `}
      >
        <div className="capitalize mb-2 font-bold">
          {item.name.replaceAll("-", " ")}
        </div>
        {item.detail?.types?.map((type, key) => (
          <div
            key={key}
            className="px-2 text-sm rounded-full bg-white bg-opacity-20 capitalize mb-1"
          >
            {type.type?.name}
          </div>
        ))}
        <div className="absolute bottom-0 right-0 overflow-hidden">
          <img src={item.artwork} className="w-24 h-24" alt={item.name} />
        </div>
      </div>
    </Link>
  );
};

export default Pokemon;
