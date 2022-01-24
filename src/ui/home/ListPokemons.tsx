import React from "react";
import usePokemons from "../../hooks/usePokemons";
import Pokemon from "./Pokemon";

const ListPokemons = () => {
  const { pokemons, isLoading } = usePokemons();

  if (isLoading) {
    let array = new Array(10);
    for (let index = 0; index < 10; index++) {
      array[index] = index + 1;
    }

    return (
      <div className="m-4">
        <div className="grid grid-cols-2 gap-4">
          {array.map((key) => (
            <Pokemon key={key} loading={true} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 gap-4">
        {pokemons.map((item: any, key) => (
          <Pokemon key={key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListPokemons;
