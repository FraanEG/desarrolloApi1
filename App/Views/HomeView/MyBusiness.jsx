import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function MyBusiness() {
    const navigation = useNavigation();
    const [businessLists, setBusinessLists] = useState([])
    useEffect(()=>{
        getComercios();
    }, [])

    const getComercios=()=> {
        GlobalApi.getMeVecino().then(resp => 
          {
            setBusinessLists(resp.comercios)
          })
    }

    return (
        <View style={{marginTop:20}}> 
            <Heading text={'Mis Comercios'} isViewAll={true} />
            <FlatList
            data={businessLists?.sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso)).slice(0,5) || []}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{marginRight:10}}>
                    <TouchableOpacity style={styles.container} onPress={()=>(navigation.push('business-detail',
                    { business:item }))}>
                        <BusinessListItemSmall business={item}/>
                    </TouchableOpacity>
                    
                </View>
            )}
            />
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    subContainer:{
        display:'flex',
        gap:8
    },
    image:{
        width:100,
        height:100,
        borderRadius:15
    }
})