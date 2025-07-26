import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Pulsing Ring Component
const PulsingRing: React.FC<{ position: [number, number, number], color: string, delay: number }> = ({ 
  position, 
  color, 
  delay 
}) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
      ringRef.current.scale.setScalar(scale);
      
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <ringGeometry args={[0.6, 0.8, 16]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Data Flow Particles Component
const DataFlowParticles: React.FC<{ connections: any[] }> = ({ connections }) => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        const connection = connections[index % connections.length];
        if (connection) {
          const progress = (state.clock.elapsedTime * 0.5 + index * 0.2) % 1;
          const start = new THREE.Vector3(...connection.start);
          const end = new THREE.Vector3(...connection.end);
          
          particle.position.lerpVectors(start, end, progress);
          
          // Fade in/out effect
          const opacity = Math.sin(progress * Math.PI) * 0.8;
          (particle.children[0] as THREE.Mesh).material.opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {connections.map((_, index) => (
        <group key={index}>
          <Sphere args={[0.05, 8, 8]}>
            <meshBasicMaterial 
              color="#ff0033" 
              transparent 
              opacity={0.8}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

const TimelineBackground: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timelineRef = useRef<THREE.Group>(null);

  // App integration data
  const apps = useMemo(() => [
    {
      name: 'WhatsApp',
      position: [-6, 1, -3] as [number, number, number],
      color: '#ff0033',
      task: 'Reply to John',
      icon: '💬'
    },
    {
      name: 'Gmail',
      position: [-3, -0.5, -4] as [number, number, number],
      color: '#ff1a4d',
      task: 'Review emails',
      icon: '📧'
    },
    {
      name: 'Zoom',
      position: [0, 0.8, -3.5] as [number, number, number],
      color: '#ff0033',
      task: 'Join meeting 3PM',
      icon: '📹'
    },
    {
      name: 'Notion',
      position: [3, -0.3, -4] as [number, number, number],
      color: '#ff1a4d',
      task: 'Update project',
      icon: '📝'
    },
    {
      name: 'SMS',
      position: [6, 0.5, -3] as [number, number, number],
      color: '#ff0033',
      task: 'Send reminder',
      icon: '💬'
    }
  ], []);

  // Connection lines between nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < apps.length - 1; i++) {
      lines.push({
        start: apps[i].position,
        end: apps[i + 1].position,
        color: '#ff0033'
      });
    }
    return lines;
  }, [apps]);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    
    if (timelineRef.current) {
      // Slow horizontal drift
      timelineRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={timelineRef}>
        {/* Connection Lines */}
        {connections.map((connection, index) => (
          <Line
            key={index}
            points={[connection.start, connection.end]}
            color={connection.color}
            lineWidth={2}
            transparent
            opacity={0.6}
          />
        ))}

        {/* App Nodes */}
        {apps.map((app, index) => (
          <group key={app.name} position={app.position}>
            {/* Glowing Sphere */}
            <Sphere args={[0.3, 16, 16]}>
              <meshBasicMaterial 
                color={app.color} 
                transparent 
                opacity={0.8}
              />
            </Sphere>
            
            {/* Outer Glow Ring */}
            <Sphere args={[0.5, 16, 16]}>
              <meshBasicMaterial 
                color={app.color} 
                transparent 
                opacity={0.2}
                side={THREE.BackSide}
              />
            </Sphere>

            {/* App Icon */}
            <Text
              position={[0, 0, 0.4]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {app.icon}
            </Text>

            {/* App Name */}
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.15}
              color={app.color}
              anchorX="center"
              anchorY="middle"
            >
              {app.name}
            </Text>

            {/* Task Preview */}
            <Text
              position={[0, -1.1, 0]}
              fontSize={0.1}
              color="rgba(255, 255, 255, 0.7)"
              anchorX="center"
              anchorY="middle"
            >
              {app.task}
            </Text>

            {/* Pulsing Animation */}
            <PulsingRing 
              position={[0, 0, 0]} 
              color={app.color} 
              delay={index * 0.5} 
            />
          </group>
        ))}

        {/* Data Flow Particles */}
        <DataFlowParticles connections={connections} />
      </group>
    </group>
  );
};

export default TimelineBackground;