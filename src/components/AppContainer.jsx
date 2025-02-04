import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBottomNavigator } from './Navigation/TabNavigator';
import { FirstScreen } from '../pages/FirstScreen';
import { useProfile } from '../hooks/useProfile';
import { PRIMARY_CONTRAST, PRIMARY_MAIN, TEXT_PRIMARY } from '../consts/theme';
import { LoginPage } from '../pages/auth/LoginPage';
import ToastManager from 'toastify-react-native';
import { AppointmentPage } from '../pages/Appointment/AppointmentPage';

const Stack = createNativeStackNavigator()

export const AppContainer = () => {
	const {data: profile, isLoading} = useProfile()

  const MyTheme = {
		...DefaultTheme,
    colors: {
			...DefaultTheme.colors,
      background: PRIMARY_CONTRAST,
      text: TEXT_PRIMARY,
    },
  };
	
	if(isLoading){
		return <ActivityIndicator color={PRIMARY_MAIN} style={{flex: 1}}/>
	}

  return (
		<SafeAreaProvider>
			<StatusBar barStyle="dark-content"/>
			<ToastManager/>
			<NavigationContainer theme={MyTheme}>
				{profile ?
					<Stack.Navigator
					screenOptions={{  
						headerShown: true, 
						headerBackTitleVisible: false,
						headerBackImage: () => (
							<Icon name="chevron-back-outline" size={28} style={{color: TEXT_PRIMARY}}/>
						),
						headerTintColor: '#000',
						headerLeftContainerStyle: {paddingLeft: 8},
						headerTitleContainerStyle:{
							width:'60%',
							alignItems:'center'
						},
						headerTitleAlign: 'center',
						tabBarHideOnKeyboard: true,
						}}>
							<Stack.Screen
								name="MainNavigator"
								options={{ 
									headerShown: false,
								}}
								component={TabBottomNavigator}
							/>
							<Stack.Screen
								name='AppointmentPage'
								options={{presentation: 'modal', title: 'Занятие'}}
								component={AppointmentPage}	
							/>
					</Stack.Navigator>
					:
					<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'FirstScreen'}>
						<Stack.Screen name="FirstScreen" component={FirstScreen}/>
						<Stack.Screen name="LoginPage" component={LoginPage}/>
					</Stack.Navigator>
				}
			</NavigationContainer>
		</SafeAreaProvider>
  );
}