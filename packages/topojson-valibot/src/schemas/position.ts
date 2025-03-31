import * as v from 'valibot';

// 2.1.1. Positions
export const PositionSchema = v.pipe(
  v.array(v.number()),
  v.minLength(2),
);
export type Position = v.InferOutput<typeof PositionSchema>;
