"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 400;
const FIELD_SIZE = 20;
const REPEL_RADIUS = 1.6;
const REPEL_STRENGTH = 1.4;
const RETURN_SPEED = 0.06;

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, size } = useThree();

  // mouse target in world coords (updated by window pointermove)
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 0));

  const { basePositions, currentPositions } = useMemo(() => {
    const basePositions    = new Float32Array(STAR_COUNT * 3);
    const currentPositions = new Float32Array(STAR_COUNT * 3);

    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    for (let i = 0; i < STAR_COUNT; i++) {
      const x = (rand() - 0.5) * FIELD_SIZE;
      const y = (rand() - 0.5) * FIELD_SIZE;
      const z = (rand() - 0.5) * FIELD_SIZE * 0.6;
      basePositions[i * 3 + 0]    = x;
      basePositions[i * 3 + 1]    = y;
      basePositions[i * 3 + 2]    = z;
      currentPositions[i * 3 + 0] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;
    }
    return { basePositions, currentPositions };
  }, []);

  // Track cursor globally (not just over canvas) and project into world space at z=0
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const ndc = new THREE.Vector2(
        (e.clientX / size.width) * 2 - 1,
        -(e.clientY / size.height) * 2 + 1,
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);

      // intersect ray with z=0 plane
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersect);
      if (intersect) mouseWorld.current.copy(intersect);
    };
    const onLeave = () => mouseWorld.current.set(9999, 9999, 0);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [camera, size]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();

    // slow drift
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.05;

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const mx = mouseWorld.current.x;
    const my = mouseWorld.current.y;

    // Account for the group's rotation: inverse rotate mouse into local space
    const inv = new THREE.Matrix4().copy(pointsRef.current.matrixWorld).invert();
    const localMouse = new THREE.Vector3(mx, my, 0).applyMatrix4(inv);

    for (let i = 0; i < STAR_COUNT; i++) {
      const bx = basePositions[i * 3 + 0];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      let cx = currentPositions[i * 3 + 0];
      let cy = currentPositions[i * 3 + 1];
      let cz = currentPositions[i * 3 + 2];

      // repulsion vector (only x/y — z stays)
      const dx = cx - localMouse.x;
      const dy = cy - localMouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < REPEL_RADIUS && dist > 0.001) {
        const falloff = (REPEL_RADIUS - dist) / REPEL_RADIUS;
        const push = REPEL_STRENGTH * falloff * 0.15;
        cx += (dx / dist) * push;
        cy += (dy / dist) * push;
      }

      // ease back to base
      cx += (bx - cx) * RETURN_SPEED;
      cy += (by - cy) * RETURN_SPEED;
      cz += (bz - cz) * RETURN_SPEED;

      currentPositions[i * 3 + 0] = cx;
      currentPositions[i * 3 + 1] = cy;
      currentPositions[i * 3 + 2] = cz;

      posAttr.setXYZ(i, cx, cy, cz);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={currentPositions}
          itemSize={3}
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3B82F6"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Stars />
    </Canvas>
  );
}
