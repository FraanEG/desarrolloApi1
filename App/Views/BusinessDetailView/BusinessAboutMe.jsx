import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';

export default function BusinessAboutMe({business}) {
    const [isReadMore, setIsReadMore]= useState(false);

    return business&&(
        <View>
            <Heading text={'Acerca de'}/>
            <Text style={{
                fontFamily:'outfit-regular',
                lineHeight:28,
                color:Colors.GRAY, 
                fontSize:16}} numberOfLines={isReadMore?10:4}>{business.about}
            </Text>
            <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
                <Text style={{color:Colors.PRIMARY, fontSize:16, fontFamily:'outfit-regular'}}>{isReadMore?'Leer Menos':'Leer Más'}</Text>
            </TouchableOpacity> 
        </View>
  )
}