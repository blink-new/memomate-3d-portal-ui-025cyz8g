import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Grid() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  const gridLines = []
  const size = 50
  const divisions = 20

  // Horizontal lines
  for (let i = 0; i <= divisions; i++) {
    const y = (i / divisions - 0.5) * size
    gridLines.push(
      <line key={`h-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-size/2, y, 0, size/2, y, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff0033" opacity={0.1} transparent />
      </line>
    )
  }

  // Vertical lines
  for (let i = 0; i <= divisions; i++) {
    const x = (i / divisions - 0.5) * size
    gridLines.push(
      <line key={`v-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([x, -size/2, 0, x, size/2, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff0033" opacity={0.1} transparent />
      </line>
    )
  }

  return (
    <group ref={ref} position={[0, 0, -20]}>
      {gridLines}
    </group>
  )
}

export default function NeuralGrid() {
  return (
    <div className="fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Grid />
      </Canvas>
    </div>
  )
}