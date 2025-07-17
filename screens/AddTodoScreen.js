import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddTodoScreen({ navigation }) {
  const [task, setTask] = useState('');

  const handleAddTodo = async () => {
    if (!task.trim()) {
      Alert.alert('Validation', 'Please enter a task.');
      return;
    }

    try {
      await addDoc(collection(db, 'todos'), {
        task,
        createdAt: Timestamp.now(),
        userId: auth.currentUser.uid,
      });
      Alert.alert('Success', 'Task added!');
      setTask('');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding todo:', error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});
