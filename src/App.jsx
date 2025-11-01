import React from 'react';
import { PokemonProvider, usePokemonState } from './context/PokemonContext';
import PokemonList from './components/PokemonList';
import PokemonCard from './components/PokemonCard';
import './styles/main.css';

function AppInside() {
  const { selected } = usePokemonState();
  return (
    <div className="app">
      <header><h1>PokéCards 3D Elements</h1></header>
      <main className="main">
        <aside className="left">
          <PokemonList />
        </aside>
        <section className="right">
          <PokemonCard pokemon={selected} />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PokemonProvider>
      <AppInside />
    </PokemonProvider>
  );
}
