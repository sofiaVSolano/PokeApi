import Pokemon3DSymbol from "./Pokemon3DSymbol";

export default function PokemonCard({ pokemon }) {

    if (!pokemon) return <div className="empty">Selecciona un pokémon:</div>

    return (
        <div className="pokemon-card">
            <div className="card-left">
                <img src={pokemon.sprite} alt={pokemon.name} />
            </div>

            <div className="card-right">
                <h2>#{pokemon.id} {pokemon.name}</h2>
                <div className="types">{pokemon.types.join(' ,')}</div>
                <div style={{ width: 220, height: 180 }}>
                    <Pokemon3DSymbol types={pokemon.types} />
                </div>
            </div>
        </div>
    )
}