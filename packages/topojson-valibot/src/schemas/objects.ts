import * as v from 'valibot';
import { GeometryObjectSchema } from './geometry/geometry-object.js';

// 2.1.5. Objects
export const ObjectsSchema = v.record(v.string(), GeometryObjectSchema);
export type Objects = v.InferOutput<typeof ObjectsSchema>;
