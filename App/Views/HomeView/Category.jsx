import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading'
import { useNavigation } from '@react-navigation/native'

export default function Category() {

    const [categories, setCategories] = useState([]);
    const navigation= useNavigation();

    useEffect(()=>{
      getRubros();
    }, [])

    const getRubros=()=> {
        GlobalApi.getRubros().then(resp => 
          {
            setCategories(resp)
          })
    }

  return (
    <View style={{marginTop:10}}>
      <Heading text={'Categorias'} isViewAll={true} navigateTo={'categories'}/>
      <FlatList
        data={categories.slice(0,4)}
        numColumns={4}
        renderItem={({item,index})=>(
            <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-list', {category:item.descripcion, data:item })}>
              <View style={styles.iconContainer}>
                <Image 
                  source={{uri:'https://cdn-icons-png.flaticon.com/512/3843/3843517.png'}}
                  style={styles.categoryIcon}
                />
              </View>
              <Text style={{fontFamily:'outfit-medium', marginTop:5}}>{item?.descripcion}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  iconContainer:{
    backgroundColor:Colors.LIGHT_GRAY,
    padding:15,
    borderRadius:99,
  },
  categoryIcon:{
      width:45,
      height:45,
  }
})