import { ArcIndexes } from '../src/schema/arc-indexes';
import { Arcs } from '../src/schema/arcs';
import { Bbox } from '../src/schema/bbox';
import { GeometryCollection } from '../src/schema/geometry-collection';
import { GeometryObject } from '../src/schema/geometry-object';
import { LineString } from '../src/schema/line-string';
import { MultiLineString } from '../src/schema/multi-line-string';
import { MultiPoint } from '../src/schema/multi-point';
import { MultiPolygon } from '../src/schema/multi-polygon';
import { NullObject } from '../src/schema/null-object';
import { Objects } from '../src/schema/objects';
import { Point } from '../src/schema/point';
import { Polygon } from '../src/schema/polygon';
import { Position } from '../src/schema/position';
import { TopoJsonObject } from '../src/schema/topojson-object';
import { Topology } from '../src/schema/topology';
import { Transform } from '../src/schema/transform';
import type { JsonSchema, SchemaContext } from '../src/types';

const schemaInfos: Record<string, (context: SchemaContext) => JsonSchema> = {
  ArcIndexes,
  Arcs,
  Bbox,
  GeometryCollection,
  GeometryObject,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  NullObject,
  Objects,
  Point,
  Polygon,
  Position,
  TopoJsonObject,
  Topology,
  Transform,
};

const schemaWrites = Object.entries(schemaInfos).map(([id, createSchema]) => {
  const schema = createSchema({
    definitions: new Map(),
  });
  const kebabCaseName = convertIdToKebabCase(id);
  return Bun.write(
    `./dist/schemas/draft-07/${kebabCaseName}.schema.json`,
    JSON.stringify(schema, null, 2),
  );
});

await Promise.all(schemaWrites);

function convertIdToKebabCase(id: string) {
  return id
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replaceAll('topo-json', 'topojson');
}
