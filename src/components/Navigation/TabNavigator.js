import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { PRIMARY_MAIN, SECONDARY_PRIMARY_20, TEXT_PRIMARY, TEXT_SECONDARY } from '../../consts/theme';
import { IconBook, IconHistory, IconHome, IconMessage, IconSearch, IconUser } from '@tabler/icons-react-native';
import { useProfile } from '../../hooks/useProfile';
import { Profile } from '../../pages/Profile/Profile';

const Tab = createBottomTabNavigator()

const Item = ({focused, Icon, name}) => {
	return (
		<View style={{...styles.item, backgroundColor: focused ? 'rgba(167, 174, 184, 0.20)' : ''}}>
			<Icon color={focused ? TEXT_PRIMARY : TEXT_SECONDARY}/>
			<Text style={styles.itemText}>{name}</Text>
		</View>
	)
}

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
							{{'Home': <Item name={'Главная'} Icon={(props) => <IconHome {...props}/>} focused={focused}/>,
							'Messenger': <Item name={'Сообщения'} Icon={(props) => <IconMessage {...props}/>} focused={focused}/>,
							'History':   <Item name={'История'} Icon={(props) => <IconHistory {...props}/>} focused={focused}/>,
							'Profile':  <Item name={'Профиль'} Icon={(props) => <IconUser {...props}/>} focused={focused}/>}
							[route.name]}
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
    minHeight: 64,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: SECONDARY_PRIMARY_20,
    backgroundColor: 'transparent'
  },
	item: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		alignItems: 'center',
		gap: 4,
		borderRadius: 8,
	},
	itemText: {
		fontSize: 10,
		fontWeight: 500,
	}
})