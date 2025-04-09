import { createJsonSchema } from '../utils';
import { GeometryObject } from './geometry-object';
import { Topology } from './topology';

// 2. TopoJSON Objects
export const TopoJsonObject = createJsonSchema('TopoJsonObject', (context) => ({
  oneOf: [
    Topology(context),
    GeometryObject(context),
  ],
}));
