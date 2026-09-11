import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NetworkCanvasProps {
  scrollProgress?: number;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({ scrollProgress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.018);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050507, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Topological Wireframe Grid (Observed System Landscape)
    const gridCols = isMobile ? 36 : 56;
    const gridRows = isMobile ? 36 : 56;
    const gridSpacing = 1.35;
    const totalVertices = gridCols * gridRows;

    const gridGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(totalVertices * 3);
    const colors = new Float32Array(totalVertices * 3);
    const originalPositions = new Float32Array(totalVertices * 3);

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = (r * gridCols + c) * 3;
        const x = (c - gridCols / 2) * gridSpacing;
        const z = (r - gridRows / 2) * gridSpacing;
        const y = 0;

        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        originalPositions[idx] = x;
        originalPositions[idx + 1] = y;
        originalPositions[idx + 2] = z;

        // Distance from center for radial fade
        const dist = Math.sqrt(x * x + z * z);
        const maxDist = (gridCols / 2) * gridSpacing;
        const alpha = Math.max(0, 1 - dist / maxDist);

        // Monochromatic steel with faint cyan highlight at center
        colors[idx] = 0.25 * alpha;
        colors[idx + 1] = (0.35 + (dist < 15 ? 0.25 : 0)) * alpha;
        colors[idx + 2] = (0.45 + (dist < 15 ? 0.45 : 0)) * alpha;
      }
    }

    gridGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    gridGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const gridMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.0 : 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const gridPoints = new THREE.Points(gridGeometry, gridMaterial);
    gridPoints.position.y = -6;
    gridPoints.rotation.x = 0.12;
    mainGroup.add(gridPoints);

    // 2. Precision Orbital Tracking Rings (System Boundaries)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 2, 0);
    mainGroup.add(ringGroup);

    const createPrecisionRing = (radius: number, segments: number, color: number, opacity: number, tiltX: number, tiltZ: number) => {
      const geom = new THREE.BufferGeometry();
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      geom.setFromPoints(pts);

      const mat = new THREE.LineDashedMaterial({
        color,
        dashSize: 1.2,
        gapSize: 0.6,
        opacity,
        transparent: true,
      });

      const ringLine = new THREE.Line(geom, mat);
      ringLine.computeLineDistances();
      ringLine.rotation.x = tiltX;
      ringLine.rotation.z = tiltZ;
      return ringLine;
    };

    const ringA = createPrecisionRing(24, 96, 0x38bdf8, 0.25, 0.45, 0.15);
    const ringB = createPrecisionRing(16, 72, 0x00e5ff, 0.35, -0.3, -0.2);
    const ringC = createPrecisionRing(9, 48, 0x94a3b8, 0.2, 0.6, 0.4);
    ringGroup.add(ringA);
    ringGroup.add(ringB);
    ringGroup.add(ringC);

    // 3. Focal Telemetry Core (Abstract Node Observation Target)
    const coreGeom = new THREE.BufferGeometry();
    const corePts: number[] = [];
    const coreBeaconCount = 14;
    for (let i = 0; i < coreBeaconCount; i++) {
      const ang = (i / coreBeaconCount) * Math.PI * 2;
      const r = 5.5 + (Math.sin(i * 3) * 1.5);
      corePts.push(Math.cos(ang) * r, -5.5 + Math.sin(i * 2) * 1.2, Math.sin(ang) * r);
    }
    coreGeom.setAttribute('position', new THREE.Float32BufferAttribute(corePts, 3));
    const coreMat = new THREE.PointsMaterial({
      size: 4.5,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const corePoints = new THREE.Points(coreGeom, coreMat);
    mainGroup.add(corePoints);

    // Dynamic Line Traces between focal beacons
    const traceGeom = new THREE.BufferGeometry();
    const tracePos = new Float32Array(coreBeaconCount * 6);
    let traceIdx = 0;
    for (let i = 0; i < coreBeaconCount; i++) {
      const next = (i + 1) % coreBeaconCount;
      tracePos[traceIdx * 6] = corePts[i * 3];
      tracePos[traceIdx * 6 + 1] = corePts[i * 3 + 1];
      tracePos[traceIdx * 6 + 2] = corePts[i * 3 + 2];

      tracePos[traceIdx * 6 + 3] = corePts[next * 3];
      tracePos[traceIdx * 6 + 4] = corePts[next * 3 + 1];
      tracePos[traceIdx * 6 + 5] = corePts[next * 3 + 2];
      traceIdx++;
    }
    traceGeom.setAttribute('position', new THREE.BufferAttribute(tracePos, 3));
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const traceLines = new THREE.LineSegments(traceGeom, traceMat);
    mainGroup.add(traceLines);

    // Mouse & Pointer Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let mouseWorldX = 0;
    let mouseWorldZ = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = normX * 2.8;
      targetY = normY * 1.8;

      // Project onto floor plane approximately
      mouseWorldX = normX * 18;
      mouseWorldZ = -normY * 14;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      const scroll = scrollRef.current;
      camera.position.x = currentX;
      camera.position.y = 18 - scroll * 10 + currentY * 0.5;
      camera.position.z = 38 - scroll * 14;
      camera.lookAt(0, -scroll * 4, 0);

      // Subtle rotation of precision rings
      if (!prefersReducedMotion) {
        ringA.rotation.y = elapsed * 0.06;
        ringB.rotation.y = -elapsed * 0.045;
        ringC.rotation.y = elapsed * 0.09;
        corePoints.rotation.y = elapsed * 0.03;
        traceLines.rotation.y = elapsed * 0.03;
      }

      // Wave & Pointer ripple on topological terrain
      const posAttr = gridGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < totalVertices; i++) {
        const ox = originalPositions[i * 3];
        const oz = originalPositions[i * 3 + 2];

        // Smooth multi-frequency wave
        let wave = Math.sin(ox * 0.18 + elapsed * 0.8) * Math.cos(oz * 0.18 + elapsed * 0.6) * 0.9;
        wave += Math.sin((ox + oz) * 0.1 + elapsed * 0.4) * 0.5;

        // Pointer influence depression / lift
        const dx = ox - mouseWorldX;
        const dz = oz - mouseWorldZ;
        const distSq = dx * dx + dz * dz;
        if (distSq < 100) {
          const influence = (1 - distSq / 100) * 2.2;
          wave += influence;
        }

        posAttr.setY(i, wave);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
