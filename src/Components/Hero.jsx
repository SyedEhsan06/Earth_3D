// Hero.js
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Globe from "./Globe";
import Controls from "./Controls";
import Moon from "./Moon";
import Sun from "./Sun";

const Hero = () => {
  const [night, setNight] = useState(false);
  const [moonVisible, setMoonVisible] = useState(false);
  const [sunVisible, setSunVisible] = useState(false);
  const [cloudsVisible, setCloudsVisible] = useState(true);
  const [starsCount, setStarsCount] = useState(5000);
  const [moonMotion, setMoonMotion] = useState(false);
  const [earthMotion, setEarthMotion] = useState(true);
  const [cloudMotion, setCloudMotion] = useState(true);

  const handleToggleFeature = (feature, value) => {
    switch (feature) {
      case "moon":
        setMoonVisible(value);
        break;
      case "sun":
        setSunVisible(value);
        break;
      case "clouds":
        setCloudsVisible(value);
        break;
      case "stars":
        setStarsCount(value ? 5000 : 0);
        break;
      case "moonMotion":
        setMoonMotion(value);
        break;
      case "earthMotion":
        setEarthMotion(value);
        break;
      case "cloudMotion":
        setCloudMotion(value);
        break;
      case "darkMode":
        setNight(value);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* Canvas for 3D Content */}
      <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
        <OrbitControls 
        maxDistance={40}
        minDistance={1.2}
        enableZoom={true}
        />
        <ambientLight intensity={night ? 0.1 : 1} />
        {sunVisible && <Sun/>}
        {moonVisible && <Moon motion={moonMotion} />}
        {starsCount > 0 && <Stars radius={100} depth={50} count={starsCount} factor={4} saturation={0} fade={true} />}
        
        <Globe
          night={night}
          sunVisible={sunVisible}
          cloudsVisible={cloudsVisible}
          moonMotion={moonMotion}
          earthMotion={earthMotion}
          cloudMotion={cloudMotion}
        />
      </Canvas>

      {/* Controls for UI Elements */}
      <Controls onToggleFeature={handleToggleFeature} />
    </div>
  );
};

export default Hero;
