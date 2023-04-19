import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      onSkip={() => {
        navigation.replace("Home")
        AsyncStorage.setItem('alreadyLaunched16', "true");
        }}
      onDone={() => {
        navigation.replace("Home")
        AsyncStorage.setItem('alreadyLaunched16', "true");
        }}
      skipLabel={"Omitir"}
      nextLabel={"Siguiente"}
      doneLabel={"Listo"}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/jpg/dev2.jpg")}
              style={styles.image}
            />
          ),
          title: "Vacaciones UAM",
          subtitle: "Puedes registrar un usaurio para las vacaciones uam",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/jpg/cine.jpg")}
              style={styles.image}
            />
          ),
          title: "Peliculas NETFLIX",
          subtitle: "Puedes registrar todo tipo de peliculas",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: "relative",
    width: "50%",
    height: "50%",
    objectFit: "contain",
  },
});

export default OnboardingScreen;
