import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function Heading({text, isViewAll = false, navigateTo = null}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}> {text} </Text>
      {isViewAll&&<TouchableOpacity OnPress={()=> navigation.navigate(navigateTo)}><Text>Ver todo</Text></TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading:{
        fontSize:20,
        fontFamily:'outfit-medium',
        marginBottom:10    
    }
})