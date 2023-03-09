import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import DatePicker from "react-native-date-picker";

export const UserForm = ({ modalUserForm }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Modal animationType="slide" visible={modalUserForm}>
      <ImageBackground
        style={styles.backCover}
        source={require("../assets/jpg/dev2.jpg")}
      >
        <Image
          style={styles.image}
          source={require("../assets/png/Logos_UAM-08.png")}
        />
        <ScrollView>
          <Text style={styles.title}>
            Inscripción {""}
            <Text style={styles.titleBold}>Vacaciones UAM</Text>
          </Text>
          <View style={styles.campo}>
            <Text style={styles.text}>Nuevo usuario</Text>
            <TextInput
              placeholder="Nombre completo"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <Text style={styles.text}>Correo</Text>
            <TextInput
              placeholder="@autonoma.edu.co"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="email-address"
            ></TextInput>
          </View>
          <View style={styles.campo}>
            <Text style={styles.text}>Celular</Text>
            <TextInput
              placeholder="Celular"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="phone-pad"
            ></TextInput>
          </View>
          <View style={styles.campo}>
            <Pressable onPress={() => setOpen(true)}>
              <Text style={styles.text}>Fecha inscripción</Text>
            </Pressable>
            <DatePicker
              modal
              open={open}
              date={date}
              mode={"date"}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    margin: 15,
    width: 75,
    height: 75,
    marginBottom: 15,
  },

  backCover: {
    position: "absolute",
    marginTop: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: "rgba(52, 52, 52, alpha)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFFFFF",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  titleBold: {
    textAlign: "center",
    fontSize: 22,
    color: "#0069a3",
    marginHorizontal: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#000000c0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 8,
    marginTop: 12,
  },
  campo: {
    marginHorizontal: 30,
  },
});
