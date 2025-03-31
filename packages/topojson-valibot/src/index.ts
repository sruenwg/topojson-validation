import * as v from 'valibot';

v.setGlobalConfig({
  abortEarly: true,
  abortPipeEarly: true,
});

export { type ArcIndexes, ArcIndexesSchema } from './schemas/arc-indexes.js';
export { type Arcs, ArcsSchema } from './schemas/arcs.js';
export { type Bbox, BboxSchema } from './schemas/bbox.js';
export { type Objects, ObjectsSchema } from './schemas/objects.js';
export { type Position, PositionSchema } from './schemas/position.js';
export { type TopoJsonObject, TopoJsonObjectSchema } from './schemas/topojson-object.js';
export { type Topology, TopologySchema } from './schemas/topology.js';
export { type Transform, TransformSchema } from './schemas/transform.js';

export { type GeometryCollection, GeometryCollectionSchema } from './schemas/geometry/geometry-collection.js';
export { type GeometryObject, GeometryObjectSchema } from './schemas/geometry/geometry-object.js';
export { type LineString, LineStringSchema } from './schemas/geometry/line-string.js';
export { type MultiLineString, MultiLineStringSchema } from './schemas/geometry/multi-line-string.js';
export { type MultiPoint, MultiPointSchema } from './schemas/geometry/multi-point.js';
export { type MultiPolygon, MultiPolygonSchema } from './schemas/geometry/multi-polygon.js';
export { type NullObject, NullObjectSchema } from './schemas/geometry/null-object.js';
export { type Point, PointSchema } from './schemas/geometry/point.js';
export { type Polygon, PolygonSchema } from './schemas/geometry/polygon.js';
