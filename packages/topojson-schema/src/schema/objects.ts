import { createJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';

export const Objects = createJsonSchema('Objects', (context) => ({
  type: 'object',
  additionalProperties: GeometryObject(context),
}));
