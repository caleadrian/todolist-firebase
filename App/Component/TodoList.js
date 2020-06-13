import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import uuid from 'react-native-uuid';

import TextField from './TextField';
import List from './List';

export default function TodoList(props){

    const [todos, setTodos] = useState({});
 

    const firebaseConfig = {
        apiKey: "AIzaSyC9HyXPJd59XXPD6BfbhESMONRV85YyT8Y",
        authDomain: "todolist-firebase-81780.firebaseapp.com",
        databaseURL: "https://todolist-firebase-81780.firebaseio.com",
        projectId: "todolist-firebase-81780",
        storageBucket: "todolist-firebase-81780.appspot.com",
        messagingSenderId: "496181121735",
        appId: "1:496181121735:web:cb0d9936acfed227ca24e2",
        measurementId: "G-85N95MDVNT"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
  
    const addTodo = (value) => {
        if(value){
            firebase.database().ref('todo/' + uuid.v1()).set({
                text: value,
                isCompleted: false
            }).then(() => {
                console.log('Successfully inserted');
            });
        }else{
            console.log('Please enter a text');
        }

    }
  
    const removeTodo = (id) => {
      firebase.database().ref('todo/' + id).remove()
        .then(()=>{
          console.log('Successfully removed');
        })
        .catch((err) =>{
          console.log("Error : " + err);
        })
    }
  
    const updateTodo = (value, id) => {
      firebase.database().ref('todo/'+ id).update(value).then(()=>{
        console.log('data is updated');
      })
    }


    const loadTodo = () =>{
        firebase.database().ref('todo').once('value', (data)=>{
            handlefirebaseChange(data.toJSON())
        })
    }


    // To solve infinite loop.
    // place the api call inside the useEffect hook
    // wrap the setState action inside the event handler
    useEffect(() => {
        firebase.database().ref('todo').on('value', (data)=>{
            handlefirebaseChange(data.toJSON())
        })
    }, [])


    const handlefirebaseChange = (value) => {
        setTodos(value);
    }

 return(
  <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>TODO LIST</Text>
      </View>
      <TextField onAddTodo={addTodo}/> 
      <List todos={todos} onLoadTodo={loadTodo} onUpdateTodo={updateTodo} onRemove={removeTodo} />

  </View>
 );
}

const styles = StyleSheet.create({
    container : {
        margin: 10,
        // backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 5
    },
    headerText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
})