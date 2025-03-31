import * as v from 'valibot';
import {
  type GeometryObject,
  GeometryObjectSchema,
} from './geometry-object.js';
import {
  type GeometryObjectBase,
  GeometryObjectBaseSchema,
} from './geometry-object-base.js';

// 2.2.7. GeometryCollection
export const GeometryCollectionSchema: v.GenericSchema<
  GeometryCollection
> = v.looseObject({
  ...GeometryObjectBaseSchema.entries,
  type: v.literal('GeometryCollection'),
  geometries: v.array(v.lazy(() => GeometryObjectSchema)),
});
// Must manually define type to resolve circular type dependency
export type GeometryCollection = GeometryObjectBase & {
  type: 'GeometryCollection';
  geometries: GeometryObject[];
};
