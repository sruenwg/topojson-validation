import * as v from 'valibot';
import { GeometryCollectionSchema } from './geometry-collection.js';
import { LineStringSchema } from './line-string.js';
import { MultiLineStringSchema } from './multi-line-string.js';
import { MultiPointSchema } from './multi-point.js';
import { MultiPolygonSchema } from './multi-polygon.js';
import { NullObjectSchema } from './null-object.js';
import { PointSchema } from './point.js';
import { PolygonSchema } from './polygon.js';

// 2.2. Geometry Objects
export const GeometryObjectSchema = v.union([
  PointSchema,
  MultiPointSchema,
  LineStringSchema,
  MultiLineStringSchema,
  PolygonSchema,
  MultiPolygonSchema,
  GeometryCollectionSchema,
  NullObjectSchema,
]);
export type GeometryObject = v.InferOutput<typeof GeometryObjectSchema>;
