import React, { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'

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
  Button,
} from "react-native";

import DatePicker from "react-native-date-picker";

export const MovieForm = ({
  modalMoviesForm,
  setModalMoviesForm,
  registeredMovies,
  setRegisteredMovies,
  movie: userObj,
  setMovie
}) => {
  const genres = ["Accion", "Comedia", "Romance", "Drama", "Terror", "Fantasia"];
  const [id, setId] = useState("");
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date());
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  /* Como segundo parametro un array vacio: se ejecuta una sola vez */
  useEffect(() => {
    console.log(Object.keys(userObj));
    if (Object.keys(userObj).length > 0) {
      console.log("Entre al condicional del useEffect");
      setId(userObj.id);
      setTitle(userObj.title);
      setDirector(userObj.director);
      setGenre(userObj.genre);
      setSynopsis(userObj.synopsis);
      setReleaseYear(userObj.releaseYear);
      setActors(userObj.actors);
    }
  }, [userObj]);

  const handleUser = () => {
    if ([title, director, genre, synopsis, actors].includes("")) {
      Alert.alert("Error", "Hay campos sin diligenciar");
      return;
    }
    /* Creamos un nuevo objeto con la información del usuario */
    const newUser = {
      title,
      director,
      genre,
      releaseYear,
      synopsis,
      actors
    };

    if (id) {
      // Editar
      newUser.id = id;
      console.log(registeredMovies)
      const newUsers = registeredMovies.map((user) => {
        return user.id === id ? newUser : user;
      });
      setRegisteredMovies(newUsers);
      setMovie({});
    } else {
      // Nuevo registro
      newUser.id = Date.now();
      setRegisteredMovies([...registeredMovies, newUser]);
    }
    setModalMoviesForm(!modalMoviesForm);
    /* Se limpian los campos para que no quede el último registro */
    setId("");
    setTitle("");
    setDirector("");
    setGenre("");
    setReleaseYear(new Date());
    setSynopsis("");
    setActors("");
  };

  return (
    <Modal animationType="slide" visible={modalMoviesForm}>
      <ImageBackground
        style={styles.backCover}
        source={require("../assets/jpg/cine.jpg")}
      >
        <Image
          style={styles.image}
          source={require("../assets/png/Logos_UAM-08.png")}
        />
        <ScrollView>
          <Text style={styles.title}>
            Registro de peliculas {""}
            <Text style={styles.netflixText}>NETFLIX</Text>
          </Text>

          <Pressable
            style={styles.btnExit}
            onPress={() => setModalMoviesForm(false)}
          >
            <Text style={styles.btnTextExit}>X Cerrar</Text>
          </Pressable>

          <View style={styles.campo}>
            <TextInput
              placeholder="Titulo pelicula"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="Director"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              value={director}
              onChangeText={setDirector}
            ></TextInput>
          </View>
          <View style={styles.campo}>
            <SelectDropdown
              defaultButtonText="Selecciona un genero"
              buttonStyle={{width: 200, height: 50, backgroundColor: '#F8F9F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
              buttonTextStyle={{color: '#000', fontSize: 16}}
              data={genres}
              onSelect={(selectedItem) => {
                setGenre(selectedItem)
              }}
            />
          </View>

          <View style={styles.campo}>
            <Pressable
            style={{width: 200, height: 50, backgroundColor: '#F8F9F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                Fecha estreno
              </Text>
            </Pressable>
          </View>
          <Modal visible={showDatePicker} animationType="slide" >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Selecciona una fecha</Text>
              <DatePicker 
                mode="date"
                date={releaseYear}
                locale="es-ES"
                onDateChange={(date) => setReleaseYear(date)}
              />
              <Pressable style={styles.btnNewUser} onPress={() => setShowDatePicker(false)}>
                <Text style={styles.btnTextNewUser}>Aceptar</Text>
              </Pressable>
            </View>
          </Modal>

          <View style={styles.campo}>
            <TextInput
              placeholder="Sinopsis"
              placeholderTextColor={"#F8F9F9"}
              style={[styles.input, styles.inputComments]}
              numberOfLines={6}
              multiline={true}
              value={synopsis}
              onChangeText={setSynopsis}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="Actores"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              value={actors}
              onChangeText={setActors}
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9F9'

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
  netflixText: {
    color: "#e50914",
    fontWeight: "bold",

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
