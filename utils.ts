import { LayoutAnimation } from "react-native";
import { AnimationType, CompassDirection, MagnetometerData } from "./types";

export const compassDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
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

export function getApproximateAngle(degree: number) {
  if (degree >= 22.5 && degree < 67.5) {
    return {
      direction: "NE",
      approxAngle: 45,
    };
  } else if (degree >= 67.5 && degree < 112.5) {
    return {
      direction: "E",
      approxAngle: 90,
    };
  } else if (degree >= 112.5 && degree < 157.5) {
    return { direction: "SE", approxAngle: 135 };
  } else if (degree >= 157.5 && degree < 202.5) {
    return { direction: "S", approxAngle: 189 };
  } else if (degree >= 202.5 && degree < 247.5) {
    return { direction: "SW", approxAngle: 225 };
  } else if (degree >= 247.5 && degree < 292.5) {
    return { direction: "W", approxAngle: 270 };
  } else if (degree >= 292.5 && degree < 337.5) {
    return { direction: "NW", approxAngle: 315 };
  } else {
    return { direction: "N", approxAngle: 360 };
  }
}

export function angleToDirection(d: number): CompassDirection {
  if (11.25 <= d && d < 33.75) {
    return "NNE";
  } else if (33.75 <= d && d < 56.25) {
    return "NE";
  } else if (56.25 <= d && d < 78.75) {
    return "ENE";
  } else if (78.75 <= d && d < 101.25) {
    return "E";
  } else if (101.25 <= d && d < 123.75) {
    return "ESE";
  } else if (123.75 <= d && d < 146.25) {
    return "SE";
  } else if (146.25 <= d && d < 168.75) {
    return "SSE";
  } else if (168.75 <= d && d < 191.25) {
    return "S";
  } else if (191.25 <= d && d < 213.75) {
    return "SSW";
  } else if (213.75 <= d && d < 236.25) {
    return "SW";
  } else if (236.25 <= d && d < 258.75) {
    return "WSW";
  } else if (258.75 <= d && d < 281.25) {
    return "W";
  } else if (281.25 <= d && d < 303.75) {
    return "WNW";
  } else if (303.75 <= d && d < 326.25) {
    return "NW";
  } else if (326.25 <= d && d < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
}

//sD => StartingDirection, cD => Current Direction
export function directionToAngle(direction: CompassDirection) {
  switch (direction) {
    case "NNE":
      return 22.5;
    case "NE":
      return 45;
    case "ENE":
      return 67.5;
    case "E":
      return 90;
    case "ESE":
      return 112.5;
    case "SE":
      return 135;
    case "SSE":
      return 157.5;
    case "S":
      return 180;
    case "SSW":
      return 202.5;
    case "SW":
      return 225;
    case "WSW":
      return 247.5;
    case "W":
      return 270;
    case "WNW":
      return 292.5;
    case "NW":
      return 315;
    case "NNW":
      return 337.5;
    default:
      return 0;
  }
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
