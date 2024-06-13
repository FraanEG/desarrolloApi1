import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading'

export default function Category() {

    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getCategories();
    }, [])

    const getCategories=()=> {
        GlobalApi.getCategories().then(resp => 
          {
            console.log("resp", resp.categories);
            setCategories(resp?.categories)
          })
    }

  return (
    <View style={{marginTop:10}}>
      <Heading text={'Categorias'} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({item,index})=>(
            <View style={styles.container}>
              <View style={styles.iconContainer}>
                <Image 
                  source={{uri:item?.icon?.url}}
                  style={styles.categoryIcon}
                />
              </View>
              <Text style={{fontFamily:'outfit-medium', marginTop:5}}>{item?.name}</Text>
            </View>
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