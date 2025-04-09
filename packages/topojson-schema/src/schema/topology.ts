import { createJsonSchema } from '../utils';
import { Arcs } from './arcs';
import { Bbox } from './bbox';
import { Objects } from './objects';
import { Transform } from './transform';

// 2.1. Topology Objects
export const Topology = createJsonSchema('Topology', (context) => ({
  type: 'object',
  properties: {
    type: { const: 'Topology' },
    objects: Objects(context),
    arcs: Arcs(context),
    transform: Transform(context),
    bbox: Bbox(context),
  },
  required: ['type', 'objects', 'arcs'],
}));
