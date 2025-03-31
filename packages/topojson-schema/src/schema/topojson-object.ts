import { createJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';
import { Topology } from './topology';

export const TopoJsonObject = createJsonSchema('TopoJsonObject', (context) => ({
  oneOf: [
    Topology(context),
    GeometryObject(context),
  ],
}));
