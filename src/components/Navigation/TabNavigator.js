import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { PRIMARY_MAIN, TEXT_PRIMARY } from '../../consts/theme';
import { IconBook, IconHome, IconSearch, IconUser } from '@tabler/icons-react-native';

const Tab = createBottomTabNavigator()

export const TabBottomNavigator = () => {
  const [onTop, setOnTop] = useState(null)

  return(
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let title;
          if (route.name === "Home") {
            icon = <IconHome style={{color: PRIMARY_MAIN, opacity: focused ? 1.0 : 0.8}}/>;
            title = "Главная"
          } else if (route.name === "Search") {
            icon = <IconSearch style={{color: PRIMARY_MAIN, opacity: focused ? 1.0 : 0.8}}/>;
            title = "Поиск"
          } else if (route.name === "Favorites") {
            icon = <IconBook style={{color: PRIMARY_MAIN, opacity: focused ? 1.0 : 0.8}}/>;
            title = "Избранное"
          } else if (route.name === "Profile") {
            icon = <IconUser style={{color: PRIMARY_MAIN, opacity: focused ? 1.0 : 0.8}}/>;
            title = "Профиль"
          }
          return (
            <Pressable style={{justifyContent: 'center', alignItems: 'center'}} 
            onPress={() => {
              let history = navigation.getState().history
              if(title === "Главная" && history.length === 1){
                if(onTop === 1) setOnTop(2)
                else setOnTop(1)
              }else if(title === "Поиск"){
                navigation.navigate(route.name, {isFocused: false})
              }
              navigation.navigate(route.name)
            }}
            >
							{icon}
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
          name="Search"
          component={View}
          screenOptions={{tabBarHideOnKeyboard: true}}
        />
        <Tab.Screen
          name="Favorites"
          component={View}
        />
        <Tab.Screen
          name="Profile"
          component={View}
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