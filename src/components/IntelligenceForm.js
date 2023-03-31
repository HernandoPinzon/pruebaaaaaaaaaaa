import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";

export const IntelligenceForm = ({
  modalIntelligenceForm,
  setModalIntelligenceForm,
}) => {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleUser = () => {
    console.log("Función");
  };
  return (
    <Modal>
      <ScrollView>
        <Text style={styles.title}>
          Inscripción {""}
          <Text style={styles.titleBold}>Vacaciones UAM</Text>
        </Text>

        <Pressable
          style={styles.btnExit}
          onPress={() => setModalIntelligenceForm(false)}
        >
          <Text style={styles.btnTextExit}>X Cerrar</Text>
        </Pressable>

        <View style={styles.campo}>
          <TextInput
            placeholder="Nombre completo"
            placeholderTextColor={"#F8F9F9"}
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          ></TextInput>
        </View>

        <View style={styles.campo}>
          <DatePicker date={date} locale="es"></DatePicker>
        </View>

        <Pressable style={styles.btnNewUser}>
          <Text style={styles.btnTextNewUser} onPress={handleUser}>
            Agregar
          </Text>
        </Pressable>
      </ScrollView>
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
    color: "#FFFFFF",
    fontSize: 17,
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
  inputComments: {
    height: 100,
  },
  inputDate: {
    borderRadius: 10,
    height: 10,
  },
  btnExit: {
    marginVertical: 30,
    backgroundColor: "#000000c0",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
  },
  btnTextExit: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  btnNewUser: {
    marginVertical: 50,
    backgroundColor: "#0069a3",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnTextNewUser: {
    textAlign: "center",
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 16,
  },
  
});
