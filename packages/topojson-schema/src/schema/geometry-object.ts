import { createJsonSchema } from '../utils';
import { GeometryCollection } from './geometry-collection';
import { LineString } from './line-string';
import { MultiLineString } from './multi-line-string';
import { MultiPoint } from './multi-point';
import { MultiPolygon } from './multi-polygon';
import { NullObject } from './null-object';
import { Point } from './point';
import { Polygon } from './polygon';

export const GeometryObject = createJsonSchema('GeometryObject', (context) => ({
  oneOf: [
    Point(context),
    MultiPoint(context),
    LineString(context),
    MultiLineString(context),
    Polygon(context),
    MultiPolygon(context),
    GeometryCollection(context),
    NullObject(context),
  ],
}));
