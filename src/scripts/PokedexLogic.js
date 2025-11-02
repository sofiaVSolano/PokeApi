import { useEffect } from "react";

export function LoadPokedex(pokelist = []) {
  useEffect(() => {
    if (!pokelist.length) return;

    const b = document.body;

    const pokemon = document.querySelector("#pokemon");
    const pokedex = document.querySelector("#pokedex");
    const pokedexCover = document.querySelector("#pokedex-cover");
    const pokedexShadow = document.querySelector("#pokedex-shadow");
    const pokemonAuthor = document.querySelector("#pokemon-author");
    const arrowBack = document.querySelector("#arrow-back");
    const arrowNext = document.querySelector("#arrow-next");
    const pokemonNumber = document.querySelector("#pokemon-number");
    const pokemonName = document.querySelector("#pokemon-name");
    const pokemonImage = document.querySelector("#pokemon-image");
    const pokemonTag = document.querySelectorAll(".pokemon-tag");

    let con = -1;
    let cover = 0;

    // 🔹 Movimiento 3D de la Pokédex
    const pokedexFunc = (e) => {
      const x = e.pageX / window.innerWidth - 0.5;
      const y = e.pageY / window.innerHeight - 0.5;

      pokedex.style.transform = `
        perspective(10000px)
        rotateX(${y * 10 + 55}deg)
        rotateZ(${-x * 10 + 25}deg)
        translateZ(-5vw)
      `;
    };

    // 🔹 Mostrar Pokémon actual
    const getPokemonFunc = (e) => {
      if (e && e.currentTarget) {
        if (e.currentTarget.id === "arrow-next" && con < pokelist.length - 1) con++;
        else if (e.currentTarget.id === "arrow-back" && con > 0) con--;
      }

      if (con >= 0 && pokelist[con]) {
        pokemonNumber.innerText = pokelist[con].number || `#${con + 1}`;
        pokemonName.innerText = pokelist[con].name;
        pokemonImage.src = pokelist[con].sprite;
        pokemonTag[0].innerText = pokelist[con].types || "Type";
        pokemonTag[1].innerText = pokelist[con].types || "";
      }
    };

    // 🔹 Animación de apertura y cierre de la Pokédex
    const pokedexCoverFunc = () => {
      if (cover % 2 === 0) {
        pokemon.classList.remove("is-pokemon-hidden");
        pokemonNumber.classList.remove("is-pokemon-hidden");
        pokemonAuthor.classList.remove("is-pokemon-hidden");
        pokedexCover.classList.remove("is-pokedex-open");
        pokedexShadow.classList.remove("is-shadow-hidden");
      } else {
        pokemon.classList.add("is-pokemon-hidden");
        pokemonNumber.classList.add("is-pokemon-hidden");
        pokemonAuthor.classList.add("is-pokemon-hidden");
        pokedexCover.classList.add("is-pokedex-open");
        pokedexShadow.classList.add("is-shadow-hidden");

        pokemonNumber.innerText = "";
        pokemonName.innerText = "";
        pokemonImage.src = "";
        pokemonTag[0].innerText = "";
        pokemonTag[1].innerText = "";
        con = -1;
      }
      cover++;
    };

    // 🔹 Event listeners
    b.addEventListener("pointermove", pokedexFunc);
    pokedexCover.addEventListener("click", pokedexCoverFunc);
    arrowNext.addEventListener("click", getPokemonFunc);
    arrowBack.addEventListener("click", getPokemonFunc);

    // 🔹 Cleanup para evitar fugas de memoria
    return () => {
      b.removeEventListener("pointermove", pokedexFunc);
      pokedexCover.removeEventListener("click", pokedexCoverFunc);
      arrowNext.removeEventListener("click", getPokemonFunc);
      arrowBack.removeEventListener("click", getPokemonFunc);
    };
  }, [pokelist]);
}
