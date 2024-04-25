//screens/AddTodoScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';

const AddToDoScreen = ({ route }) => {
  const [text, setText] = useState('');
  const { todo } = route.params || {};
  const navigation = useNavigation();

  // Initialize the 10tap editor
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: todo ? todo.text : '', // Provide initial content from todo
  });

 
 
  useEffect(() => {
    if (todo) {
      // Set initial content of the editor to the text of the todo
      //console.log("Todo Text:", todo.text);
      editor.setContent(todo.text);
    }
  }, [todo]);

  const addTodo = () => {
    editor.getText().then((text) => {
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
    });
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <RichText editor={editor} />
      <Toolbar editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddToDoScreen;
