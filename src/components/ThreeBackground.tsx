import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function AnimatedSphere() {
  const meshRef = useRef<any>();

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 100, 200]} scale={1.8}>
      <MeshDistortMaterial
        color="#3b82f6"
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
}

export default function InteractiveSphere() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />

        <AnimatedSphere />
      </Canvas>
    </div>
  );
}