import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default function TextField(props){

    const [text, setText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const onPressHandler = () =>{
        props.onAddTodo(text);
        setText('');
    }

    return(
    <View style={styles.container}>
        <TextInput 
            placeholder={"Enter your todo"}
            style={styles.input}
            onChangeText={(value)=>{
                setText(value);
                if(value.length){
                    setIsDisabled(false);
                }else{
                    setIsDisabled(true);
                }
            }}
            value={text}
        />
        <TouchableOpacity
            disabled={isDisabled}
            style={[styles.addBtn, {backgroundColor: isDisabled  ? '#e1e1e1': '#5CA8E0'}]}
            onPress={onPressHandler}>
            <Text style={styles.addBtnTxt}>Add</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1'
    },
    addBtn: {
        backgroundColor: '#5CA8E0',
        borderRadius: 20,
        paddingVertical: 8,
        maxWidth: '100%'
    },
    addBtnTxt: {
        color: '#FFF',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        padding: 8,
        borderRadius: 20,
        marginBottom: 10,
    }

})