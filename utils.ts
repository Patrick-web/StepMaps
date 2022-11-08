import { LayoutAnimation } from "react-native";
import {
  AnimationType,
  CompassDirection,
  CompassDirectionObj,
  MagnetometerData,
} from "./types";

export const compassDirections: CompassDirectionObj[] = [
  {
    direction: "N",
    upperLimit: 338,
    lowerLimit: 22,
  },
  {
    direction: "NE",
    upperLimit: 23,
    lowerLimit: 67,
  },
  {
    direction: "E",
    upperLimit: 68,
    lowerLimit: 112,
  },
  {
    direction: "SE",
    upperLimit: 113,
    lowerLimit: 157,
  },
  {
    direction: "S",
    upperLimit: 158,
    lowerLimit: 202,
  },
  {
    direction: "SW",
    upperLimit: 203,
    lowerLimit: 247,
  },
  {
    direction: "W",
    upperLimit: 248,
    lowerLimit: 292,
  },
  {
    direction: "NW",
    upperLimit: 293,
    lowerLimit: 337,
  },
];

export function getAngleFromMagnetometer(magnetometer: MagnetometerData) {
  let angle = 0;
  if (magnetometer) {
    let { x, y, z } = magnetometer;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle);
}

export function angleMatchedToDevice(magnetometer: number) {
  return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
}

export function angleToDirection(d: number): CompassDirection {
  return (
    compassDirections.find((cd) => d >= cd.upperLimit && d <= cd.lowerLimit)
      ?.direction || "N"
  );
}

//sD => StartingDirection, cD => Current Direction
export function directionToAngle(direction: CompassDirection) {
  const directionObj = compassDirections.find(
    (cd) => cd.direction === direction
  );
  if (!directionObj) return 0;
  const angle = (directionObj.lowerLimit + directionObj.upperLimit) / 2;
  return angle;
}

export function angleBetweenDirection(
  da: CompassDirection,
  db: CompassDirection
) {
  const angleA = directionToAngle(da);
  const angleB = directionToAngle(db);

  return angleB - angleA;
}

export function autoAnimate(type: AnimationType = "ease") {
  switch (type) {
    case "ease":
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      break;
    case "spring":
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      break;
    case "linear":
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      break;
    default:
      break;
  }
  if (type == "ease") {
    return;
  }
}
