/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { get } from "lodash";
import React from "react";
import { IPokemon } from "../../store/pokemon";

interface IViewPokemon {
  item?: IPokemon;
}

const StatsPokemon = (props: IViewPokemon) => {
  const { item } = props;

  return (
    <div className="px-2">
      <div className="p-4">
        {item?.detail?.stats?.map((item, key) => (
          <Stats key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

const Stats = (props: any) => {
  return (
    <div className="py-2 flex flex-row flex-grow">
      <div className="w-36 text-gray-500 capitalize">
        {props?.stat?.name?.replaceAll("-", " ")}
      </div>
      <div className="w-12">{props?.base_stat}</div>
      <div className="flex flex-grow flex-shrink-0 items-center justify-center">
        <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full ${
              get(props, "base_stat", 0) > 50 ? "bg-green-500" : "bg-red-500"
            }`}
            css={css`
              width: ${get(props, "base_stat", 0)}%;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsPokemon;
