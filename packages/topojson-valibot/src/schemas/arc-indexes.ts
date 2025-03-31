import * as v from 'valibot';

// 2.1.4. ArcIndexes
export const ArcIndexesSchema = v.array(v.pipe(v.number(), v.integer()));
export type ArcIndexes = v.InferOutput<typeof ArcIndexesSchema>;
