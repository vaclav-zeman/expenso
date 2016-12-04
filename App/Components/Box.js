import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Box({ title, children, last }) {
  return (
    <View style={[styles.box, last && styles.last]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    marginTop: 16,
    elevation: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
  },
  last: {
    marginBottom: 90,
  },
});
