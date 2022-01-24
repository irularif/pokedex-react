import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Pokemon from "./pages/Pokemon";
import Home from "./pages/Home";
import { PokemonsContext } from "./store";
import { IPokemon, PokemonStateAction } from "./store/pokemon";

function App() {
  const dispatch = useDispatch();
  const pokemonsState = useState([] as IPokemon[]);

  useEffect(() => {
    dispatch(PokemonStateAction.loadStorage({}));
  }, []);

  return (
    <PokemonsContext.Provider value={pokemonsState}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </PokemonsContext.Provider>
  );
}

export default App;
