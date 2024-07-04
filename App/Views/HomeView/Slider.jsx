import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading'

export default function Slider() {

    const [slider, setSlider] = useState([])
    useEffect(()=>{
      getComercios();
    }, [])

    const getComercios=()=> 
      {
        GlobalApi.getComercios().then(resp => {
          setSlider(resp.flatMap(x => x.ofertas?.map(o => ({ ...x, ...o })) || []))
      })
    }

  return (
    <View>
      <Heading text={'Ofertas para vos!'} />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <View style={{marginRight:20}}>
                <Image 
                source={{uri: item?.imagenes || "https://negozona.com/assets/default_image-61da761b77c76c61f32651429a7c614afb85655f9fbbc45a5a71d698a1c0a283.webp"}}
                style={styles.sliderImage}
                />
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    sliderImage:{
        width:270,
        height:150,
        borderRadius:20,
        objectFit:'contain'
    }
})