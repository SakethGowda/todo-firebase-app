import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../firebaseConfig';

export default function ProfileScreen() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      
      {user?.photoURL && (
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
      )}

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user?.displayName || 'N/A'}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email}</Text>

      <Text style={styles.label}>UID:</Text>
      <Text style={styles.value}>{user?.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10, fontWeight: '600' },
  value: { fontSize: 16, marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
});
