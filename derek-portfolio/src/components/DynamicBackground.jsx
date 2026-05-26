import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Mouse-reactive floating particles
   
   These sit in front of the fog layer on a
   dedicated render pass, so they're always
   visible. Particles drift lazily and gravitate
   toward the cursor with a glow effect.
   ───────────────────────────────────────────── */

const PARTICLE_COUNT = 80;
const MOUSE_RADIUS = 3.5;
const MOUSE_STRENGTH = 0.15;
const RETURN_SPEED = 0.015;
const DRIFT_SPEED = 0.12;

const InteractiveParticles = () => {
  const pointsRef = useRef();
  const mouse3D = useRef(new THREE.Vector3(100, 100, 0)); // Start off-screen
  const mouseActive = useRef(false);
  const { camera, size } = useThree();

  // Generate particle data: home positions, live positions, velocities
  const data = useMemo(() => {
    const home = new Float32Array(PARTICLE_COUNT * 3);
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const baseAlpha = new Float32Array(PARTICLE_COUNT);
    const baseSize = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT * 2);
    const liveAlpha = new Float32Array(PARTICLE_COUNT);
    const liveSize = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles across the visible viewport area
      // Camera is at z=10 looking at origin, fov 60 → visible width ~12 units at z=0
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = 2 + Math.random() * 3; // z = 2..5 → IN FRONT of fog, closer to camera

      home[i * 3] = x;      home[i * 3 + 1] = y;      home[i * 3 + 2] = z;
      pos[i * 3] = x;       pos[i * 3 + 1] = y;       pos[i * 3 + 2] = z;
      vel[i * 3] = 0;       vel[i * 3 + 1] = 0;       vel[i * 3 + 2] = 0;

      baseAlpha[i] = 0.25 + Math.random() * 0.35; // 25–60% base visibility
      baseSize[i] = 0.06 + Math.random() * 0.08;  // nice visible size

      liveAlpha[i] = baseAlpha[i];
      liveSize[i] = baseSize[i];

      // Green-family tint with slight hue variation
      colors[i * 3]     = 0.0 + Math.random() * 0.08;    // R: near 0
      colors[i * 3 + 1] = 0.75 + Math.random() * 0.25;   // G: 0.75–1.0
      colors[i * 3 + 2] = 0.35 + Math.random() * 0.2;    // B: 0.35–0.55

      phases[i * 2]     = Math.random() * Math.PI * 2;
      phases[i * 2 + 1] = Math.random() * Math.PI * 2;
    }

    return { home, pos, vel, baseAlpha, baseSize, colors, phases, liveAlpha, liveSize };
  }, []);

  // Track mouse → world coordinates
  useEffect(() => {
    const handleMove = (e) => {
      const nx = (e.clientX / size.width) * 2 - 1;
      const ny = -(e.clientY / size.height) * 2 + 1;

      // Unproject onto z=3.5 plane (midpoint of particle depth)
      const vec = new THREE.Vector3(nx, ny, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const targetZ = 3.5;
      const t = (targetZ - camera.position.z) / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(t));

      mouse3D.current.set(pos.x, pos.y, targetZ);
      mouseActive.current = true;
    };

    const handleLeave = () => { mouseActive.current = false; };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [camera, size]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const alphaArr = pointsRef.current.geometry.attributes.alpha.array;
    const sizeArr = pointsRef.current.geometry.attributes.size.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Ambient organic drift
      const driftX = Math.sin(time * DRIFT_SPEED + data.phases[i * 2]) * 0.005;
      const driftY = Math.cos(time * DRIFT_SPEED * 0.8 + data.phases[i * 2 + 1]) * 0.005;

      // Spring toward home position
      data.vel[i3]     += (data.home[i3]     - posArr[i3])     * RETURN_SPEED + driftX;
      data.vel[i3 + 1] += (data.home[i3 + 1] - posArr[i3 + 1]) * RETURN_SPEED + driftY;
      data.vel[i3 + 2] += (data.home[i3 + 2] - posArr[i3 + 2]) * RETURN_SPEED * 0.3;

      // Mouse attraction
      let proximity = 0;
      if (mouseActive.current) {
        const dx = mouse3D.current.x - posArr[i3];
        const dy = mouse3D.current.y - posArr[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          data.vel[i3]     += (dx / dist) * force * 0.15;
          data.vel[i3 + 1] += (dy / dist) * force * 0.15;
          proximity = 1 - dist / MOUSE_RADIUS;
        }
      }

      // Damping
      data.vel[i3]     *= 0.90;
      data.vel[i3 + 1] *= 0.90;
      data.vel[i3 + 2] *= 0.90;

      // Integrate position
      posArr[i3]     += data.vel[i3];
      posArr[i3 + 1] += data.vel[i3 + 1];
      posArr[i3 + 2] += data.vel[i3 + 2];

      // Smoothly modulate alpha & size based on cursor proximity
      const targetAlpha = data.baseAlpha[i] + proximity * 0.5;
      const targetSize = data.baseSize[i] + proximity * 0.08;
      alphaArr[i] += (targetAlpha - alphaArr[i]) * 0.1;
      sizeArr[i]  += (targetSize - sizeArr[i]) * 0.1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.alpha.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} renderOrder={1}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={data.pos} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={data.colors} itemSize={3} />
        <bufferAttribute attach="attributes-alpha" count={PARTICLE_COUNT} array={data.liveAlpha} itemSize={1} />
        <bufferAttribute attach="attributes-size" count={PARTICLE_COUNT} array={data.liveSize} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float alpha;
          attribute float size;
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            vAlpha = alpha;
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (350.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            // Soft glow: bright center fading to edge
            float glow = smoothstep(0.5, 0.0, d);
            float alpha = glow * vAlpha;
            gl_FragColor = vec4(vColor * 1.2, alpha);
          }
        `}
      />
    </points>
  );
};

/* ─────────────────────────────────────────────
   Ambient wave grid (existing effect, unchanged)
   ───────────────────────────────────────────── */
const ParticleWave = () => {
  const mesh = useRef();
  const count = 55;

  const [positions, phase] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    const ph = new Float32Array(count * count);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = i * count + j;
        pos[idx * 3] = (i - count / 2) * 0.9;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = (j - count / 2) * 0.9;
        ph[idx] = Math.random() * Math.PI * 2;
      }
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = i * count + j;
        const x = pos[idx * 3];
        const z = pos[idx * 3 + 2];
        pos[idx * 3 + 1] = Math.sin(x * 0.5 + time + phase[idx]) * 0.2 +
                          Math.cos(z * 0.5 + time + phase[idx]) * 0.2;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00FF87"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

/* ─────────────────────────────────────────────
   Canvas wrapper
   ───────────────────────────────────────────── */
const DynamicBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-bg-primary">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#080808']} />
        <ParticleWave />
        <InteractiveParticles />
        <fog attach="fog" args={['#080808', 5, 20]} />
      </Canvas>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary"></div>
    </div>
  );
};

export default DynamicBackground;
