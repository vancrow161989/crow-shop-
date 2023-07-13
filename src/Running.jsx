/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 .\\running.glb
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/running.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.run.play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Ch46"
            geometry={nodes.Ch46.geometry}
            material={materials.Ch46_body}
            skeleton={nodes.Ch46.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/running.glb");
