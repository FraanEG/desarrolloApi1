import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import React from 'react'
import Colors from '../../Utils/Colors';
import { useOAuth } from "@clerk/clerk-expo";
import { Button } from "react-native";
import { useWarmUpBrowser } from "../../Hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{alignItems:'center'}}>
      <Image source={require('./../../../assets/images/login.png')}
            style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style=
          {{fontSize:22,
            color:Colors.WHITE, 
            textAlign:'center'}}> Encontremos  
            <Text style=
            {{fontWeight:'bold'}}> Servicios Profesionales de Limpieza y Arreglos!</Text>
        </Text>
        <Text style=
          {{fontSize:17,
            color:Colors.WHITE,
            textAlign:'center',
            marginTop:20}}> Mejor aplicación para encontrar servicios profesionales en línea! 
        </Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{textAlign:'center', fontSize:17, color:Colors.PRIMARY}}>Empecemos!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage: {
      width:230,
      height:450,
      marginTop:70,
      borderWidth:4,
      borderColor:Colors.BLACK,
      borderRadius:15
    },
    subContainer: {
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'70%',
        padding: 20
    },
    button: {
      padding:15,
      backgroundColor: Colors.WHITE,
      borderRadius:99,
      marginTop:40,
    }
  });