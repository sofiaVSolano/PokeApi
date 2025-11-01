import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { TYPE_MAP } from "../utils/typeMap";

function Geometry({ geom, color, position = [0, 0, 0] }) {
    const matProps = { metalness: 0.2, roughness: 0.3, emissiveIntensity: 0.2 };
    const colorHex = color || "#888";

    switch (geom) {
        case "TorusKnot":
            return (
                <mesh position={position}>
                    <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
        case "Sphere":
            return (
                <mesh position={position}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
        case "Box":
            return (
                <mesh position={position}>
                    <boxGeometry args={[1, 0.6, 0.4]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
        case "Octahedron":
            return (
                <mesh position={position}>
                    <octahedronGeometry args={[0.7, 0]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
        case "Cylinder":
            return (
                <mesh position={position}>
                    <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
        default:
            return (
                <mesh position={position}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color={colorHex} {...matProps} />
                </mesh>
            );
    }
}

export default function Pokemon3DSymbol({ types = [] }) {
    const rendered = types.slice(0, 2).map((t, i) => {
        const def = TYPE_MAP[t] || { color: "#999", geometry: "Sphere" };
        const pos = types.length > 1 ? (i === 0 ? [-0.7, 0, 0] : [0.7, 0, 0]) : [0, 0, 0];
        return <Geometry key={t} geom={def.geometry} color={def.color} position={pos} />;
    });

    return (
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            <Suspense fallback={null}>
                <Float rotationIntensity={0.6} floatIntensity={0.8}>
                    {rendered}
                </Float>
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
    );
}
