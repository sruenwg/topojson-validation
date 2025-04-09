import { createGeometryObjectJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';

// 2.2.7. Geometry Collection
export const GeometryCollection = createGeometryObjectJsonSchema(
  'GeometryCollection',
  (context) => ({
    geometries: {
      type: 'array',
      items: GeometryObject(context),
    },
  }),
);
