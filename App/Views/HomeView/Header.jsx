import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const {user,isLoading}= useUser();
  return user&&(
    <View style={styles.container}>
        <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
                <Image
                    source={{uri:user?.imageUrl}}
                    style={styles.userImage}
                />
                <View>
                    <Text style={{color:Colors.WHITE, fontFamily:'outfit-regular'}}>Bienvenido,</Text>
                    <Text style={{color:Colors.WHITE, fontWeight:'bold', fontSize:20, fontFamily:'outfit-medium'}}>{user?.fullName}</Text>
                </View>
            </View>
            <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />
        </View>
        <View style={styles.searchBarContainer}>
            <TextInput placeholder='Buscar' style={styles.textInput}/>
            <FontAwesome style={styles.searchButton} name="search" size={24} color={Colors.PRIMARY} />
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