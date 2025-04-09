# TopoJSON Tests

This package contains examples of valid and invalid TopoJSONs (and constituent parts of the TopoJSON format) following the requirements listed in the official [TopoJSON specification](https://github.com/topojson/topojson-specification).

Note that this package considers anything not explicitly prohibited in the specification as valid, e.g. a 10-dimension geometry is valid since the specification does not place an upper limit on the number of dimensions, regardless of how unlikely or unwise it may be for such data to be used.
Recommendations (SHOULDs and SHOULD NOTs) are not taken into account.


## Coverage

Tests for some of the more complex TopoJSON requirements are not included (yet), namely:

- Polygon ring order: Missing test to check whether the first ring in an array of linear rings is indeed the outer ring and all subsequent rings are inner rings/holes. This may be added in the future.

- Bounding box accuracy: Missing test to check whether bbox coordinates actually match the bounds of the contained geometries. This is intentionally left out because quantization may introduce slight errors to the geometries' coordinate values, making this check difficult to meaningfully implement.

- Bounding box arity: Missing test to check whether the number of bbox dimensions matches the number of geometry dimensions. This is intentionally left out to prevent potential issues with TopoJSONs generated using the reference implementation [`topojson-server`](https://github.com/topojson/topojson-server), which as of v3.0.1 retains the z dimension in the output TopoJSON object while producing only x and y values in the corresponding bbox (see [issue](https://github.com/topojson/topojson-server/issues/5)).


## Usage

The intended use is for these tests to help check the correctness of a validator implementation.

```ts
import * as tests from '@sruenwg/topojson-tests';

for (const validTopology of Object.values(tests.valid.topology)) {
  const isTopology = myTopologyValidator.parse(validTopology);
  if (!isTopology) {
    // Unexpected: Should have parsed successfully
  }
}
for (const invalidTopology of Object.values(tests.invalid.topology)) {
  const isTopology = myTopologyValidator.parse(invalidTopology);
  if (isTopology) {
    // Unexpected: Should not have parsed successfully
  }
}
```
