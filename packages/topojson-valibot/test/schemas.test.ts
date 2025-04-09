import * as jsons from '@sruenwg/topojson-tests';
import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import {
  ArcIndexesSchema,
  ArcsSchema,
  BboxSchema,
  GeometryCollectionSchema,
  LineStringSchema,
  MultiLineStringSchema,
  MultiPointSchema,
  MultiPolygonSchema,
  NullObjectSchema,
  ObjectsSchema,
  PointSchema,
  PolygonSchema,
  PositionSchema,
  TopologySchema,
  TransformSchema,
} from '../src/index.js';

const testInfos = [
  {
    label: 'TopologySchema',
    schema: TopologySchema,
    testJsonsKey: 'topology',
  },
  {
    label: 'ArcIndexesSchema',
    schema: ArcIndexesSchema,
    testJsonsKey: 'arcIndexes',
  },
  {
    label: 'ArcsSchema',
    schema: ArcsSchema,
    testJsonsKey: 'arcs',
  },
  {
    label: 'BboxSchema',
    schema: BboxSchema,
    testJsonsKey: 'bbox',
  },
  {
    label: 'ObjectsSchema',
    schema: ObjectsSchema,
    testJsonsKey: 'objects',
  },
  {
    label: 'PositionSchema',
    schema: PositionSchema,
    testJsonsKey: 'position',
  },
  {
    label: 'TransformSchema',
    schema: TransformSchema,
    testJsonsKey: 'transform',
  },
  // Geometries
  {
    label: 'GeometryCollectionSchema',
    schema: GeometryCollectionSchema,
    testJsonsKey: 'geometryCollection',
  },
  {
    label: 'LineStringSchema',
    schema: LineStringSchema,
    testJsonsKey: 'lineString',
  },
  {
    label: 'MultiLineStringSchema',
    schema: MultiLineStringSchema,
    testJsonsKey: 'multiLineString',
  },
  {
    label: 'MultiPointSchema',
    schema: MultiPointSchema,
    testJsonsKey: 'multiPoint',
  },
  {
    label: 'MultiPolygonSchema',
    schema: MultiPolygonSchema,
    testJsonsKey: 'multiPolygon',
  },
  {
    label: 'NullObjectSchema',
    schema: NullObjectSchema,
    testJsonsKey: 'nullObject',
  },
  {
    label: 'PointSchema',
    schema: PointSchema,
    testJsonsKey: 'point',
  },
  {
    label: 'PolygonSchema',
    schema: PolygonSchema,
    testJsonsKey: 'polygon',
  },
] satisfies {
  label: string;
  schema: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;
  testJsonsKey: keyof typeof jsons.valid;
}[];

for (const { label, schema, testJsonsKey } of testInfos) {
  describe(label, () => {
    for (const [key, val] of Object.entries(jsons.valid[testJsonsKey])) {
      it(`should successfully parse valid ${testJsonsKey}: ${key}`, () => {
        expect.soft(v.safeParse(schema, val).success).toBe(true);
      });
    }
  
    for (const [key, val] of Object.entries(jsons.invalid[testJsonsKey])) {
      it(`should fail to parse invalid ${testJsonsKey}: ${key}`, () => {
        expect.soft(v.safeParse(schema, val).success).toBe(false);
      });
    }
  });
}
