import { createGeometryObjectJsonSchema } from '../utils';

export const NullObject = createGeometryObjectJsonSchema(null, () => ({}));
