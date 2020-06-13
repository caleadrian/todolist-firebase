import React from 'react';
import { StyleSheet, View } from 'react-native';

import TodoList from './App/Component/TodoList'

export default function App() {

  return (
    <View style={styles.container}>
        <TodoList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
