import { usePokemonState, usePokemonActions } from '../context/PokemonContext';
import PokemonListItem from './PokemonListItem';

export default function PokemonList() {

    const { pokemons, loading, error } = usePokemonState();
    const { dispatch } = usePokemonActions();

    if (loading) return <div className="loading">Cargando...</div>;

    if (error) return <div className="error">Error:{error}</div>;


    return (
        <div className="pokemon-list">
            {pokemons.map(p => (
                <PokemonListItem key={p.id} p={p} onClick={() => dispatch({ type: 'SELECT', payload: p })} />
            ))}
        </div>
    );
}