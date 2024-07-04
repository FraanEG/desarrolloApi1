import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'

export default function BusinessList() {
    const [businessLists, setBusinessLists] = useState([])
    useEffect(()=>{
        getComercios();
    }, [])

    const getComercios=()=> {
        GlobalApi.getComercios().then(resp => 
          {
            setBusinessLists(resp)
          })
    }

    return (
        <View style={{marginTop:20}}> 
            <Heading text={'Comercios más recientes'} isViewAll={true} />
            <FlatList
            data={businessLists?.sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso)).slice(0,5) || []}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{marginRight:10}}>
                    <BusinessListItemSmall business={item}/>
                </View>
            )}
            />
        </View>
  )
}