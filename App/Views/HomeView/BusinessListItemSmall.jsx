import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function BusinessListItemSmall({business}) {
  return (
    <View style={styles.container}>
      <Image source={{uri:"https://negozona.com/assets/default_image-61da761b77c76c61f32651429a7c614afb85655f9fbbc45a5a71d698a1c0a283.webp"}}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontSize:17, fontFamily:'outfit-medium'}}>{business?.nombre}</Text>
        <Text style={{fontSize:13, fontFamily:'outfit-regular', color:Colors.GRAY}}>{business?.vecino?.nombre}</Text>
        <Text style={{
            fontSize:10, 
            fontFamily:'outfit-regular', 
            padding:3, 
            color:Colors.PRIMARY,
            backgroundColor:Colors.PRIMARY_LIGHT,
            borderRadius:3,
            alignSelf:'flex-start',
            paddingHorizontal:7
        }}>{business?.rubro?.descripcion}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    },
    infoContainer:{
        padding:7,
        display:'flex',
        gap:3
    },
    image:{
        width:160,
        height:100,
        borderRadius:10
    }
})