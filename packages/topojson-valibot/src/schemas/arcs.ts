import * as v from 'valibot';
import { PositionSchema } from './position.js';

// 2.1.3 Arcs
export const ArcsSchema = v.array(
  v.pipe(
    v.array(PositionSchema),
    v.minLength(2),
  ),
);
export type Arcs = v.InferOutput<typeof ArcsSchema>;
