import {WinTier} from '../utils';

type ParticleKind = 'coin' | 'confetti' | 'spark';

interface Particle {
  color: string;
  flip: number;
  flipSpeed: number;
  kind: ParticleKind;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface Shower {
  for: number;
  rate: number;
}

const GRAVITY = 1500;
const CONFETTI_COLORS = ['#ff2e93', '#22d3ee', '#f6c453', '#8b5cf6', '#ffffff', '#5eead4'];

export const BURSTS: Record<WinTier, {coins: number; confetti: number; shower: Shower | null; sparks: number}> = {
  big: {coins: 70, confetti: 0, shower: {for: 0.9, rate: 50}, sparks: 26},
  huge: {coins: 110, confetti: 40, shower: {for: 1.8, rate: 70}, sparks: 34},
  jackpot: {coins: 140, confetti: 120, shower: {for: 3.2, rate: 90}, sparks: 44},
  loss: {coins: 0, confetti: 0, shower: null, sparks: 0},
  nice: {coins: 38, confetti: 0, shower: null, sparks: 18},
  push: {coins: 0, confetti: 0, shower: null, sparks: 0},
  win: {coins: 20, confetti: 0, shower: null, sparks: 12},
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

const makeConfetti = (width: number): Particle => ({
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  flip: random(0, Math.PI * 2),
  flipSpeed: random(5, 11),
  kind: 'confetti',
  life: 0,
  maxLife: random(3, 4.5),
  rotation: random(0, Math.PI * 2),
  rotationSpeed: random(-5, 5),
  size: random(7, 12),
  vx: random(-60, 60),
  vy: random(60, 220),
  x: random(0, width),
  y: random(-120, -10),
});

const drawCoinFace = (size: number) => {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const context = sprite.getContext('2d');
  if (!context) return sprite;
  const radius = size / 2;
  const rim = context.createRadialGradient(radius * 0.7, radius * 0.6, radius * 0.1, radius, radius, radius);
  rim.addColorStop(0, '#fff6cf');
  rim.addColorStop(0.45, '#f6c453');
  rim.addColorStop(0.85, '#c98a24');
  rim.addColorStop(1, '#7a4a0e');
  context.fillStyle = rim;
  context.beginPath();
  context.arc(radius, radius, radius - 1, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = 'rgba(122, 74, 14, 0.85)';
  context.lineWidth = size * 0.05;
  context.beginPath();
  context.arc(radius, radius, radius * 0.74, 0, Math.PI * 2);
  context.stroke();
  // Embossed star
  context.fillStyle = 'rgba(255, 246, 207, 0.9)';
  context.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const angle = -Math.PI / 2 + (point * Math.PI) / 5;
    const length = point % 2 === 0 ? radius * 0.46 : radius * 0.2;
    context.lineTo(radius + Math.cos(angle) * length, radius + Math.sin(angle) * length);
  }
  context.closePath();
  context.fill();
  context.fillStyle = 'rgba(255, 255, 255, 0.65)';
  context.beginPath();
  context.ellipse(radius * 0.62, radius * 0.5, radius * 0.22, radius * 0.1, -0.6, 0, Math.PI * 2);
  context.fill();
  return sprite;
};

/**
 * A small canvas particle system for wins: coins thrown from the reels, sparkles and, for the largest wins, a coin
 * shower and confetti. It only runs while particles are alive.
 */
export default class ParticleField {
  private context: CanvasRenderingContext2D | null;

  private face: HTMLCanvasElement | null = null;

  private frame = 0;

  private last = 0;

  private particles: Particle[] = [];

  private showers: {origin: {x: number; y: number}; remaining: number; spawn: number; width: number; rate: number}[] =
    [];

  private ratio = 1;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
  }

  burst(tier: WinTier, origin: {x: number; y: number}) {
    if (!this.context) return;
    this.resize();
    const config = BURSTS[tier];
    if (!this.face) this.face = drawCoinFace(64);
    for (let index = 0; index < config.coins; index += 1) {
      const angle = random(-Math.PI * 0.92, -Math.PI * 0.08);
      const speed = random(520, 1250);
      this.particles.push({
        color: '',
        flip: random(0, Math.PI * 2),
        flipSpeed: random(6, 14),
        kind: 'coin',
        life: 0,
        maxLife: random(2.2, 3.4),
        rotation: 0,
        rotationSpeed: 0,
        size: random(16, 30),
        vx: Math.cos(angle) * speed * 0.75,
        vy: Math.sin(angle) * speed,
        x: origin.x + random(-30, 30),
        y: origin.y + random(-12, 12),
      });
    }
    for (let index = 0; index < config.sparks; index += 1) {
      const angle = random(0, Math.PI * 2);
      const speed = random(140, 520);
      this.particles.push({
        color: Math.random() > 0.4 ? '#fff6cf' : '#ffffff',
        flip: 0,
        flipSpeed: 0,
        kind: 'spark',
        life: 0,
        maxLife: random(0.6, 1.2),
        rotation: random(0, Math.PI),
        rotationSpeed: random(-4, 4),
        size: random(6, 14),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        x: origin.x,
        y: origin.y,
      });
    }
    const width = this.canvas.clientWidth;
    for (let index = 0; index < config.confetti; index += 1) this.particles.push(makeConfetti(width));
    if (config.shower) {
      this.showers.push({
        origin,
        rate: config.shower.rate,
        remaining: config.shower.for,
        spawn: 0,
        width,
      });
    }
    if (!this.frame) {
      this.last = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }
  }

  clear() {
    this.particles = [];
    this.showers = [];
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  destroy() {
    this.clear();
  }

  private resize() {
    this.ratio = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.round(this.canvas.clientWidth * this.ratio);
    const height = Math.round(this.canvas.clientHeight * this.ratio);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  private readonly tick = (now: number) => {
    const context = this.context!;
    const delta = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const height = this.canvas.clientHeight;
    this.showers.forEach((shower) => {
      shower.remaining -= delta;
      shower.spawn += shower.rate * delta;
      while (shower.spawn >= 1) {
        shower.spawn -= 1;
        this.particles.push({
          color: '',
          flip: random(0, Math.PI * 2),
          flipSpeed: random(6, 14),
          kind: 'coin',
          life: 0,
          maxLife: 3,
          rotation: 0,
          rotationSpeed: 0,
          size: random(14, 26),
          vx: random(-40, 40),
          vy: random(40, 260),
          x: random(shower.width * 0.04, shower.width * 0.96),
          y: random(-60, -20),
        });
      }
    });
    this.showers = this.showers.filter((shower) => shower.remaining > 0);
    this.particles.forEach((particle) => {
      particle.life += delta;
      particle.flip += particle.flipSpeed * delta;
      particle.rotation += particle.rotationSpeed * delta;
      if (particle.kind === 'spark') {
        particle.vx *= 1 - 2.2 * delta;
        particle.vy *= 1 - 2.2 * delta;
      } else if (particle.kind === 'confetti') {
        particle.vy = Math.min(particle.vy + 420 * delta, 260);
        particle.vx += Math.sin(particle.flip) * 30 * delta;
      } else {
        particle.vy += GRAVITY * delta;
        particle.vx *= 1 - 0.35 * delta;
      }
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
    });
    this.particles = this.particles.filter((particle) => particle.life < particle.maxLife && particle.y < height + 60);

    context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    context.clearRect(0, 0, this.canvas.clientWidth, height);
    this.particles.forEach((particle) => this.draw(context, particle));

    if (this.particles.length || this.showers.length) {
      this.frame = requestAnimationFrame(this.tick);
    } else {
      this.frame = 0;
      context.clearRect(0, 0, this.canvas.clientWidth, height);
    }
  };

  private draw(context: CanvasRenderingContext2D, particle: Particle) {
    const fade = Math.min(1, (particle.maxLife - particle.life) / 0.45);
    context.save();
    context.globalAlpha = Math.max(0, fade);
    context.translate(particle.x, particle.y);
    if (particle.kind === 'coin' && this.face) {
      const squash = Math.cos(particle.flip);
      const width = Math.max(0.12, Math.abs(squash)) * particle.size;
      context.drawImage(this.face, -width / 2, -particle.size / 2, width, particle.size);
      if (Math.abs(squash) < 0.35) {
        context.fillStyle = 'rgba(122, 74, 14, 0.9)';
        context.fillRect(-width / 2, -particle.size / 2, width, particle.size);
      }
    } else if (particle.kind === 'confetti') {
      context.rotate(particle.rotation);
      context.scale(1, Math.cos(particle.flip));
      context.fillStyle = particle.color;
      context.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
    } else {
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      const size = particle.size * (1 - particle.life / particle.maxLife / 2);
      context.beginPath();
      for (let point = 0; point < 8; point += 1) {
        const angle = (point * Math.PI) / 4;
        const length = point % 2 === 0 ? size : size * 0.22;
        context.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
      }
      context.closePath();
      context.fill();
    }
    context.restore();
  }
}
