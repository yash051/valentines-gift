"use client";

import React, { useRef, useMemo, Suspense, useState, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, useTexture, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import styles from "./Valentine.module.css";
import PageMusic from '../../components/PageMusic';


// --- THE LOADER CARD COMPONENT ---
const ValentineLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Link href="/" className="absolute top-5 left-5 text-[#b71c1c] hover:text-[#d81b60] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.bgEmoji} style={{ left: '10%', animationDelay: '0s' }}>💖</div>
      <div className={styles.bgEmoji} style={{ left: '25%', animationDelay: '3s' }}>😘</div>
      <div className={styles.bgEmoji} style={{ left: '40%', animationDelay: '6s' }}>🤗</div>
      <div className={styles.bgEmoji} style={{ left: '60%', animationDelay: '2s' }}>💋</div>
      <div className={styles.bgEmoji} style={{ left: '75%', animationDelay: '5s' }}>🫂</div>
      <div className={styles.bgEmoji} style={{ left: '90%', animationDelay: '1s' }}>❤️</div>

      <div className={styles.card}>
        <div className={`${styles.cardDecor} ${styles.decor1}`}>😘</div>
        <div className={`${styles.cardDecor} ${styles.decor2}`}>🤗</div>
        <div className={`${styles.cardDecor} ${styles.decor3}`}>💖</div>
        <div className={`${styles.cardDecor} ${styles.decor4}`}>🫂</div>
        <div className={`${styles.cardDecor} ${styles.decor5}`}>❤️</div>
        <div className={`${styles.cardDecor} ${styles.decor6}`}>❤️</div>

        <div className={styles.loaderTitle}>Forever Yours <br/>Maazi Bayko</div>

        <div className={styles.imageFrame}>
            <div className={styles.imageCircle}>
                <Image 
                  src="/images/couple_images/Valentines_Day.webp" 
                  alt="Valentine Couple" 
                  fill
                  className="object-cover"
                />
            </div>
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                एक मी एक तू, शब्द मी गीत तू,<br/>
                ध्यास मी श्वास तू, स्पर्श मी मोहर तू,<br/>
                स्वप्नात तू, सत्यात तू, साऱ्यात तू....
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 3D COMPONENTS ---
const FloatingHeart = ({ position, rotation, scale, geometry }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [offset] = useState(() => Math.random() * 100);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulseScale = scale * (1 + Math.sin(t * 2 + offset) * 0.15);
    meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.z += 0.002;
    meshRef.current.position.y += Math.sin(t + offset) * 0.005;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} geometry={geometry}>
      <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={2.5} toneMapped={false} roughness={0.9} metalness={0.1} />
    </mesh>
  );
};

const MagicalHearts = ({ count = 40 }) => {
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -0.25, y = -1.5;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 40] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.25 + 0.15,
    }));
  }, [count]);

  return <>{hearts.map((props, i) => <FloatingHeart key={i} {...props} geometry={heartGeometry} />)}</>;
};

const GroundFlowers = ({ count = 200 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const geometry = useMemo(() => new THREE.OctahedronGeometry(0.4, 0), []);
    const material = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 1, emissiveIntensity: 0.5, toneMapped: false }), []);
  
    useLayoutEffect(() => {
      if(!meshRef.current) return;
      const color = new THREE.Color();
      const palette = ['#d11141', '#00b159', '#00aedb', '#f37735', '#ffc425', '#e040fb'];
  
      for (let i = 0; i < count; i++) {
        dummy.position.set((Math.random() - 0.5) * 80, -10 + Math.random() * 3, (Math.random() - 0.5) * 80);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = Math.random() * 0.5 + 0.3;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, color.set(palette[Math.floor(Math.random() * palette.length)]));
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [count, dummy]);
  
    return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

const SinglePetal = ({ initialPos }: { initialPos: number[] }) => {
    const ref = useRef<THREE.Mesh>(null!);
    const [speed] = useState(() => Math.random() * 0.5 + 0.3);
    const [rotSpeed] = useState(() => (Math.random() - 0.5) * 2);
    
    useFrame(({ clock }, delta) => {
      ref.current.position.y -= speed * delta;
      ref.current.rotation.x += delta * rotSpeed;
      ref.current.rotation.z += delta * rotSpeed * 0.5;
      ref.current.position.x += Math.sin(clock.elapsedTime + speed) * 0.02;
  
      if (ref.current.position.y < -15) {
          ref.current.position.y = 15 + Math.random() * 5;
          ref.current.position.x = (Math.random() - 0.5) * 50;
          ref.current.position.z = (Math.random() - 0.5) * 50;
      }
    });
  
    return (
      <mesh ref={ref} position={new THREE.Vector3(...initialPos)} rotation={[Math.random(), Math.random(), Math.random()]}>
        <planeGeometry args={[0.15, 0.25]} /> 
        <meshBasicMaterial color="#ffb7c5" transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    );
};
  
const DriftingPetals = ({ count = 80 }) => {
    const initialPositions = useMemo(() => {
      return Array.from({ length: count }).map(() => [(Math.random() - 0.5) * 50, Math.random() * 20, (Math.random() - 0.5) * 50]);
    }, [count]);
    return <>{initialPositions.map((pos, i) => <SinglePetal key={i} initialPos={pos} />)}</>;
}

const FramedPhoto = ({ textureUrl, size, glowColor = "#ffffff" }: { textureUrl: string, size: number, glowColor?: string }) => {
  const texture = useTexture(textureUrl);
  texture.anisotropy = 16;
  const aspect = texture.image.width / texture.image.height;
  
  return (
    <Billboard follow={true}>
      <group>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[(size * aspect) + 0.15, size + 0.15]} />
          <meshBasicMaterial color={glowColor} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[size * aspect, size]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} toneMapped={false} />
        </mesh>
      </group>
    </Billboard>
  );
};

const FloatingPhoto = ({ textureUrl, xRadius, zRadius, speed, size, offset = 0 }: { textureUrl: string, xRadius: number, zRadius: number, speed: number, size: number, offset?: number }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [bobOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const orbitSpeed = t * speed + offset;
    groupRef.current.position.set(
        Math.cos(orbitSpeed) * xRadius, 
        Math.sin(t * 1.5 + bobOffset) * 0.8, 
        Math.sin(orbitSpeed) * zRadius
    );
  });

  return <group ref={groupRef}><FramedPhoto textureUrl={textureUrl} size={size} glowColor="#ffffff" /></group>;
};

const CenterPiece = ({ textureUrl, size = 4 }: { textureUrl: string, size?: number }) => {
  return <FramedPhoto textureUrl={textureUrl} size={size} glowColor="#ffb3c6" />;
};


// --- MAIN PAGE COMPONENT ---
export default function ValentinesDay() {
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    // 11 seconds (11000 ms) timer before switching screens
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background Audio Source */}
\
      <PageMusic src="/music/trdh.mp3" />

      {/* Show the Loader Card for the first 11 seconds */}
      {!isLoaded && <ValentineLoader />}

      {/* Show the 3D Garden after 11 seconds */}
      {isLoaded && (
        <div className={styles.container}>
          <div className={styles.overlay}>
            <h1 className={styles.title}>You make my heart bloom, Ruby</h1>
            <p className={styles.subtitle}>Swipe to explore our magical garden.</p>
          </div>

          <Canvas camera={{ position: [0, 8, 22], fov: 50 }}>
            <color attach="background" args={["#081711"]} />
            <fog attach="fog" args={['#081711', 15, 65]} /> 
            
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffd1dc" />

            <Sparkles count={1000} scale={50} size={3} speed={0.4} opacity={0.6} color="#ffe866" noise={0.1} />
            <Sparkles count={400} scale={50} size={2} speed={0.6} opacity={0.4} color="#ffb3c6" noise={0.2} />

            <DriftingPetals count={100} />
            <GroundFlowers count={250} />
            
            <Suspense fallback={null}>
              <MagicalHearts count={50} />
              
              <CenterPiece textureUrl="/photos/center.webp" size={5.5} />
              <FloatingPhoto textureUrl="/photos/planet1.webp" xRadius={8} zRadius={12} speed={0.25} size={2.5} offset={0} />
              <FloatingPhoto textureUrl="/photos/planet2.webp" xRadius={13} zRadius={9} speed={0.18} size={2.8} offset={2.1} />
              <FloatingPhoto textureUrl="/photos/planet3.webp" xRadius={10} zRadius={15} speed={0.22} size={2.2} offset={4.5} />
              <FloatingPhoto textureUrl="/photos/planet4.webp" xRadius={16} zRadius={12} speed={0.15} size={2.4} offset={1.2} />
              <FloatingPhoto textureUrl="/photos/planet5.webp" xRadius={9} zRadius={17} speed={0.28} size={2.6} offset={3.7} />
              <FloatingPhoto textureUrl="/photos/planet6.webp" xRadius={14} zRadius={14} speed={0.2} size={2.3} offset={0.8} />
              <FloatingPhoto textureUrl="/photos/planet7.webp" xRadius={11} zRadius={10} speed={0.32} size={2.1} offset={5.5} />
            </Suspense>

            <OrbitControls enablePan={false} enableZoom={true} maxDistance={35} minDistance={6} autoRotate autoRotateSpeed={0.3} />

            <EffectComposer>
              <Bloom luminanceThreshold={1.1} luminanceSmoothing={0.1} intensity={1.5} />
            </EffectComposer>
          </Canvas>
        </div>
      )}
    </>
  );
}

// Preload the large textures so they are ready by the time the loader finishes!
useTexture.preload("/photos/center.webp");
useTexture.preload("/photos/planet1.webp");
useTexture.preload("/photos/planet2.webp");
useTexture.preload("/photos/planet3.webp");
useTexture.preload("/photos/planet4.webp");
useTexture.preload("/photos/planet5.webp");
useTexture.preload("/photos/planet6.webp");
useTexture.preload("/photos/planet7.webp");