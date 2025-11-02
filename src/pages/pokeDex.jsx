// ...existing code...
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { LoadPokedex } from "../scripts/PokedexLogic";
import { fetchPokemons } from "../api/pokeService";

export default function Pokedex() {
    const [pokelist, setPokelist] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await fetchPokemons(10, 0);
                if (!mounted) return;
                const list = Array.isArray(data) ? data : (data.results || []);
                setPokelist(list);
                setCurrent(0);
                console.log("Pokemones", list);
            } catch (err) {
                console.error("Error cargando pokémones:", err);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);
   
    LoadPokedex(pokelist);   

    const togglePokedex = () => {
        setIsOpen(!isOpen);
    };

    const nextPokemon = () => {
        if (pokelist.length > 0) {
            setCurrent((prev) => (prev + 1) % pokelist.length);
        }
    };

    const prevPokemon = () => {
        if (pokelist.length > 0) {
            setCurrent((prev) => (prev - 1 + pokelist.length) % pokelist.length);
        }
    };

    const currentPokemon = pokelist[current];

    if (pokelist.length === 0) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#3647bd',
                color: '#dedede',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '1.5vmax'
            }}>
                Cargando Pokédex...
            </div>
        );
    }

    return (
        <>

            <div className="pokedex" id="pokedex">
                <div className="shadows">
                    <div className="shadow-1"></div>
                    <div className={`shadow-2 ${isOpen ? 'is-shadow-hidden' : ''}`} id="pokedex-shadow"></div>
                </div>

                {/* --------- Base izquierda --------- */}
                <div className="al1">
                    <div className="al1__front face"></div>
                    <div className="al1__back face"></div>
                    <div className="al1__right face"></div>
                    <div className="al1__left face"></div>
                    <div className="al1__top face"></div>
                    <div className="al1__bottom face"></div>
                </div>

                <div className="al2">
                    <div className="al2__front face"></div>
                    <div className="al2__back face"></div>
                    <div className="al2__right face"></div>
                    <div className="al2__left face"></div>
                    <div className="al2__top face"></div>
                    <div className="al2__bottom face"></div>
                </div>

                <div className="al3">
                    <div className="al3__front face"></div>
                    <div className="al3__back face"></div>
                    <div className="al3__right face"></div>
                    <div className="al3__left face"></div>
                    <div className="al3__top face"></div>
                    <div className="al3__bottom face"></div>
                </div>

                {/* --------- Base centro --------- */}
                <div className="wheel flex face">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="wheel-el flex face">
                            <div className="wheel-el__front face"></div>
                            <div className="wheel-el__back face"></div>
                            <div className="wheel-el__right face"></div>
                            <div className="wheel-el__left face"></div>
                            <div className="wheel-el__top face"></div>
                            <div className="wheel-el__bottom face"></div>
                        </div>
                    ))}
                </div>

                {/* --------- Base derecha --------- */}
                <div
                    className={`cover ${isOpen ? 'is-pokedex-open' : ''}`}
                    id="pokedex-cover"
                    onClick={togglePokedex}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="ar1">
                        <div className="ar1__front face"></div>
                        <div className="ar1__back face"></div>
                        <div className="ar1__right face"></div>
                        <div className="ar1__left face"></div>
                        <div className="ar1__top face">
                            {/* --------- Contenido derecha --------- */}
                            <div className="screen-right">
                                <h2 className="pokemon-author" id="pokemon-author"></h2>
                            </div>

                            <div className="buttons-right-1">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="button-right">
                                        <div className="button-right__front face"></div>
                                        <div className="button-right__back face"></div>
                                        <div className="button-right__right face"></div>
                                        <div className="button-right__left face"></div>
                                        <div className="button-right__top face"></div>
                                        <div className="button-right__bottom face"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="buttons-right-2">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="button-right">
                                        <div className="button-right__front button-right__front--white face"></div>
                                        <div className="button-right__back button-right__back--white face"></div>
                                        <div className="button-right__right button-right__right--white face"></div>
                                        <div className="button-right__left button-right__left--white face"></div>
                                        <div className="button-right__top button-right__top--white face"></div>
                                        <div className="button-right__bottom button-right__bottom--white face"></div>
                                    </div>
                                ))}
                                <div className="button-right">
                                    <div className="button-right__front button-right__front--yellow face"></div>
                                    <div className="button-right__back button-right__back--yellow face"></div>
                                    <div className="button-right__right button-right__right--yellow face"></div>
                                    <div className="button-right__left button-right__left--yellow face"></div>
                                    <div className="button-right__top button-right__top--yellow face"></div>
                                    <div className="button-right__bottom button-right__bottom--yellow face"></div>
                                </div>
                            </div>

                            <div className="buttons-right-3">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="button-large">
                                        <div className="button-large__front face"></div>
                                        <div className="button-large__back face"></div>
                                        <div className="button-large__right face"></div>
                                        <div className="button-large__left face"></div>
                                        <div className="button-large__top face"></div>
                                        <div className="button-large__bottom face"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ar1__bottom face"></div>
                    </div>
                    <div className="ar2">
                        <div className="ar2__front face"></div>
                        <div className="ar2__back face"></div>
                        <div className="ar2__right face"></div>
                        <div className="ar2__left face"></div>
                        <div className="ar2__top face"></div>
                        <div className="ar2__bottom face"></div>
                    </div>
                </div>

                {/* --------- Contenido izquierda --------- */}
                <div className="screen-left">
                    <div className="screen-left__front face"></div>
                    <div className="screen-left__back face"></div>
                    <div className="screen-left__right face"></div>
                    <div className="screen-left__left face"></div>
                    <div className="screen-left__top face">
                        <div className={`pokemon ${!isOpen ? 'is-pokemon-hidden' : ''}`} id="pokemon">
                            <a className="pokemon-url" href="#" onClick={(e) => e.preventDefault()}>
                                <h1 className="pokemon-name" id="pokemon-name">
                                    {currentPokemon ? `#${currentPokemon.id} ${currentPokemon.name}` : ''}
                                </h1>
                                {currentPokemon && (
                                    <img
                                        className="pokemon-image"
                                        id="pokemon-image"
                                        src={currentPokemon.sprite}
                                        alt={currentPokemon.name}
                                        key={current}
                                    />
                                )}
                            </a>
                        </div>
                        <div className="pokemon-tags">
                            {currentPokemon && currentPokemon.types.map((type, i) => (
                                <span key={i} className="pokemon-tag">{type}</span>
                            ))}
                        </div>
                    </div>
                    <div className="screen-left__bottom face"></div>
                </div>

                <div className="screen-left-2">
                    <div className="screen-left-2__front face"></div>
                    <div className="screen-left-2__back face"></div>
                    <div className="screen-left-2__right face"></div>
                    <div className="screen-left-2__left face"></div>
                    <div className="screen-left-2__top face">
                        <p className={`pokemon-number ${!isOpen ? 'is-pokemon-hidden' : ''}`} id="pokemon-number"></p>
                    </div>
                    <div className="screen-left-2__bottom face"></div>
                </div>

                <div className="arrows">
                    <div className="arrow-h">
                        <div className="arrow-h__front face"></div>
                        <div className="arrow-h__back face"></div>
                        <div className="arrow-h__right face"></div>
                        <div className="arrow-h__left face"></div>
                        <div className="arrow-h__top face">
                            <a
                                className="arrow-back"
                                id="arrow-back"
                                href="#"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevPokemon(); }}
                            >
                                &lt;
                            </a>
                            <a
                                className="arrow-next"
                                id="arrow-next"
                                href="#"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextPokemon(); }}
                            >
                                &gt;
                            </a>
                        </div>
                        <div className="arrow-h__bottom face"></div>
                    </div>
                    <div className="arrow-v">
                        <div className="arrow-v__front face"></div>
                        <div className="arrow-v__back face"></div>
                        <div className="arrow-v__right face"></div>
                        <div className="arrow-v__left face"></div>
                        <div className="arrow-v__top face"></div>
                        <div className="arrow-v__bottom face"></div>
                    </div>
                </div>

                <div className="led"></div>
                <div className="led-a"></div>
                <div className="led-b"></div>
                <div className="led-c"></div>
            </div>
        </>
    );
}
