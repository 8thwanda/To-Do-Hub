//components/TodoItem.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodoItem = ({ text, onDelete }) => {
  // Define your desired color
  const color = '#ff6347'; // This is an example color, you can change it to your desired color

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff6347', // Initial color, can be changed if needed
  },
  text: {
    flex: 1,
    color: '#ffff',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default TodoItem;
