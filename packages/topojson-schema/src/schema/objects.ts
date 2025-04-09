import { createJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';

// 2.1.5. Objects
export const Objects = createJsonSchema('Objects', (context) => ({
  type: 'object',
  additionalProperties: GeometryObject(context),
}));
