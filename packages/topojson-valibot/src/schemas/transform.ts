import * as v from 'valibot';

// 2.1.2 Transforms
export const TransformSchema = v.object({
  scale: v.strictTuple([v.number(), v.number()]),
  translate: v.strictTuple([v.number(), v.number()]),
});
export type Transform = v.InferOutput<typeof TransformSchema>;
