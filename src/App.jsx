import React from 'react';
import { PokemonProvider, usePokemonState } from './context/PokemonContext';
import PokemonList from './components/PokemonList';
import PokemonCard from './components/PokemonCard';
import './styles/main.css';
import Pokedex from './pages/pokeDex'


export default function App() {
  return (
    <div className='app'> 
      <main>
            <Pokedex />

      </main>
    </div>
  );
}
