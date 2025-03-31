import * as v from 'valibot';
import type { ArcIndexes } from './arc-indexes.js';
import { type Arcs, ArcsSchema } from './arcs.js';
import { BboxSchema } from './bbox.js';
import type { GeometryObject } from './geometry/geometry-object.js';
import { ObjectsSchema } from './objects.js';
import type { Position } from './position.js';
import { TopoJsonObjectBaseSchema } from './topojson-object-base.js';
import { TransformSchema } from './transform.js';

// 2.1. Topology Objects
export const TopologySchema = v.pipe(
  v.looseObject({
    ...TopoJsonObjectBaseSchema.entries,
    type: v.literal('Topology'),
    objects: ObjectsSchema,
    arcs: ArcsSchema,
    transform: v.optional(TransformSchema),
    bbox: v.optional(BboxSchema),
  }),
  v.check(
    // If transform is defined, "[e]very position in the topology must be
    // quantized, with the first and second elements in each position an
    // integer."
    // https://github.com/topojson/topojson-specification#212-transforms
    ({ arcs, objects, transform }) => {
      if (transform === undefined) {
        return true;
      }
      if (Object.values(objects).some(hasFloatPosition)) {
        return false;
      }
      return arcs.every((arc) => {
        return arc.every((position) => {
          return !isFloatPosition(position);
        });
      });
    },
    'Invalid topology: ' +
    'Some position has a float in the x- or y-coordinate ' +
    'despite the topology being quantized.',
  ),
  v.check(
    ({ arcs, objects }) => {
      return Object.values(objects).every((geometryObject) => {
        return !hasOobArcIndex(geometryObject, arcs.length);
      });
    },
    'Invalid topology: Some arc index is out of bounds.',
  ),
  v.check(
    // "If more than one arc is referenced to construct a LineString or
    // LinearRing, the first position of a subsequent arc must be equal to the
    // last position of the previous arc."
    // https://github.com/topojson/topojson-specification#214-arc-indexes
    ({ arcs, objects, transform }) => {
      const isQuantized = transform !== undefined;
      return Object.values(objects).every((geometryObject) => {
        return !hasDiscontinuousArcs(geometryObject, arcs, isQuantized);
      });
    },
    'Invalid topology: Some geometry has discontinuous arcs.',
  ),
);
export type Topology = v.InferOutput<typeof TopologySchema>;

function hasFloatPosition(geometry: GeometryObject): boolean {
  switch (geometry.type) {
    case 'Point':
      return isFloatPosition(geometry.coordinates);
    case 'MultiPoint':
      return geometry.coordinates.some((position) => isFloatPosition(position));
    case 'GeometryCollection':
      return geometry.geometries.some((g) => hasFloatPosition(g));
    default:
      return false;
  }
}

function isFloatPosition(position: Position) {
  return !Number.isInteger(position[0]) || !Number.isInteger(position[1]);
}

function hasOobArcIndex(geometry: GeometryObject, numArcs: number): boolean {
  switch (geometry.type) {
    case 'LineString':
      return geometry.arcs
        .some((arcIndex) => isOobArcIndex(arcIndex, numArcs));
    case 'MultiLineString':
      return geometry.arcs.flat(1)
        .some((arcIndex) => isOobArcIndex(arcIndex, numArcs));
    case 'Polygon':
      return geometry.arcs.flat(1)
        .some((arcIndex) => isOobArcIndex(arcIndex, numArcs));
    case 'MultiPolygon':
      return geometry.arcs.flat(2)
        .some((arcIndex) => isOobArcIndex(arcIndex, numArcs));
    case 'GeometryCollection':
      return geometry.geometries.some((g) => hasOobArcIndex(g, numArcs));
    default:
      return false;
  }
}

function isOobArcIndex(arcIndex: number, numArcs: number) {
  return numArcs <= toIndexableArcIndex(arcIndex);
}

function toIndexableArcIndex(arcIndex: number) {
  return arcIndex < 0 ? ~arcIndex : arcIndex;
}

function hasDiscontinuousArcs(
  geometry: GeometryObject,
  arcs: Arcs,
  isQuantized: boolean,
): boolean {
  switch (geometry.type) {
    case 'LineString':
      return !getArcsContinuityInfo(geometry.arcs, arcs, isQuantized)
        .isLineString;
    case 'MultiLineString':
      return geometry.arcs.some((arcIndexes) => {
        return !getArcsContinuityInfo(arcIndexes, arcs, isQuantized)
          .isLineString;
      });
    case 'Polygon':
      return geometry.arcs.some((arcIndexes) => {
        return !getArcsContinuityInfo(arcIndexes, arcs, isQuantized)
          .isLinearRing;
      });
    case 'MultiPolygon':
      return geometry.arcs.flat(1).some((arcIndexes) => {
        return !getArcsContinuityInfo(arcIndexes, arcs, isQuantized)
          .isLinearRing;
      });
    case 'GeometryCollection':
      return geometry.geometries
        .some((g) => hasDiscontinuousArcs(g, arcs, isQuantized));
    default:
      return false;
  }
}

function getArcsContinuityInfo(
  arcIndexes: ArcIndexes,
  arcs: Arcs,
  isQuantized: boolean,
) {
  let numPositions = 1;
  let firstArcStartPosition: Position | undefined = undefined;
  let lastArcEndPosition: Position | undefined = undefined;
  
  for (const arcIndex of arcIndexes) {
    const flipped = arcIndex < 0;
    const arc = arcs[toIndexableArcIndex(arcIndex)];
    numPositions += arc.length - 1;
    const arcStartPosition = arc[0];
    const arcEndPosition = isQuantized
      ? getDecodedArcEndPosition(arc)
      : arc[arc.length - 1];
    
    if (lastArcEndPosition === undefined) {
      firstArcStartPosition = flipped
        ? arcEndPosition
        : arcStartPosition;
    } else {
      const expectedLastArcEndPosition = flipped
        ? arcEndPosition
        : arcStartPosition;
      if (!areSamePositions(lastArcEndPosition, expectedLastArcEndPosition)) {
        return { isLineString: false, isLinearRing: false };
      }
    }
    lastArcEndPosition = flipped ? arcStartPosition : arcEndPosition;
  }
  return {
    isLineString: true,
    isLinearRing: numPositions >= 4
      && lastArcEndPosition !== undefined
      && firstArcStartPosition !== undefined
      && areSamePositions(lastArcEndPosition, firstArcStartPosition),
  };
}

function getDecodedArcEndPosition(arc: Position[]) {
  let x = 0;
  let y = 0;
  for (const position of arc) {
    x += position[0];
    y += position[1];
  }
  const endPosition = arc[arc.length - 1];
  return [x, y, ...endPosition.slice(2)];
}

function areSamePositions(p0: Position, p1: Position) {
  if (p0.length !== p1.length) {
    return false;
  }
  for (let i = 0; i < p0.length; i += 1) {
    if (p0[i] !== p1[i]) {
      return false;
    }
  }
  return true;
}
