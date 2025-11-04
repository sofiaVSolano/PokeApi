import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text, Html } from "@react-three/drei";
import { useState } from "react";

const TYPE_CONFIG = {
  fire: { 
    color: "#ff6b6b", 
    geometry: "cone", 
    bg: "linear-gradient(135deg, rgba(255, 107, 107, 0.95), rgba(239, 35, 60, 0.85))",
    glow: "#ff3838",
    accent: "#ff9999"
  },
  water: { 
    color: "#4dabf7", 
    geometry: "drop", 
    bg: "linear-gradient(135deg, rgba(77, 171, 247, 0.95), rgba(13, 119, 232, 0.85))",
    glow: "#1e90ff",
    accent: "#74c0fc"
  },
  grass: { 
    color: "#51cf66", 
    geometry: "leaf", 
    bg: "linear-gradient(135deg, rgba(81, 207, 102, 0.95), rgba(17, 234, 68, 0.85))",
    glow: "#00ff00",
    accent: "#8ce99a"
  },
  electric: { 
    color: "#ffd43b", 
    geometry: "bolt", 
    bg: "linear-gradient(135deg, rgba(255, 212, 59, 0.95), rgba(219, 169, 19, 0.85))",
    glow: "#ffea00",
    accent: "#ffe066"
  },
  ice: { 
    color: "#74c0fc", 
    geometry: "crystal", 
    bg: "linear-gradient(135deg, rgba(116, 192, 252, 0.95), rgba(20, 218, 218, 0.85))",
    glow: "#00e5ff",
    accent: "#a5d8ff"
  },
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
    glow: "#ffffff",
    accent: "#ffffff"
  };

  const trainer = getTrainerInfo(pokemon.id);

  return (
    <Float rotationIntensity={0.5} floatIntensity={0.8} speed={2}>
      <group scale={hovered ? 1.15 : 1}>
¿        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[3.4, 4.8]} />
          <meshStandardMaterial 
            color={config.color} 
            side={2}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Capa oscura de fondo */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[3.1, 4.5]} />
          <meshStandardMaterial 
            color="#0f0f1e" 
            side={2}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>

        {/* Brillo dependiendo del color del pokemon */}
        <mesh position={[0, 2, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[3.1, 0.6]} />
          <meshStandardMaterial 
            color="#ffffff" 
            opacity={0.12}
            transparent
            side={2}
          />
        </mesh>

        {/* Marco superior */}
        <mesh position={[0, 1.9, -0.01]}>
          <planeGeometry args={[3.1, 0.08]} />
          <meshStandardMaterial 
            color={config.accent}
            opacity={0.6}
            transparent
          />
        </mesh>

        {/* imagen del Pokémon */}
        <group position={[0, 1.2, 0.05]}>
          {/* Círculo decorativo de fondo */}
          <mesh position={[0, 0, -0.03]}>
            <circleGeometry args={[0.75, 64]} />
            <meshStandardMaterial 
              color={config.color} 
              opacity={0.25} 
              transparent 
            />
          </mesh>
          
          {/* Anillo en pokémon */}
          <mesh position={[0, 0, -0.02]}>
            <ringGeometry args={[0.7, 0.75, 64]} />
            <meshStandardMaterial 
              color={config.glow}
              emissive={config.glow}
              emissiveIntensity={hovered ? 0.8 : 0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Imagen del Pokémon */}
          <Html position={[0, 0, 0]} center>
            <div style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,0.15), transparent)`,
              boxShadow: `0 0 30px ${config.glow}60, 0 5px 20px rgba(0,0,0,0.4)`,
            }}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  filter: hovered ? "drop-shadow(0 0 10px rgba(255,255,255,0.6))" : "none",
                  transition: "filter 0.3s ease"
                }}
              />
            </div>
          </Html>
        </group>

        {/* Emblema del tipo */}
        <mesh position={[1.2, 1.9, 0.1]} onClick={onClick} scale={hovered ? 1.2 : 1}>
          <Emblem type={type} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive={config.glow}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Información del Pokémon */}
        <group position={[0, 0, 0.05]}>
          {/* Nombre */}
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.38}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
            outlineWidth={0.015}
            outlineColor="#000000"
            letterSpacing={0.02}
          >
            {pokemon.name.toUpperCase()}
          </Text>

          {/* Número del Pokédex */}
          <Text
            position={[0, -0.05, 0]}
            fontSize={0.22}
            color={config.accent}
            anchorX="center"
            anchorY="middle"
            fontWeight={600}
          >
            No. {String(pokemon.id).padStart(3, '0')}
          </Text>

          <mesh position={[0, -0.3, 0]}>
            <planeGeometry args={[2.6, 0.025]} />
            <meshStandardMaterial 
              color={config.color} 
              emissive={config.glow}
              emissiveIntensity={0.3}
              opacity={0.6} 
              transparent 
            />
          </mesh>

          <group position={[0, -0.6, 0]}>
            <Text
              position={[0, 0.1, 0]}
              fontSize={0.14}
              color="#8c8c9e"
              anchorX="center"
              anchorY="middle"
              fontWeight={500}
            >
              TIPO
            </Text>
            <Text
              position={[0, -0.15, 0]}
              fontSize={0.2}
              color={config.accent}
              anchorX="center"
              anchorY="middle"
              fontWeight={600}
            >
              {pokemon.types.join(" • ").toUpperCase()}
            </Text>
          </group>

          {/* Línea divisoria */}
          <mesh position={[0, -0.95, 0]}>
            <planeGeometry args={[2.6, 0.02]} />
            <meshStandardMaterial 
              color={config.color} 
              opacity={0.4} 
              transparent 
            />
          </mesh>

          {/* Sección del entrenador */}
          <group position={[0, -1.35, 0]}>
            <Text
              position={[0, 0.1, 0]}
              fontSize={0.14}
              color="#8c8c9e"
              anchorX="center"
              anchorY="middle"
              fontWeight={500}
            >
              ENTRENADOR
            </Text>
            <Text
              position={[0, -0.2, 0]}
              fontSize={0.26}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight={700}
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {trainer.name}
            </Text>
          </group>

          {/* Detalles del entrenador */}
          <Text
            position={[0, -1.75, 0]}
            fontSize={0.17}
            color="#e1e1ea"
            anchorX="center"
            anchorY="middle"
            fontWeight={400}
          >
            {trainer.age} años • {trainer.region}
          </Text>

          {/* Footer con fecha */}
          <group position={[0, -2.05, 0]}>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[3.1, 0.35]} />
              <meshStandardMaterial 
                color={config.color}
                opacity={0.25}
                transparent
              />
            </mesh>
            <Text
              position={[0, 0, 0]}
              fontSize={0.13}
              color="#6c6c7e"
              anchorX="center"
              anchorY="middle"
              fontWeight={400}
            >
              Reg. 03/11/2025
            </Text>
          </group>
        </group>

        {/* Partículas decorativas (esquinas) */}
        <mesh position={[-1.35, 2.05, 0.1]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={config.glow}
            emissive={config.glow}
            emissiveIntensity={hovered ? 1 : 0.5}
          />
        </mesh>
        <mesh position={[1.35, 2.05, 0.1]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={config.glow}
            emissive={config.glow}
            emissiveIntensity={hovered ? 1 : 0.5}
          />
        </mesh>
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

  const config = TYPE_CONFIG[type] || { 
    bg: "rgba(255, 255, 255, 0.1)",
    glow: "#ffffff"
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        background: config.bg,
        boxShadow: hovered
          ? `0 25px 70px rgba(0,0,0,0.6), 0 0 50px ${config.glow}50, inset 0 0 80px rgba(255,255,255,0.05)`
          : "0 15px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(255,255,255,0.02)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered
          ? "scale(1.1) translateX(-620px) translateY(-15px) rotateY(5deg)"
          : "translateX(-620px)",
        position: "relative",
        border: hovered 
          ? `3px solid ${config.glow}80`
          : "3px solid rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
        <spotLight 
          position={[0, 6, 4]} 
          intensity={0.6} 
          angle={0.4}
          penumbra={1}
          castShadow
          color="#ffffff"
        />
        <pointLight 
          position={[0, 0, 3]} 
          intensity={hovered ? 0.8 : 0.4} 
          color={config.glow}
          distance={10}
        />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
        <PokemonCard3D
          pokemon={pokemon}
          hovered={hovered}
          onClick={() => onSelect(pokemon)}
        />
      </Canvas>
    </div>
  );
}