import { createGeometryObjectJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';

export const GeometryCollection = createGeometryObjectJsonSchema(
  'GeometryCollection',
  (context) => ({
    geometries: {
      type: 'array',
      items: GeometryObject(context),
    },
  }),
);
