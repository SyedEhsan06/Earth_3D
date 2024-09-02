import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { useTexture } from "@react-three/drei";

const Moon = ({
    motion
}) => {
  const groupRef = useRef(); // Reference to the group (earth center)
  const moonRef = useRef(); // Reference to the moon

  // Animation logic for revolving the moon around the earth
  useFrame(() => {
    if (groupRef.current && motion) {
      groupRef.current.rotation.y += 0.01; // Rotate the group to make the moon revolve
    }
  });
  const moonTex = useTexture("/moonJpg.jpg"); // Load the moon texture
  return (
    <group ref={groupRef}>
      {/* Moon position is offset to revolve around the Earth */}
      <mesh ref={moonRef} position={[3, 0, 0]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={moonTex} color="white" />
      </mesh>
    </group>
  );
};

export default Moon;
