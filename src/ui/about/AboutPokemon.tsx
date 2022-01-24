import { get } from "lodash";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { IPokemon } from "../../store/pokemon";

interface IViewPokemon {
  item?: IPokemon;
}

const AboutPokemon = (props: IViewPokemon) => {
  const { item } = props;
  const { data: species } = useFetch(item?.detail?.species?.url);

  return (
    <div className="px-2">
      <p className="p-4 text-justify">
        {get(species, "flavor_text_entries.0.flavor_text", "").replaceAll(
          "/\n",
          ""
        )}
      </p>
      <div className="m-4 border border-gray-200 rounded-md p-4 px-8 flex flex-row">
        <div className="flex-1 mr-4 items-center flex flex-col">
          <div className="text-gray-500">Height</div>
          <div className="font-bold">
            {get(item, "detail.height", 0) * 10} cm
          </div>
        </div>
        <div className="flex-1 items-center flex flex-col">
          <div className="text-gray-500">Weight</div>
          <div className="font-bold">
            {get(item, "detail.weight", 0)} lbs (
            {get(item, "detail.weight", 0) * 0.45} kg)
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">Breading</h1>
        <div className="flex flex-row mb-1">
          <div className="text-gray-500 w-28">Egg Groups</div>
          <div className="capitalize font-bold">
            {species?.egg_groups?.map((item: any) => item?.name)?.join(", ")}
          </div>
        </div>
        <div className="flex flex-row mb-1">
          <div className="text-gray-500 w-28">Egg Cycle</div>
          <div className="capitalize font-bold">{species?.habitat?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPokemon;
