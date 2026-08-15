"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(26, 16, 72, 44);
    const position = geo.attributes.position;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      position.setZ(i, Math.sin(x * 0.42) * Math.cos(y * 0.33) * 0.9);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.07) * 0.035;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={[0, -1.15, 0]}
      rotation={[-Math.PI / 2.35, 0, 0]}
    >
      <meshBasicMaterial color="#FF4D00" opacity={0.52} transparent wireframe />
    </mesh>
  );
}

function hashed(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 420;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (hashed(i, 1) - 0.5) * 22;
      array[i * 3 + 1] = hashed(i, 2) * 8 - 1.2;
      array[i * 3 + 2] = (hashed(i, 3) - 0.5) * 14;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.028;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#FF4D00"
        opacity={0.82}
        size={0.032}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 0.85 - camera.position.x) * 0.035;
    camera.position.y += (1.55 + pointer.y * 0.35 - camera.position.y) * 0.035;
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ fov: 50, position: [0, 1.55, 7.2] }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#0A0A0A", 8, 18]} />
      <Terrain />
      <Particles />
      <CameraRig />
    </Canvas>
  );
}
