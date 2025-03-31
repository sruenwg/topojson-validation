import * as v from 'valibot';
import { GeometryObjectSchema } from './geometry/geometry-object.js';
import { TopologySchema } from './topology.js';

// 2. TopoJSON Objects
export const TopoJsonObjectSchema = v.union([
  TopologySchema,
  GeometryObjectSchema,
]);
export type TopoJsonObject = v.InferOutput<typeof TopoJsonObjectSchema>;
