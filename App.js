import React, { useState } from "react";
import { UserForm } from "./src/components/UserForm";
import { User } from "./src/components/User";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";

export default function App() {
  //Form para modal de movies
  const [modalMoviesForm, setModalMoviesForm] = useState(false);
  //array de peliculas
  const [registeredMovies, setRegisteredMovies] = useState([]);
  const [modalUserForm, setModalUserForm] = useState(false);
  /* Creamos un array vacío para listar los usuarios */
  const [registeredUsers, setRegisteredUsers] = useState([]);
  /* Creamos un objeto vacío que luego contendra la info de un user */
  const [user, setUser] = useState({});

  //editar peliculas
  const editMovie = (id) => {
    /* Consultamos en el array de peliculas registradas el id */
    const editMovie = registeredMovies.filter((movie) => movie.id === id);
    setMovie(editMovie[0]);
    console.log('No necesitamos el array, sólo el objeto', editMovie[0])
  }

  const editUser = (id) => {
    /* Consultamos en el array de usuarios registrados el id */
    const editUser = registeredUsers.filter((user) => user.id === id);
    setUser(editUser[0]);
    console.log('No necesitamos el array, sólo el objeto', editUser[0])
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Registrate en la {""}
        <Text style={styles.titleBold}>UAM</Text>
      </Text>

      <Pressable
        onPress={() => setModalUserForm(true)}
        style={styles.btnNewUser}
      >
        <Text style={styles.titleButton}>Nuevo usuario</Text>
      </Pressable>

      {registeredUsers.length === 0 ? (
        <Text style={styles.textNoUser}>No hay usuarios registrados.</Text>
      ) : (
        <FlatList
          style={styles.userList}
          data={registeredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            /* console.log(item); */
            return (
              <User
                item={item}
                setModalUserForm={setModalUserForm}
                editUser={editUser}
              />
            );
          }}
        />
      )}

      <UserForm
        modalUserForm={modalUserForm}
        setModalUserForm={setModalUserForm}
        registeredUsers={registeredUsers}
        setRegisteredUsers={setRegisteredUsers}
        user={user}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0069a3",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFFFFF",
  },
  titleBold: {
    fontWeight: "900",
    color: "#f4d73b",
  },
  btnNewUser: {
    backgroundColor: "#f4d73b",
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  titleButton: {
    textAlign: "center",
    fontSize: 20,
    color: "#000000",
  },
  textNoUser: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 400,
    color: "#FFFFFF",
  },
  userList: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
