import { View, Text } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'
import BusinessList from './BusinessList'
import MyBusiness from './MyBusiness'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeView({ route }) {
  const token = route.params.token || {};
  const data = route.params.data || {}
  return (
    <ScrollView>
      <View>
      <Header route= {{token , data}} />

      <View style= {{padding:20}}>
        <Slider/>
        <Category/>
        <BusinessList/>
        <MyBusiness/>
      </View>

      </View>
    </ScrollView>
  )
}