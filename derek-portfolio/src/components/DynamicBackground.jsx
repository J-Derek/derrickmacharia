import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleWave = () => {
  const mesh = useRef();
  const count = 100;
  
  const [positions, phase] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    const ph = new Float32Array(count * count);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j);
        pos[idx * 3] = (i - count / 2) * 0.5;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = (j - count / 2) * 0.5;
        ph[idx] = Math.random() * Math.PI * 2;
      }
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = mesh.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j);
        const x = pos[idx * 3];
        const z = pos[idx * 3 + 2];
        
        // Create a wave effect
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

const DynamicBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-bg-primary">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#080808']} />
        <ParticleWave />
        <fog attach="fog" args={['#080808', 5, 20]} />
      </Canvas>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary"></div>
    </div>
  );
};

export default DynamicBackground;
