import { validate } from '@hyperjump/json-schema/draft-07';
import * as jsons from 'topojson-tests';
import { describe, expect, it } from 'vitest';

interface TestInfo<T extends keyof typeof jsons.invalid> {
  testJsonsKey: T;
  unhandledCases: (keyof (typeof jsons.invalid[T]))[];
}

function testInfo<T extends keyof typeof jsons.invalid>(
  testJsonsKey: T,
  unhandledCases: (keyof (typeof jsons.invalid[T]))[],
): TestInfo<T> {
  return { testJsonsKey, unhandledCases };
}

const testInfos = [
  testInfo('arcIndexes', []),
  testInfo('arcs', []),
  testInfo('bbox', ['badBoundOrder', 'oddLength']),
  testInfo('geometryCollection', []),
  testInfo('lineString', []),
  testInfo('multiLineString', []),
  testInfo('multiPoint', []),
  testInfo('multiPolygon', []),
  testInfo('nullObject', []),
  testInfo('objects', []),
  testInfo('point', []),
  testInfo('polygon', []),
  testInfo('position', []),
  testInfo('topology', [
    'oobArcIndexNegative',
    'oobArcIndexPositive',
    'quantizedWithFloat',
    'threePositionMultiArcLinearRingQuantized',
    'threePositionMultiArcLinearRingUnquantized',
    'threePositionSingleArcLinearRingQuantized',
    'threePositionSingleArcLinearRingUnquantized',
    'unclosedLinearRing',
  ]),
  testInfo('transform', []),
];

function capitalizeFirstLetter(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

for (const { testJsonsKey, unhandledCases } of testInfos) {
  describe(testJsonsKey, async () => {
    const jsonSchemaPath = `./dist/schemas/draft-07/` +
      `${capitalizeFirstLetter(testJsonsKey)}.schema.json`;
    const validateJson = await validate(jsonSchemaPath);

    for (const [key, val] of Object.entries(jsons.valid[testJsonsKey])) {
      it(`should successfully parse valid ${testJsonsKey}: ${key}`, () => {
        expect(validateJson(val).valid).toBe(true);
      });
    }
    for (const [key, val] of Object.entries(jsons.invalid[testJsonsKey])) {
      if (!(unhandledCases as string[]).includes(key)) {
        it(`should fail to parse invalid ${testJsonsKey}: ${key}`, () => {
          expect(validateJson(val).valid).toBe(false);
        });
      }
    }
  });
}
