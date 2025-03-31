import * as v from 'valibot';

// 3. Bounding Boxes
export const BboxSchema = v.pipe(
  v.array(v.number()),
  v.minLength(4),
  v.check(
    (input) => input.length % 2 === 0,
    'Invalid bounding box: Odd number of values.',
  ),
  v.check(
    (input) => {
      const midIndex = input.length / 2;
      for (let i = 0; i < midIndex; i += 1) {
        if (input[i] > input[midIndex + i]) {
          return false;
        }
      }
      return true;
    },
    'Invalid bounding box: Some dimension has invalid bound order.',
  ),
);
export type Bbox = v.InferOutput<typeof BboxSchema>;
