import React, { useEffect, useState } from "react";
import { UserForm } from "./src/components/UserForm";
import { User } from "./src/components/User";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View
} from "react-native";
import { Movie } from "./src/components/Movie";
import { MovieForm } from "./src/components/MovieForm";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from "./src/screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const options = {
  headerShown: false
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched16').then(value => {
      if(value == null || value == undefined){
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      console.log(value);
      
    })
  }, []);
  console.log(isFirstLaunch);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={options}/> : null}
        <Stack.Screen name="Home" component={Home} options={options}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

function Home() {
  const navigation = useNavigation();
  AsyncStorage.getItem('alreadyLaunched16').then(value => {
    if(value == null || value == undefined){
      navigation.replace("OnboardingScreen");
    }
  })
  //Form para modal de movies
  const [modalMoviesForm, setModalMoviesForm] = useState(false);
  const [registeredMovies, setRegisteredMovies] = useState([]);
  const [movie, setMovie] = useState({});

  const [modalUserForm, setModalUserForm] = useState(false);
  /* Creamos un array vacío para listar los usuarios */
  const [registeredUsers, setRegisteredUsers] = useState([]);
  /* Creamos un objeto vacío que luego contendra la info de un user */
  const [user, setUser] = useState({});

  //editar peliculas
  const editMovie = (id) => {
    /* Consultamos en el array de peliculas registradas el id */
    const editMovie = registeredMovies.find((movie) => movie.id === id);
    setMovie(editMovie);
  }

  const editUser = (id) => {
    /* Consultamos en el array de usuarios registrados el id */
    const editUser = registeredUsers.filter((user) => user.id === id);
    setUser(editUser[0]);
  };

  deleteUser = (id) => {
    /* Consultamos en el array de usuarios registrados el id */
    const deleteUser = registeredUsers.filter((user) => user.id !== id);
    setRegisteredUsers(deleteUser);
  }

  deleteMovie = (id) => {
    /* Consultamos en el array de usuarios registrados el id */
    const deleteMovie = registeredMovies.filter((movie) => movie.id !== id);
    setRegisteredMovies(deleteMovie);
  }

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
                deleteUser={deleteUser}
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
        setUser={setUser}
      />
      <View
        style={{
          borderBottomColor: 'black',
          marginTop: 50,
          marginBottom: 10,
          borderBottomWidth: 1,
        }}
      />
      <Text style={styles.title}>
        Registra una pelicula en {""}
        <Text style={styles.titleLikeNetflix}>NETFLIX</Text>
      </Text>

      <Pressable
        onPress={() => setModalMoviesForm(true)}
        style={styles.btnNewUser}
      >
        <Text style={styles.titleButton}>Nueva pelicula</Text>
      </Pressable>

      {registeredMovies.length === 0 ? (
        <Text style={styles.textNoUser}>No hay peliculas registradas.</Text>
      ) : (
        <FlatList
          style={styles.userList}
          data={registeredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            /* console.log(item); */
            return (
              <Movie
                item={item}
                setModalMoviesForm={setModalMoviesForm}
                editMovie={editMovie}
                deleteMovie={deleteMovie}
              />
            );
          }}
        />
      )}

      <MovieForm
        modalMoviesForm={modalMoviesForm}
        setModalMoviesForm={setModalMoviesForm}
        registeredMovies={registeredMovies}
        setRegisteredMovies={setRegisteredMovies}
        movie={movie}
        setMovie={setMovie}
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
  titleLikeNetflix: {
    //like netflix logo
    color: "#e50914",
    fontWeight: "bold",

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
