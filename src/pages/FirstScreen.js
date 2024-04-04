import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRIMARY_CONTRAST, PRIMARY_MAIN } from '../consts/theme';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Shared/Button/Button';

export const FirstScreen = () => {
  const inset = useSafeAreaInsets()
	const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}} source={{uri: 'https://plus.unsplash.com/premium_photo-1664194584355-25196f114804?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}/>
		  <LinearGradient colors={['rgba(17, 17, 17, 0)', 'rgba(17, 17, 17, 1)']} style={styles.gradient}/>
      <View style={styles.dark}></View>
      <View style={{...styles.wrapper, paddingTop: inset.top + 40}}> 
        <View>
					<Image style={{height: 100}}  source={{uri: '/assets/images/logo.svg'}}/>
				</View>
				<View style={styles.textBlock}>
					<Text style={styles.h1}>СТАНЬ ЧАСТЬЮ МИРА <Text style={{color: PRIMARY_MAIN}}>МУЗЫКИ</Text></Text>
					<Text style={styles.text}>Найди подходящего преподавателя по музыке и занимайся онлайн</Text>
					<Button to='LoginPage' label="Войти" style={{marginTop: 48}}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    height: 200,
    position: 'absolute',
    left: 0, 
    bottom: 0, 
    right: 0,
  },
  dark: {
    position: 'absolute',
    top: 0,
    left: 0, 
    bottom: 0, 
    right: 0,
  },
   h1: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Futur',
    textAlign: 'center',
    textTransform: 'uppercase'
   },
   text: {
    fontSize: 16,
    color: PRIMARY_CONTRAST,
    marginTop: 8,
    fontFamily: 'Inter',
    textAlign: 'center'
   },
   wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 32
   },
   textBlock: {
    alignItems: 'center',
    marginBottom: 32,
   }
})
