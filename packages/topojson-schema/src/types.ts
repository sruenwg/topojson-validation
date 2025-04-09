import type { Schema } from '@exodus/schemasafe';

export type JsonSchema = Exclude<Schema, boolean>;

export interface SchemaContext {
  root?: string;
  definitions: Map<string, JsonSchema>;
}

export type GeometryType =
  | 'Point'
  | 'MultiPoint'
  | 'LineString'
  | 'MultiLineString'
  | 'Polygon'
  | 'MultiPolygon'
  | 'GeometryCollection';
