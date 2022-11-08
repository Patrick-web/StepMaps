export type AnimationType = "ease" | "spring" | "linear";

export type CompassDirection =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW"
  | "N";

export interface CompassDirectionObj {
  direction: CompassDirection;
  upperLimit: number;
  lowerLimit: number;
}
export interface MagnetometerData {
  x: number;
  y: number;
  z: number;
}
