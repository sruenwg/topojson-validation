# TopoJSON Schema

This package provides [JSON Schema](https://json-schema.org/)s for validating [TopoJSON](https://github.com/topojson/topojson-specification) data.

Similar to [geojson-schema](https://github.com/geojson/schema), self-complete schemas are generated for each constituent part of the TopoJSON format.

Only the `draft-07` dialect is currently supported.

Main schema:
- [Topology](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Topology.json)

Geometry schemas:
- [Point](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Point.json)
- [MultiPoint](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiPoint.json)
- [LineString](https://sruenwg.github.io/topojson-validation/schemas/draft-07/LineString.json)
- [MultiLineString](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiLineString.json)
- [Polygon](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Polygon.json)
- [MultiPolygon](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiPolygon.json)
- [NullObject](https://sruenwg.github.io/topojson-validation/schemas/draft-07/NullObject.json)
- [GeometryCollection](https://sruenwg.github.io/topojson-validation/schemas/draft-07/GeometryCollection.json)
- [GeometryObject](https://sruenwg.github.io/topojson-validation/schemas/draft-07/GeometryObject.json)

Other schemas:
- [ArcIndexes](https://sruenwg.github.io/topojson-validation/schemas/draft-07/ArcIndexes.json)
- [Arcs](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Arcs.json)
- [Bbox](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Bbox.json)
- [Objects](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Objects.json)
- [Position](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Position.json)
- [TopoJsonObject](https://sruenwg.github.io/topojson-validation/schemas/draft-07/TopoJsonObject.json)
- [Transform](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Transform.json)


## Usage

To use the schemas, either install the package via `npm install @sruenwg/topojson-schema` or fetch the schemas from the links above.
Make sure your validator supports JSON Schema draft-07.

Example using Ajv:
```ts
import Ajv from 'ajv';
import { Topology as installedSchema } from '@sruenwg/topojson-schema/draft-07';

const ajv = new Ajv();
const myTopology = {
  type: 'Topology',
  objects: {...},
  arcs: [...],
};

// Using schema from installed topojson-schema package
let isTopology = ajv.validate(installedSchema, myTopology);

// Using schema from URL
const fetchedSchema = await fetch('https://sruenwg.github.io/topojson-validation/schemas/draft-07/Topology.json')
  .then((res) => res.json());
isTopology = ajv.validate(fetchedSchema, myTopology);
```


## Limitations

Some requirements of the TopoJSON specification are not fully validated by these schemas, in part due to the difficulty of performing complex validation via JSON Schema.

See the [`test`](https://github.com/sruenwg/topojson-validation/tree/main/packages/topojson-schema/test) folder (along with the [`topojson-tests`](https://github.com/sruenwg/topojson-validation/tree/main/packages/topojson-tests) package which the tests rely on) for details on what cases are/aren't handled.
