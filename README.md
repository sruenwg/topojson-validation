# TopoJSON Validation

This repository aims to provide convenience tools for validating TopoJSON data.

In this monorepo:
- `topojson-tests`: A set of valid/invalid TopoJSON test cases
- `topojson-schema`: JSON Schemas for TopoJSON
- `topojson-valibot`: Valibot schemas for TopoJSON

All definitions and test cases in this project are intended to reflect the [official TopoJSON specification](https://github.com/topojson/topojson-specification) as much as possible.
Where the specification is unclear, as a general principle, this project tries to err on the side of being permissive rather than falsely flag errors.


## Limitations

- While schemas are exposed for individual TopoJSON parts, some of these constituent parts depend on other parts of the topology and thus may become invalid when placed within a topology. For instance, a polygon with `arcs: [[3,4]]` may be marked as valid if validated against a polygon schema, but an error would be flagged if the polygon were validated against a topology schema as part of a topology containing only 4 arcs (since arc index 4 would be out of bounds).

- Schemas do not check ring order in polygons/multipolygons, i.e. whether the first ring in an array of linear rings is indeed the outer ring and all subsequent rings are inner rings/holes. (This may change in the future as this should be computable.)

- Schemas do not check whether the bbox coordinates actually match the bounds of the contained geometries. This is because quantization may introduce slight errors to the geometries' coordinate values.

- Schemas do not check whether the number of bbox dimensions matches the number of geometry dimensions. This is to prevent any issues with TopoJSONs generated using the reference implementation `topojson-server`, which as of v3.0.1 retains the z dimension in the output TopoJSON object while producing only x and y values in the corresponding bbox (see [issue](https://github.com/topojson/topojson-server/issues/5)).

- Several more cases are not handled by `topojson-schema` due to the limited ability of JSON Schemas in performing complex checks. See `topojson-schema/test` for the list of checks that are skipped.


## Acknowledgements

This project was heavily inspired by the [GeoJSON Schema](https://github.com/geojson/schema) repository, with this project intially aiming to provide something of an equivalent but for the TopoJSON format.
