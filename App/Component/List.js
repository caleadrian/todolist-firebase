import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, CheckBox } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function List(props){

    const obj = props.todos ? Object.entries(props.todos) : null;
    const items = [];

    const swipeRightOpen = (progress, key) =>{
        setTimeout(()=>{
            props.onRemove(key)
        }, 500)
    }

    // const swipeLeftOpen = (progress, key) =>{
    //     props.onUpdateTodo({isCompleted: true}, key);
    // }

    const swipeRight = () =>{

        return (
            <View  
              style={{ flex: 1,
                        backgroundColor: 'firebrick', 
                        justifyContent: 'center', 
                        alignItems: 'flex-end',
                        paddingVertical: 10,
                        paddingHorizontal: 13,
                        marginVertical: 5, 
                        borderRadius: 20}}>
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 10,
                  fontWeight: '600'
                }}>
                Delete
              </Text>
            </View >
          );

    }

    // const swipeLeft = (progress, isCompleted) =>{

    //     if(!isCompleted){
    //         return (
    //             <View  
    //             onPress={progress.openRight}
    //               style={{ flex: 1,
    //                         backgroundColor: '#37D7B2', 
    //                         justifyContent: 'center',
    //                         paddingVertical: 10,
    //                         paddingHorizontal: 13,
    //                         marginVertical: 5, 
    //                         borderRadius: 20}}>
    //               <Text
    //                 style={{
    //                   color: 'white',
    //                   paddingHorizontal: 10,
    //                   fontWeight: '600'
    //                 }}>
    //                 Completed
    //               </Text>
    //             </View >
    //           );
    //     }


    // } 


    if(obj != null){
        obj.forEach(([key, value]) => {
                items.push(<Swipeable 
                    onSwipeableRightOpen={(progress) => swipeRightOpen(progress, key)}
                    // onSwipeableLeftOpen={(progress) => swipeLeftOpen(progress, key)}
                    // renderLeftActions={(progress) => swipeLeft(progress, value.isCompleted)} key={key}
                    renderRightActions={swipeRight} key={key}>
                            <View style={styles.items}>
                                <Text  
                                style={[styles.itemLabel, {textDecorationLine: value.isCompleted ? 'line-through': 'none'}]}>{value.text}
                                </Text>
                                <CheckBox value={true}></CheckBox>
                            </View></Swipeable >)
        });
    }else{
        items.push(<Text  key={1} style={styles.noItem} >NO ITEM</Text>)
    }

 return(
  <SafeAreaView  style={styles.container}>
      
      { items }
     
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    },
    items: {
        width: '100%',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        marginVertical: 5,
        borderRadius: 20,
        shadowColor: "#646464",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    noItem : {
        width: '100%',
        padding: 10,
        color: 'red',
        marginVertical: 2,
        borderRadius: 5,
        textAlign: 'center' 
    },
    checkbox:{
        // flexDirection: 'column'
        borderColor: '#e1e1e1'
    },
    itemLabel: {
        // flexDirection: 'column'
    }
})