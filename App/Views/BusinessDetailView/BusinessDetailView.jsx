import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import BusinessPhotosView from './BusinessPhotosView';
import BusinessAboutMe from './BusinessAboutMe';

export default function BusinessDetailView() {
  const params= useRoute().params;
  const [business, setBusiness] = useState(params.business);
  const navigation = useNavigation();

  useEffect(()=>{
  },[])

  return business&&(
    <ScrollView>
      <TouchableOpacity style={styles.backButtonContainer} onPress={()=>navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} color="black" />
      </TouchableOpacity>
      <Image source={{uri: business?.images[0]?.url}}
      style={{width:'100%',height:300}}/>  
      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business?.name}</Text>
        <View style={styles.subContainer}> 
          <Text style={{fontFamily:'outfit-medium', color:Colors.PRIMARY, fontSize:22}}>{business?.contactPerson}</Text>
          <Text style={{color:Colors.PRIMARY, backgroundColor:Colors.PRIMARY_LIGHT, padding:3, borderRadius:5, fontSize:14}}>{business?.category.name}</Text>
        </View>
        <Text style={{fontSize:18,fontFamily:'outfit-regular',color:Colors.GRAY}}><Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} style={{marginRight:20}}/> {business?.address} </Text>
        <View style={{borderWidth:0.5, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>
        
        <BusinessAboutMe business={business}/>
        <View style={{borderWidth:0.5, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>
        <BusinessPhotosView business={business}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  backButtonContainer:{
    display:'flex', 
    flexDirection:'row', 
    gap:10, 
    alignItems:'center',
    marginTop:20,
    padding:10
  },
  infoContainer:{
    padding:20,
    display:'flex',
    gap:7
  },
  subContainer:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  }
})