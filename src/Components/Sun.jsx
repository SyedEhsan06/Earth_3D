import React from "react";

const Sun = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default Sun;
