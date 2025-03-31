import { createGeometryObjectJsonSchema } from '../utils';
import { Position } from './position';

export const Point = createGeometryObjectJsonSchema(
  'Point',
  (context) => ({
    coordinates: Position(context),
  }),
);
