# TopoJSON Valibot

This package provides [Valibot](https://valibot.dev/) schemas for validating [TopoJSON](https://github.com/topojson/topojson-specification) data.

Schemas and their inferred types are provided for each constituent part of the TopoJSON format.


## Usage

Simply use the schemas like any other Valibot schema.
```ts
import * as v from 'valibot';
import { TopologySchema } from '@sruenwg/topojson-valibot';

const myTopology = {
  type: 'Topology',
  objects: {...},
  arcs: [...],
};
const isTopology = v.safeParse(TopologySchema, myTopology).success;
```

Types inferred from the schemas are also exported for convenience.
```ts
import type { Position } from '@sruenwg/topojson-valibot';

function truncateDimensions(pos: Position) {
  ...
}
```


## Limitations

Some requirements of the TopoJSON specification are not fully validated by these schemas.

See the tests in the `test` folder (alongside the [`topojson-tests`](https://github.com/sruenwg/topojson-validation/tree/main/packages/topojson-tests) package which the tests rely on) for details on what cases are/aren't handled.
