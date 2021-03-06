import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { updateTask } from "../../api";
import Color from "../../constants/color";
import TaskContext from "../../store/WorkerTasksContext";

const TitleModal = ({ modalVisible, setModalVisible, task, navigation }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState(false);

  const handleTitleChange = async () => {
    setError(false);
    if (!title.length) return;

    const success = await updateTask(task.id, { title });

    if (success) {
      task.title = title;
      setTasks(tasks);
      setModalVisible(!modalVisible);
      navigation.setOptions({ title: task.title });
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter new title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {error && (
              <Text style={styles.errorMessage}>
                Something went wrong. Please try again
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: title.length ? Color.blue : Color.inactive,
                  },
                ]}
                onPress={handleTitleChange}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setError(false);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Color.primaryDark,
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.secondaryDark,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: "#dedede",
    height: 40,
    borderRadius: 6,
    paddingLeft: 10,
    width: 250,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: 100,
    marginHorizontal: 10,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: Color.blue,
    backgroundColor: Color.secondaryDark,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  errorMessage: {
    color: Color.orange,
    marginVertical: 5,
    fontWeight: "bold",
  },
});

export default TitleModal;
