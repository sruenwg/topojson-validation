# TopoJSON Schema

This package provides [JSON Schema](https://json-schema.org/)s for validating [TopoJSON](https://github.com/topojson/topojson-specification) data.

Similar to [geojson-schema](https://github.com/geojson/schema), self-complete schemas are generated for each constituent part of the TopoJSON format.


## Limitations

Some requirements of the TopoJSON specification are not fully validated by these schemas, in part due to the difficulty of performing complex validation via JSON Schema.

See the tests in the `test` folder (alongside the [`topojson-tests`](https://github.com/sruenwg/topojson-validation/tree/main/packages/topojson-tests) package which the tests rely on) for details on what cases are/aren't handled.
