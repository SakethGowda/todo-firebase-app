import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const todosSnapshot = await getDocs(collection(db, 'todos'));
      const todoList = todosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoList);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.todoItem}>• {item.text}</Text>
        )}
      />

      <View style={styles.buttonGroup}>
        <Button title="Add Todo" onPress={() => navigation.navigate('AddTodo')} />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  todoItem: { fontSize: 18, marginBottom: 10 },
  buttonGroup: { marginTop: 20 },
});
