import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { PRIMARY_MAIN, TEXT_PRIMARY } from '../../consts/theme';
import { IconBook, IconHistory, IconHome, IconMessage, IconSearch, IconUser } from '@tabler/icons-react-native';
import { useProfile } from '../../hooks/useProfile';
import { Profile } from '../../pages/Profile/Profile';

const Tab = createBottomTabNavigator()

export const TabBottomNavigator = () => {
  const [onTop, setOnTop] = useState(null)
	const {data: profile} = useProfile()

  return(
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Pressable style={{justifyContent: 'center', alignItems: 'center'}} 
            onPress={() => navigation.navigate(route.name)}>
							{{'Home': <>
								<IconHome style={{opacity: focused ? 1 : .8}} color={PRIMARY_MAIN}/>
								<Text>Главная</Text>
							</>,
							'Messenger': <>
								<IconMessage style={{opacity: focused ? 1 : .8}} color={PRIMARY_MAIN}/>
								<Text>Сообщения</Text>
							</>,
							'History': <>
								<IconHistory style={{opacity: focused ? 1 : .8}} color={PRIMARY_MAIN}/>
								<Text>История</Text>
							</>,
							'Profile': <>
								<IconUser style={{opacity: focused ? 1 : .8}} color={PRIMARY_MAIN}/>
								<Text>Профиль</Text>
							</>}[route.name]}
            </Pressable>
          )
        },
        tabBarActiveTintColor: TEXT_PRIMARY,
        tabBarInactiveTintColor: "rgba(255, 255,255, .5)",
        backgroundColor: 'transparent',
        tabBarStyle: styles.tab,
        tabBarLabel: () => {return null},
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView tint="light" intensity={Platform.OS === 'ios' ? 100 : 150} style={StyleSheet.absoluteFill} />
        ),
      })}
    >
        <Tab.Screen 
					name="Home" 
					component={View}/>
        <Tab.Screen
          name="Messenger"
          component={View}
          screenOptions={{tabBarHideOnKeyboard: true}}
        />
        <Tab.Screen
          name="History"
          component={View}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 8,
    minHeight: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#666666',
    backgroundColor: 'transparent'
  }
})