import React from "react";
import PokeDex3D from "./pages/pokeDex";
import Pokemon3DCard from "./components/Pokemon3DCard";
import { usePokemonState, usePokemonActions } from "./context/PokemonContext";

export default function App() {
  const { selected, loading } = usePokemonState();
  const { dispatch } = usePokemonActions();

  return (
    <div
      className="min-h-screen flex justify-center items-center p-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {loading ? (
        <div
          style={{
            fontSize: "24px",
            color: "#fff",
            backgroundColor: "#2a2a2a",
            padding: "20px 40px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          Cargando pokemones...
        </div>
      ) : (
        <div
          className="flex flex-row items-start gap-12"
          style={{ position: "relative" }}
        >
          {/* Pokédex */}
          <div
            className="flex-shrink-0"
            style={{
              marginLeft: "540px",
              marginTop: "-710px",
            }}
          >
            <PokeDex3D />
          </div>

          {/* Tarjeta 3D */}
          {selected && (
            <div
              className="flex-shrink-0"
              style={{
                width: 400,
                height: 400,
                marginTop: "10px",
                marginLeft: "100px",
              }}
            >
              <Pokemon3DCard
                pokemon={selected}
                onSelect={(p) => dispatch({ type: "SELECT", payload: p })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
