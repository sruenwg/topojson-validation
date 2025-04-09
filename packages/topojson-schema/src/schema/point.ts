import { createGeometryObjectJsonSchema } from '../utils';
import { Position } from './position';

// 2.2.1. Point
export const Point = createGeometryObjectJsonSchema(
  'Point',
  (context) => ({
    coordinates: Position(context),
  }),
);
