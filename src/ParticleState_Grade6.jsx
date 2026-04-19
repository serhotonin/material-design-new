import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ParticleState_Grade6() {
  const canvasRef = useRef(null);
  const [temperature, setTemperature] = useState(50);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * 600 + 100, // Roughly center initially
        y: Math.random() * 400 + 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 10,
        mass: 1,
        baseX: (i % 10) * 25 + 250, // For solid grid layout
        baseY: Math.floor(i / 10) * 25 + 300 // For solid grid layout
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      const state = temperature < 30 ? 'kati' : temperature < 70 ? 'sivi' : 'gaz';

      // Update and draw particles
      ctx.fillStyle = '#60a5fa'; // Blue-ish particles

      particles.forEach((p, i) => {
        if (state === 'kati') {
          // Solid: vibrate around base position
          const vibrationAmp = temperature / 10;
          p.x = p.baseX + (Math.random() - 0.5) * vibrationAmp;
          p.y = p.baseY + (Math.random() - 0.5) * vibrationAmp;
        } else if (state === 'sivi') {
          // Liquid: gravity, weak bonding, slide around bottom
          p.vy += 0.2; // Gravity

          // Add some horizontal jitter based on temp
          p.vx += (Math.random() - 0.5) * (temperature / 100);

          // Friction
          p.vx *= 0.95;
          p.vy *= 0.95;

          p.x += p.vx;
          p.y += p.vy;

          // Simple wall collisions for liquid
          if (p.x + p.radius > canvas.width) { p.x = canvas.width - p.radius; p.vx *= -0.5; }
          if (p.x - p.radius < 0) { p.x = p.radius; p.vx *= -0.5; }
          if (p.y + p.radius > canvas.height) { p.y = canvas.height - p.radius; p.vy *= -0.5; }

          // Simple particle-particle collision for volume (very basic)
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p.radius + p2.radius;
            if (dist < minDist) {
              const angle = Math.atan2(dy, dx);
              const pushX = Math.cos(angle) * (minDist - dist) * 0.5;
              const pushY = Math.sin(angle) * (minDist - dist) * 0.5;
              p.x -= pushX; p.y -= pushY;
              p2.x += pushX; p2.y += pushY;
            }
          }

        } else if (state === 'gaz') {
          // Gas: high velocity, bounce off walls
          // Speed depends on temp above 70
          const speedMultiplier = 1 + (temperature - 70) / 10;

          // Normalize velocity to speed multiplier if it gets too slow
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentSpeed < speedMultiplier) {
            p.vx += (Math.random() - 0.5);
            p.vy += (Math.random() - 0.5);
          }

          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Perfect elastic wall collisions
          if (p.x + p.radius > canvas.width) { p.x = canvas.width - p.radius; p.vx *= -1; }
          if (p.x - p.radius < 0) { p.x = p.radius; p.vx *= -1; }
          if (p.y + p.radius > canvas.height) { p.y = canvas.height - p.radius; p.vy *= -1; }
          if (p.y - p.radius < 0) { p.y = p.radius; p.vy *= -1; }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [temperature]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col font-sans">
      <Link to="/" className="self-start mb-8 p-4 bg-gray-800 rounded-xl shadow-lg text-xl hover:bg-gray-700 transition">Ana Menüye Dön</Link>

      <h1 className="text-4xl font-bold mb-4 text-center text-yellow-400">Madde Halleri</h1>
      <p className="text-center text-xl mb-8">Sıcaklığı değiştirerek taneciklerin hareketini gözlemleyin.</p>

      <div className="flex flex-col items-center gap-8">

        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col items-center">
          <label className="text-3xl font-bold mb-6 flex justify-between w-full">
            <span>Sıcaklık: {temperature}°C</span>
            <span className={temperature < 30 ? 'text-blue-400' : temperature < 70 ? 'text-green-400' : 'text-red-400'}>
              {temperature < 30 ? 'KATI' : temperature < 70 ? 'SIVI' : 'GAZ'}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full h-8 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between w-full mt-4 text-gray-400 text-lg font-bold">
            <span>0°C (Katı)</span>
            <span>30°C (Erime)</span>
            <span>70°C (Kaynama)</span>
            <span>100°C (Gaz)</span>
          </div>
        </div>

        <div className="bg-black border-4 border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="block"
          />
        </div>

      </div>
    </div>
  );
}
