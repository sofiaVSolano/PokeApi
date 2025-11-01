export default function PokemonListItem({ p, onClick }) {

    return (
        <button className="pokemon-item" onClick={onClick}>
            <img src={p.sprite} alt={p.name} />

            <div className="meta">
                <div className="name">#{p.id} {p.name}</div>
                <div className="types">{p.types.join(' • ')}</div>
            </div>
        </button>
    );
}