import { Bbox } from './schema/bbox';
import type { GeometryType, JsonSchema, SchemaContext } from './types';

export function createJsonSchema(
  id: string,
  createSchema: (context: SchemaContext) => JsonSchema,
) {
  return (context: SchemaContext): JsonSchema => {
    if (context.definitions.has(id)) {
      return {
        $ref: context.root === id
          ? '#'
          : `#/definitions/${id}`,
      };
    }

    const isRoot = context.root === undefined;
    if (isRoot) {
      context.root = id;
    }
    // Set placeholder definition to avoid infinite recursion
    context.definitions.set(id, {});

    const schema = createSchema(context);
    if (isRoot) {
      context.definitions.delete(id);
      const definitions = [...context.definitions.entries()]
        .sort(([a], [b]) => a < b ? -1 : 1);
      return {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: id,
        ...schema,
        ...(context.definitions.size > 0
          ? { definitions: Object.fromEntries(definitions) }
          : {}
        ),
      };
    } else {
      context.definitions.set(id, schema);
      return { $ref: `#/definitions/${id}` };
    }
  };
}

export function createGeometryObjectJsonSchema<
  T extends GeometryType | null,
  P extends Record<string, JsonSchema>,
>(
  geometryType: T,
  createRequiredGeometryProperties: (context: SchemaContext) => P,
) {
  const id = geometryType === null ? 'NullObject' : geometryType;
  const createSchema = (context: SchemaContext) => {
    const requiredGeometryProperties = createRequiredGeometryProperties(context);
    return {
      type: 'object',
      required: ['type', ...Object.keys(requiredGeometryProperties)],
      properties: {
        type: (
          geometryType === null
            ? { type: 'null' }
            : { const: geometryType }
        ) as T extends null ? { type: 'null' } : { const: T },
        ...requiredGeometryProperties,
        bbox: Bbox(context),
        id: {
          oneOf: [
            { type: 'number' },
            { type: 'string' },
          ],
        },
        properties: {
          oneOf: [
            { type: 'object' },
            { type: 'null' },
          ],
        },
      },
    } as const satisfies JsonSchema;
  };
  return createJsonSchema(id, createSchema);
}
