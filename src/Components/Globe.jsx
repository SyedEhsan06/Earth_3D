import { Stars } from "@react-three/drei";
import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";

// Import textures
import imgmain from "/imgmain.jpg";
import earthbump1k from "/01_earthbump1k.jpg";
import earthspec1k from "/02_earthspec1k.jpg";
import earthclouds from "/AsiaCloud.jpg";
import earthcloudtrans from "/05_earthcloudmaptrans.jpg";
import earthlights from "/nightSky.jpg";

const Globe = ({
  night,
  starsCount,
  moonVisible,
  sunVisible,
  cloudsVisible,
  moonMotion,
  earthMotion,
  cloudMotion,
}) => {
  // Load textures using useLoader hook from drei
  const [colorMap, bumpMap, specularMap, cloudMap, cloudTransMap, lightsMap] =
    useLoader(TextureLoader, [
      imgmain,
      earthbump1k,
      earthspec1k,
      earthclouds,
      earthcloudtrans,
      earthlights,
    ]);

  // Create refs for the Earth and cloud meshes
  const earthRef = useRef();
  const cloudRef = useRef();
    const nightRef = useRef();
  // Animate the rotation
  useFrame(({ clock }) => {
    if (earthMotion && earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() / 6;
    }
    if (cloudMotion && cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() / 4;
    }
    if (night && nightRef.current) {
      nightRef.current.rotation.y = clock.getElapsedTime() / 6;
    }
  });

  return (
    <>
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={starsCount ? 5000 : 0}
        factor={4}
        saturation={0}
        fade={true}
      />

      {/* Earth sphere */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          normalMap={specularMap}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Cloud layer */}
      {cloudsVisible && (
        <mesh ref={cloudRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.02, 32, 32]} />
          <meshPhongMaterial
            map={cloudMap}

            // alphaMap={cloudTransMap}
            transparent={true}
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      )}
      {/* Night Map */}
      {night && (
        <mesh position={[0, 0, 0]} ref={nightRef}>
          <sphereGeometry args={[1.005, 32, 32]} />
          <meshBasicMaterial map={lightsMap} transparent={true} />
        </mesh>
      )}
    </>
  );
};

export default Globe;
