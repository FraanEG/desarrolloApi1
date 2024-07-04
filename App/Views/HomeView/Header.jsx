import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header({ route }) {
    const token = route?.token || {};
    const data = route?.data || {};
  return (
    <View style={styles.container}>
        <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
                <Image
                    source= {{ uri: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' }}
                    style={styles.userImage}
                />
                <View>
                    <Text style={{color:Colors.WHITE, fontFamily:'outfit-regular'}}>Bienvenid@,</Text>
                    <Text style={{color:Colors.WHITE, fontWeight:'bold', fontSize:20, fontFamily:'outfit-medium'}}>{data?.nombre} {data?.apellido}</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    userImage:{
        width:60,
        height:60,
        borderRadius:99,
    },
    searchBarContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginBottom:10
    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor: Colors.WHITE,
        borderRadius:8,
        width:'85%',
        fontSize: 17,
        fontFamily: 'outfit-regular'
    },
    searchButton:{
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    }
})