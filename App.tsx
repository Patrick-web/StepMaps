import { Canvas, Circle, Group, Path, Skia } from "@shopify/react-native-skia";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Magnetometer, Pedometer } from "expo-sensors";
import {
  angleBetweenDirection,
  angleMatchedToDevice,
  angleToDirection,
  autoAnimate,
  getAngleFromMagnetometer,
} from "./utils";
import { CompassDirection } from "./types";

const { width: sWidth, height: sHeight } = Dimensions.get("window");

const RouteProgressBar = () => {
  const animation = useRef(null);
  return (
    <View
      style={{
        position: "absolute",
        bottom: "21%",
        left: 0,
        width: "100%",
        paddingHorizontal: 30,
      }}
    >
      <View style={{ position: "absolute", left: "8%", top: -30 }}>
        <LottieView
          autoPlay={false}
          ref={animation}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#eee",
          }}
          source={require("./assets/walking.json")}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 10,
          borderRadius: 10,
          backgroundColor: "black",
        }}
      />
    </View>
  );
};

const Compass = ({ angleOfRotation }: { angleOfRotation: number }) => {
  //t prefix represents true compass value
  //v prefix represents virtual/mapped value from compass relative to the user's perception

  return (
    <View
      style={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        position: "absolute",
        bottom: "5%",
        right: 10,
        borderRadius: 50,
      }}
    >
      <Text>{angleOfRotation}</Text>
      <Image
        source={require("./assets/arrow.png")}
        style={{
          width: "35%",
          resizeMode: "center",
          transform: [
            {
              rotate: `${angleOfRotation}deg`,
            },
          ],
        }}
      />
    </View>
  );
};

const RouteProgressCard = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        borderRadius: 40,
        overflow: "hidden",
        width: "95%",
        height: "20%",
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.button}>
              <Feather name="x" size={24} color="black" />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <View style={styles.bottomY}>
              <View style={styles.centerY}>
                <Text style={styles.h2}>3000</Text>
                <Text style={styles.h3}>Steps</Text>
              </View>
            </View>

            <View>
              <View style={styles.centerY}>
                <Text style={styles.h1}>2</Text>
                <Text style={styles.h3}>Minutes</Text>
              </View>
            </View>

            <View style={styles.bottomY}>
              <View style={styles.centerY}>
                <Text style={styles.h2}>10</Text>
                <Text style={styles.h3}>Meters</Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Pressable style={styles.button}>
              <Feather name="volume-2" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const RecordingProgressCard = ({ steps }: { steps: number }) => {
  const animation = useRef(null);
  return (
    <View
      style={{
        backgroundColor: "black",
        width: "95%",
        left: 10,
        padding: 15,
        borderRadius: 30,
        position: "absolute",
        zIndex: 3,
        top: "7%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ ...styles.h1, fontSize: 22, width: "35%" }}>
        Recording Route ...
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          width: "19%",
          height: "100%",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Text style={{ ...styles.h2, color: "black" }}>{steps}</Text>
        <Text style={{ ...styles.h3, color: "black" }}> Steps</Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          width: "19%",
          height: "100%",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Text style={{ ...styles.h2, color: "black" }}>
          {(steps * 0.7).toFixed(1)}
        </Text>
        <Text style={{ ...styles.h3, color: "black" }}>Meters</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          width: "19%",
          height: "100%",
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#eee",
          }}
          source={require("./assets/walking.json")}
        />
      </View>
    </View>
  );
};

const RouteRecordingActionsCard = () => {
  return (
    <View style={{ left: 10, width: "95%", position: "absolute", bottom: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingBottom: 10,
        }}
      >
        <Pressable
          style={{
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "crimson",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#259861",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Finish</Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          padding: 15,
          borderRadius: 30,
          zIndex: 3,
        }}
      >
        <Text style={{ fontSize: 16, color: "white", marginBottom: 10 }}>
          Select if you are on any of the following
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable style={styles.iconButton}>
            <MaterialCommunityIcons name="stairs" size={24} color="black" />
            <Text style={styles.iconButtonLabel}>Staircase</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <MaterialCommunityIcons
              name="elevator-passenger-outline"
              size={24}
              color="black"
            />
            <Text style={styles.iconButtonLabel}>Elevator</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <MaterialCommunityIcons name="escalator" size={24} color="black" />
            <Text style={styles.iconButtonLabel}>Escalator</Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <Pressable style={styles.iconButton}>
            <MaterialCommunityIcons name="instagram" size={24} color="black" />
            <Text style={styles.iconButtonLabel}>Tag this Point</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const Map = () => {
  const [currentXY, setCurrentX] = useState({
    x: sWidth / 2,
    y: sHeight - 200,
  });
  const [path, setPath] = useState(Skia.Path.Make());
  const [steps, setSteps] = useState(0);

  let tStartingDirection: CompassDirection;
  const [angleOfRotation, setAngleOfRotation] = useState(0);

  path.moveTo(currentXY.x, currentXY.y);
  // path.lineTo(currentX, 300);
  function drawLine(x: number, y: number) {
    path.lineTo(x, y);
    setCurrentX({ x, y });
  }
  function test() {
    const steps = Math.floor(Math.random() * 1000);
    const turn = Math.floor(Math.random() * 360);
    const yDisplacement = Math.ceil(steps * Math.sin(turn));
    const xDisplacement = Math.ceil(steps * Math.cos(turn));
    // const yCordinateDisplacement()
    const newX = Math.floor(Math.random() * 400);
    const newY = Math.floor(Math.random() * 400);
    drawLine(newX, newY);
  }

  function drawPath() {
    console.log(steps);
    console.log(angleOfRotation);
    if (steps == 0) return;
    const xDisplacement = Math.ceil(steps * Math.cos(angleOfRotation));
    const yDisplacement = Math.ceil(steps * Math.sin(angleOfRotation));
    console.log(xDisplacement, yDisplacement);
    drawLine(currentXY.x, currentXY.y - steps / 2);
  }

  function initializeCompass(angle: number) {
    console.log("Initializing Compass...");
    //Get Starting Direction
    const direction = angleToDirection(angle);
    console.log("Starting Direction: " + direction);
    tStartingDirection = direction;
    console.log(tStartingDirection);
    console.log(angleOfRotation);
  }

  let prevDirection = "";
  function updateCompass(angle: number) {
    const newDirection = angleToDirection(angle);
    // if (newDirection === tStartingDirection) return;
    if (prevDirection === newDirection) return;
    prevDirection = newDirection;
    console.log(tStartingDirection);
    console.log("=====");
    console.log(newDirection);

    const offsetAngle = angleBetweenDirection(tStartingDirection, newDirection);
    // console.log(offsetAngle);
    const newRotation = 0 + offsetAngle;
    autoAnimate();
    setAngleOfRotation(newRotation);
    return;
  }

  useEffect(() => {
    if (steps < 2) return;
    drawPath();
  }, [steps, angleOfRotation]);

  useEffect(() => {
    const pedometerSubscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });
    const magnetometerSubscription = Magnetometer.addListener((data) => {
      const angle = angleMatchedToDevice(getAngleFromMagnetometer(data));
      if (tStartingDirection) {
        updateCompass(angle);
      } else {
        initializeCompass(angle);
      }
    });

    return () => {
      pedometerSubscription.remove();
      magnetometerSubscription.remove();
    };
  }, []);

  return (
    <>
      <RecordingProgressCard steps={steps} />
      <Canvas style={{ flex: 1, transform: [{ rotate: "0deg" }] }}>
        <Path
          path={path}
          color="black"
          style={"stroke"}
          strokeWidth={10}
          strokeCap={"round"}
          strokeJoin={"round"}
        />
      </Canvas>
      <Compass angleOfRotation={angleOfRotation} />
    </>
  );
};

const App = () => {
  const size = 256;
  const r = size * 0.33;
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ height: "80%", width: "100%" }}>
        <Map />
      </View>
      <RouteRecordingActionsCard />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 40,
    padding: 10,
  },
  h1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 34,
  },
  h2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  h3: {
    color: "white",
    fontWeight: "300",
    fontSize: 16,
  },
  centerY: {
    alignItems: "center",
  },
  bottomY: {
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  iconButtonLabel: {
    fontWeight: "bold",
    marginLeft: 2,
  },
});
export default App;
