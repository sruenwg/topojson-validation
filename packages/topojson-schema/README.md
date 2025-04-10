# TopoJSON Schema

This package provides [JSON Schema](https://json-schema.org/)s for validating [TopoJSON](https://github.com/topojson/topojson-specification) data.

Similar to [geojson-schema](https://github.com/geojson/schema), self-complete schemas are generated for each constituent part of the TopoJSON format.

Only the `draft-07` dialect is currently supported.

Main schema:
- [Topology](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Topology.json)

Geometry schemas:
- [Point](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Point.json)
- [MultiPoint](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiPoint.json)
- [LineString](https://sruenwg.github.io/topojson-validation/schemas/draft-07/LineString.json)
- [MultiLineString](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiLineString.json)
- [Polygon](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Polygon.json)
- [MultiPolygon](https://sruenwg.github.io/topojson-validation/schemas/draft-07/MultiPolygon.json)
- [Null Object](https://sruenwg.github.io/topojson-validation/schemas/draft-07/NullObject.json)
- [Geometry Collection](https://sruenwg.github.io/topojson-validation/schemas/draft-07/GeometryCollection.json)
- [Geometry Objects](https://sruenwg.github.io/topojson-validation/schemas/draft-07/GeometryObject.json)

Other schemas:
- [Arc Indexes](https://sruenwg.github.io/topojson-validation/schemas/draft-07/ArcIndexes.json)
- [Arcs](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Arcs.json)
- [Bounding Boxes](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Bbox.json)
- [Objects](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Objects.json)
- [Position](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Position.json)
- [TopoJSON Objects](https://sruenwg.github.io/topojson-validation/schemas/draft-07/TopoJsonObject.json)
- [Transform](https://sruenwg.github.io/topojson-validation/schemas/draft-07/Transform.json)


## Limitations

Some requirements of the TopoJSON specification are not fully validated by these schemas, in part due to the difficulty of performing complex validation via JSON Schema.

See the tests in the `test` folder (alongside the [`topojson-tests`](https://github.com/sruenwg/topojson-validation/tree/main/packages/topojson-tests) package which the tests rely on) for details on what cases are/aren't handled.
