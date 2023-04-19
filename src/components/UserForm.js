import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";

export const UserForm = ({
  modalUserForm,
  setModalUserForm,
  registeredUsers,
  setRegisteredUsers,
  user: userObj,
  setUser
}) => {
  const [fecha, setFecha] = useState(new Date());
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [comments, setComments] = useState("");

  /* Como segundo parametro un array vacio: se ejecuta una sola vez */
  useEffect(() => {
    if (Object.keys(userObj).length > 0) {
      /* ["userName", "userEmail", "cellphone", "fecha", "comments", "id"] */
      setId(userObj.id);
      setUserName(userObj.userName);
      setUserEmail(userObj.userEmail);
      setCellphone(userObj.cellphone);
      setComments(userObj.comments);
      setFecha(userObj.fecha);
    }
  }, [userObj]);

  const handleUser = () => {
    if ([userName, userEmail, cellphone, comments].includes("")) {
      Alert.alert("Error", "Hay campos sin diligenciar");
      return;
    }
    /* Creamos un nuevo objeto con la información del usuario */
    const newUser = {
      /* Creamos un id ficticio a partir de la fecha */
      userName,
      userEmail,
      cellphone,
      fecha,
      comments,
    };

    if (id) {
      // Editar
      newUser.id = id;
      console.log(registeredUsers)
      const newUsers = registeredUsers.map((user) => {
        console.log("user", user);
        console.log("id", id)
        return user.id === id ? newUser : user;
      });
      setRegisteredUsers(newUsers);
      console.log("Arreglo",newUsers);
      setUser({});
    } else {
      // Nuevo registro
      newUser.id = Date.now();
      setRegisteredUsers([...registeredUsers, newUser]);
    }
    setModalUserForm(!modalUserForm);
    /* Se limpian los campos para que no quede el último registro */
    setId("");
    setUserName("");
    setUserEmail("");
    setCellphone("");
    setFecha(new Date());
    setComments("");
  };

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

          <Pressable
            style={styles.btnExit}
            onPress={() => setModalUserForm(false)}
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
              onPress={() => {
                setModalUserForm(false);
                setUser({});
                setId("");
                setUserName("");
                setUserEmail("");
                setCellphone("");
                setFecha(new Date());
                setComments("");
              }}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="@autonoma.edu.co"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="email-address"
              value={userEmail}
              onChangeText={setUserEmail}
            ></TextInput>
          </View>
          <View style={styles.campo}>
            <TextInput
              placeholder="Celular"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="phone-pad"
              value={cellphone}
              onChangeText={setCellphone}
              maxLength={10}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <DatePicker
              date={fecha}
              locale="es-ES"
              onDateChange={(date) => setFecha(date)}
            ></DatePicker>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="Dejanos tus comentarios"
              placeholderTextColor={"#F8F9F9"}
              style={[styles.input, styles.inputComments]}
              numberOfLines={6}
              multiline={true}
              value={comments}
              onChangeText={setComments}
            ></TextInput>
          </View>

          <Pressable style={styles.btnNewUser}>
            <Text style={styles.btnTextNewUser} onPress={handleUser}>
              Agregar
            </Text>
          </Pressable>
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
