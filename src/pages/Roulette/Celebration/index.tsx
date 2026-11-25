import {RefObject, useEffect, useRef} from 'react';

import {prefersReducedMotion} from '../hooks';

import * as S from './Styles';

export interface Burst {
  id: number;
  // How many times the whole wager came back
  times: number;
}

interface CelebrationProps {
  // The element the chips and confetti fly out of
  anchor: RefObject<HTMLElement | null>;
  burst: Burst | null;
}

interface Particle {
  color: string;
  life: number;
  rotation: number;
  shape: 'coin' | 'ribbon';
  size: number;
  spin: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
}

const COLORS = ['#f6e0a0', '#d9b25f', '#f6f0df', '#c9303f', '#17935a'];
const GRAVITY = 980;

const getCount = (times: number) => {
  if (times >= 18) return 190;
  return times >= 3 ? 80 : 46;
};

// A burst of gold over the table when the spin pays; the bigger the return, the fuller the shower
const Celebration = ({anchor, burst}: CelebrationProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const source = anchor.current;
    if (!burst || !element || !source || prefersReducedMotion()) return undefined;
    const context = element.getContext('2d');
    if (!context) return undefined;
    const bounds = element.getBoundingClientRect();
    const origin = source.getBoundingClientRect();
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    element.width = bounds.width * ratio;
    element.height = bounds.height * ratio;
    context.scale(ratio, ratio);
    const centerX = origin.left - bounds.left + origin.width / 2;
    const centerY = origin.top - bounds.top + origin.height / 2;
    const power = burst.times >= 18 ? 1.35 : 1;
    const particles: Particle[] = Array.from({length: getCount(burst.times)}, (_, index) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
      const speed = (260 + Math.random() * 520) * power;
      return {
        color: COLORS[index % COLORS.length],
        life: 1.5 + Math.random() * 1.1,
        rotation: Math.random() * Math.PI * 2,
        shape: index % 3 === 0 ? 'coin' : 'ribbon',
        size: 4 + Math.random() * 5,
        spin: (Math.random() - 0.5) * 14,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        x: centerX + (Math.random() - 0.5) * origin.width * 0.3,
        y: centerY + (Math.random() - 0.5) * origin.height * 0.2,
      };
    });
    let last: number | null = null;
    let request = 0;
    let started: number | null = null;
    const step = (now: number) => {
      // Timed from the first frame: a frame's timestamp can be earlier than the moment the effect ran
      last ??= now;
      started ??= now;
      const elapsed = Math.min(0.05, (now - last) / 1000);
      const age = (now - started) / 1000;
      last = now;
      context.clearRect(0, 0, bounds.width, bounds.height);
      let alive = false;
      particles.forEach((particle) => {
        if (age > particle.life) return;
        alive = true;
        particle.velocityX *= 1 - 0.9 * elapsed;
        particle.velocityY += GRAVITY * elapsed;
        particle.x += particle.velocityX * elapsed;
        particle.y += particle.velocityY * elapsed;
        particle.rotation += particle.spin * elapsed;
        context.save();
        context.globalAlpha = Math.min(1, (particle.life - age) / 0.5);
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        if (particle.shape === 'coin') {
          // A coin seen spinning: its width breathes with the rotation
          context.beginPath();
          context.ellipse(
            0,
            0,
            particle.size,
            particle.size * Math.abs(Math.cos(particle.rotation * 1.7)) + 0.6,
            0,
            0,
            7,
          );
          context.fill();
        } else {
          context.fillRect(-particle.size, -particle.size * 0.32, particle.size * 2, particle.size * 0.64);
        }
        context.restore();
      });
      if (alive) request = requestAnimationFrame(step);
      else context.clearRect(0, 0, bounds.width, bounds.height);
    };
    request = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(request);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, element.width, element.height);
    };
  }, [anchor, burst]);

  return <S.Canvas aria-hidden="true" ref={canvas} />;
};

export default Celebration;
