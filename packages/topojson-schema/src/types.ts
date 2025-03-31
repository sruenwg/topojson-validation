import type { JsonSchemaDraft07 } from '@hyperjump/json-schema/draft-07';

export type JsonSchema = Exclude<JsonSchemaDraft07, boolean>;

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
