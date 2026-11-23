export type Point = [number, number];

const round = (value: number): number => Math.round(value * 10) / 10;

// Pseudo-random numbers between 0 and 1 that come out the same on every run, so the artwork never changes between renders
export const createRandom = (seed: number) => {
  let state = seed;

  return (): number => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};

// Curve that passes through every point (a Catmull-Rom spline written as cubic Bézier segments)
export const getSmoothPath = (points: Point[]): string => {
  return points
    .map(([x, y], index) => {
      if (index === 0) return `M${x},${y}`;

      const [previousX, previousY] = points[index - 1];
      const [beforeX, beforeY] = points[index - 2] || points[index - 1];
      const [afterX, afterY] = points[index + 1] || points[index];
      const firstControl = `${round(previousX + (x - beforeX) / 6)},${round(previousY + (y - beforeY) / 6)}`;
      const secondControl = `${round(x - (afterX - previousX) / 6)},${round(y - (afterY - previousY) / 6)}`;

      return `C${firstControl} ${secondControl} ${x},${y}`;
    })
    .join('');
};

// Star with the given number of points. A low inner ratio gives a sparkle, a higher one a classic star
export const getStarPath = (
  centerX: number,
  centerY: number,
  radius: number,
  points: number,
  innerRatio: number,
): string => {
  const vertices = Array.from({length: points * 2}, (_, index) => {
    const angle = (index / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const distance = index % 2 === 0 ? radius : radius * innerRatio;

    return `${round(centerX + distance * Math.cos(angle))},${round(centerY + distance * Math.sin(angle))}`;
  });

  return `M${vertices.join('L')}Z`;
};

// Staircase through the points, moving across before moving up or down
export const getStepPath = (points: Point[]): string => {
  return points.map(([x, y], index) => (index === 0 ? `M${x},${y}` : `H${x}V${y}`)).join('');
};

// Line traced by a function of x, sampled often enough to read as a curve
export const getTracedPath = (startX: number, endX: number, getY: (x: number) => number): string => {
  const steps = Math.ceil((endX - startX) / 8);
  const vertices = Array.from({length: steps + 1}, (_, index) => {
    const x = Math.min(startX + index * 8, endX);

    return `${x},${round(getY(x))}`;
  });

  return `M${vertices.join('L')}`;
};

// Closed ring whose radius rises and falls on its way around, the building block of a guilloche rosette
export const getWavyRingPath = (
  centerX: number,
  centerY: number,
  radius: number,
  amplitude: number,
  waves: number,
): string => {
  const steps = waves * 12;
  const vertices = Array.from({length: steps}, (_, index) => {
    const angle = (index / steps) * Math.PI * 2;
    const distance = radius + amplitude * Math.sin(angle * waves);

    return `${round(centerX + distance * Math.cos(angle))},${round(centerY + distance * Math.sin(angle))}`;
  });

  return `M${vertices.join('L')}Z`;
};
