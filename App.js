import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    console.log(location); // location을 못가져옴 왜?????
    // setCity(location[0].city);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Pyeongtaek</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a7bd5",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "black",
    fontSize: 38,
    fontWeight: "bold",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 20,
    fontSize: 180,
  },
  description: {
    marginTop: -40,
    fontSize: 70,
  },
});
