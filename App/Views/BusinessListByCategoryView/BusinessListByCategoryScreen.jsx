import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../Utils/Colors';

export default function BusinessListByCategoryScreen() {
    const params = useRoute().params;
    const navigation = useNavigation();
    const [businessLists, setBusinessLists]=useState();

    const getBusinessByCategory= ()=> {
        GlobalApi.getBusinessListsByCategories(params.category)
        .then(resp=>{setBusinessLists(resp.businessLists)})
    }

    useEffect(()=>{
        console.log("Category", params.category);
        params&&getBusinessByCategory()
    }, [params])
    return (
        <View style={{padding:20, paddingTop:30}}>
            <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}
                onPress={()=>navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="black" />
                <Text style={{fontSize:25, fontFamily:'outfit-medium'}}>{params?.category}</Text>
            </TouchableOpacity>
            {businessLists?.length>0 ? <FlatList
                style={{marginTop:15}}
                data={businessLists}
                renderItem={({item, index})=>(<BusinessListItem business={item} />)}
            />:
            <Text style={{fontFamily:'outfit-medium', fontSize:20, textAlign:'center', marginTop:'20%', color:Colors.GRAY}}>No hay servicios actualmente</Text>}
        </View>
    )
}