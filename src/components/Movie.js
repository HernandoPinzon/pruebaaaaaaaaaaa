import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
export const Movie = ({ item, setModalMoviesForm, editMovie, deleteMovie }) => {
  const { title, releaseYear, id } = item;
  const dateFormate = (date) => {
    const newDate = new Date(date);
    const optionsFormate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("es-ES", optionsFormate);
  };
  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.label}>Movie:</Text>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.label}>Estreno:</Text>
        <Text style={styles.date_format}>{dateFormate(releaseYear)}</Text>
        <View style={styles.buttons}>
          <Pressable
            style={[styles.btn, styles.btnEdit]}
            onPress={() => {
              setModalMoviesForm(true)
              editMovie(id)
            }}
          >
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnDeleteOne]}>
            <Text 
              style={styles.btnText}
              onPress={() => {
                //TODO: Delete user
                deleteMovie(id)
              }}
            >
            Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10, 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  label: {
    color: "#000000",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  date_format: {
    color: "#000000",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: "#0090D0",
  },
  btnDeleteOne: {
    backgroundColor: "#E63D17",
  },
  btnText: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
