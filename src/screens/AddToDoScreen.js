//screens/AddToDoScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const AddToDoScreen = ({ route }) => {
  const [text, setText] = useState('');
  const { todo } = route.params || {}; // Extract todo from params
  const navigation = useNavigation();

  // If todo exists (i.e., editing an existing item), set the text state to the existing text
  useEffect(() => {
    if (todo) {
      setText(todo.text);
    }
  }, [todo]);

  // Modify addTodo function to handle editing of existing to-do item
  const addTodo = () => {
    if (text.trim() !== '') {
      if (todo) {
        const updatedTodo = { ...todo, text: text }; // Update text of existing todo
        navigation.navigate('TodoScreen', { newTodo: updatedTodo });
      } else {
        const newTodo = { id: Date.now().toString(), text: text };
        navigation.navigate('TodoScreen', { newTodo: newTodo }); 
      }
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddToDoScreen;
