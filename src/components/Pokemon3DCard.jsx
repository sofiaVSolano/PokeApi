import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Html } from "@react-three/drei";
import { useState } from "react";

const TYPE_CONFIG = {
  fire: { color: "#ff6b6b", geometry: "cone", bg: "rgba(222, 15, 15, 0.83)" },
  water: { color: "#4dabf7", geometry: "drop", bg: "rgba(13, 119, 232, 0.88)" },
  grass: { color: "#51cf66", geometry: "leaf", bg: "rgba(17, 234, 68, 0.91)" },
  electric: { color: "#ffd43b", geometry: "bolt", bg: "rgba(219, 169, 19, 0.84)" },
  ice: { color: "#74c0fc", geometry: "crystal", bg: "rgba(20, 218, 218, 0.88)" },
};

function getTrainerInfo(pokemonId) {
  const trainers = [
    { name: "Sofía", age: 19, region: "Johto" },
    { name: "Camilo", age: 24, region: "Kanto" },
    { name: "Natalia", age: 21, region: "Sinnoh" },
    { name: "Bylen", age: 22, region: "Unova" },
    { name: "Valerie", age: 20, region: "Hoenn" },
    { name: "Kevin", age: 20, region: "Kanto" },
    { name: "Delio", age: 22, region: "Unova" },

  ];
  const index = pokemonId % trainers.length;
  return trainers[index];
}

function Emblem({ type }) {
  const config = TYPE_CONFIG[type] || { color: "#999", geometry: "sphere" };

  switch (config.geometry) {
    case "cone":
      return <coneGeometry args={[0.4, 1, 32]} />;
    case "drop":
      return <sphereGeometry args={[0.5, 32, 32]} scale={[1, 1.5, 1]} />;
    case "leaf":
      return <planeGeometry args={[1, 1.0]} />;
    case "bolt":
      return <tetrahedronGeometry args={[0.6]} />;
    case "crystal":
      return <octahedronGeometry args={[0.6, 1]} />;
    default:
      return <sphereGeometry args={[0.5, 32, 32]} />;
  }
}

function PokemonCard3D({ pokemon, hovered, onClick }) {
  if (
    !pokemon ||
    !pokemon.types ||
    !pokemon.sprite ||
    !pokemon.name ||
    !pokemon.id
  ) {
    return null;
  }

  const type = pokemon.types[0].toLowerCase();
  const config = TYPE_CONFIG[type] || {
    color: "#ffcb05",
    bg: "rgba(255, 255, 255, 0.1)",
  };

  const trainer = getTrainerInfo(pokemon.id);

  return (
    <Float rotationIntensity={0.4} floatIntensity={0.5}>
      <group scale={hovered ? 1.1 : 1}>
        {/* Fondo de la tarjeta */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3, 4]} />
          <meshStandardMaterial color={config.color} side={2} />
        </mesh>

        {/* Encabezado: imagen + emblema */}
        <group position={[0, 1.4, 0]}>
          {/* Imagen */}
          <Html position={[-0.9, 0, 0]} center>
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Html>

          {/* Emblema */}
          <mesh position={[0.9, 0, 0]} onClick={onClick}>
            <Emblem type={type} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Nombre y número */}
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.3}
          color="#fff"
          anchorX="center"
          anchorY="middle"
        >
          #{pokemon.id} {pokemon.name}
        </Text>

        {/* Tipos */}
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.2}
          color="#f8f9fa"
          anchorX="center"
          anchorY="middle"
        >
          {pokemon.types.join(" • ")}
        </Text>

        {/* Datos del portador */}
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.2}
          color="#f8f9fa"
          anchorX="center"
          anchorY="middle"
        >
          Portador: {trainer.name}
        </Text>

        <Text
          position={[0, -0.7, 0]}
          fontSize={0.18}
          color="#f8f9fa"
          anchorX="center"
          anchorY="middle"
        >
          Edad: {trainer.age} • Región: {trainer.region}
        </Text>

        <Text
          position={[0, -1.0, 0]}
          fontSize={0.18}
          color="#f8f9fa"
          anchorX="center"
          anchorY="middle"
        >
          Registro: 03/11/2025
        </Text>
      </group>
    </Float>
  );
}

export default function Pokemon3DCard({ pokemon, onSelect }) {
  const [hovered, setHovered] = useState(false);

  const type =
    pokemon && pokemon.types && pokemon.types[0]
      ? pokemon.types[0].toLowerCase()
      : null;

  const bgColor = TYPE_CONFIG[type]?.bg || "rgba(255, 255, 255, 0.1)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: bgColor,
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.4)"
          : "0 8px 20px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease",
        transform: hovered
          ? "scale(1.05) translateX(-620px)"
          : "translateX(-620px)",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <OrbitControls enablePan={false} />
        <PokemonCard3D
          pokemon={pokemon}
          hovered={hovered}
          onClick={() => onSelect(pokemon)}
        />
      </Canvas>
    </div>
  );
}
