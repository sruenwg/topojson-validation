import type { JsonSchema, SchemaContext } from './types';
import { ArcIndexes } from './schema/arc-indexes';
import { Arcs } from './schema/arcs';
import { Bbox } from './schema/bbox';
import { GeometryCollection } from './schema/geometry-collection';
import { GeometryObject } from './schema/geometry-object';
import { LineString } from './schema/line-string';
import { MultiLineString } from './schema/multi-line-string';
import { MultiPoint } from './schema/multi-point';
import { MultiPolygon } from './schema/multi-polygon';
import { NullObject } from './schema/null-object';
import { Objects } from './schema/objects';
import { Point } from './schema/point';
import { Polygon } from './schema/polygon';
import { Position } from './schema/position';
import { TopoJsonObject } from './schema/topojson-object';
import { Topology } from './schema/topology';
import { Transform } from './schema/transform';

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
  return Bun.write(
    `./dist/schemas/draft-07/${id}.schema.json`,
    JSON.stringify(schema, null, 2),
  );
});

await Promise.all(schemaWrites);
