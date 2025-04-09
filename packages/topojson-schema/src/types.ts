import type {
  Json as SchemaSafeJson,
  Schema as SchemaSafeSchema,
} from '@exodus/schemasafe';

export type Json = SchemaSafeJson;
export type JsonSchema = Exclude<SchemaSafeSchema, boolean>;

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
