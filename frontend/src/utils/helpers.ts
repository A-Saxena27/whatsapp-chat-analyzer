export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;

export const randInt = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));
