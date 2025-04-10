# TopoJSON Validation

This repository aims to provide convenience tools for validating TopoJSON data.

In this monorepo:
- `topojson-tests`: A set of valid/invalid TopoJSON test cases
- `topojson-schema`: JSON Schemas for TopoJSON
- `topojson-valibot`: Valibot schemas for TopoJSON

All definitions and test cases in this project are intended to reflect the [official TopoJSON specification](https://github.com/topojson/topojson-specification) as much as possible.
Where the specification is unclear, as a general principle, this project tries to err on the side of being permissive rather than falsely flag errors.


## Limitations

While this project provides schemas for individual parts of the TopoJSON format (e.g. not just the Topology but also Bbox, Transform, etc.), some of these constituent parts depend on other parts of the topology and thus may become invalid within the context of a whole topology. For instance, a polygon with `arcs: [[3,4]]` may be marked as valid if validated against a polygon schema, but an error would be flagged if the polygon were validated against a topology schema as part of a topology containing only 4 arcs (since arc index 4 would be out of bounds).

See individual packages for package-specific limitations.


## Development

This project uses [Bun workspaces](https://bun.sh/docs/install/workspaces).
```
# Install dependencies at top level
cd topojson-validation
bun install

# Develop
cd topojson-schema
... # Make changes
bun run build
bun run test
```


## Acknowledgements

This project was heavily inspired by the [GeoJSON Schema](https://github.com/geojson/schema) repository, with this project intially aiming to provide something of an equivalent but for the TopoJSON format.
