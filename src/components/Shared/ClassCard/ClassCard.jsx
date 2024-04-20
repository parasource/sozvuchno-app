import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SECONDARY_PRIMARY, SECONDARY_PRIMARY_20, SUCCESS_MAIN } from '../../../consts/theme';
import { useNavigation } from '@react-navigation/native';

export const ClassCard = ({ teacher, starts_at, instrument, id }) => {
 const date = new Date(starts_at);
 const today = new Date();
 const navigation = useNavigation()

 const isToday = date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

 const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
 ];

 return (
    <TouchableOpacity
      style={isToday ? styles.wrapperToday : styles.wrapper}
      onPress={() => navigation.navigate('AppointmentPage', {appointmentId: id})}
    >
      <View style={styles.avatar}>
        <Image
          source={
            teacher.avatar
              ? { uri: process.env.EXPO_PUBLIC_STORAGE_URL + teacher.avatar.image }
              : require('../../../../assets/images/default_avatar.png')
          }
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.mobileFlex}>
          <Text style={styles.name}>{teacher.name}</Text>
          <View style={styles.instrument}>
						<Text>{instrument.name}</Text>
					</View>
        </View>
        <View style={styles.dateTimeWrapper}>
          <Text style={isToday ? styles.dateToday : styles.date}>
            {isToday ? 'Сегодня' : date.getDate() + ' ' + months[date.getMonth()]}
          </Text>
          <Text style={styles.separator}>|</Text>
					<Text style={styles.time}>
						{date.getHours() + ':' + (date.getMinutes() === 0 ? '00' : date.getMinutes())}
					</Text>
        </View>
      </View>
    </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
 wrapper: {
	flexDirection: 'row',
	gap: 16,
	alignItems: 'center',
 },
 avatar: {
	borderRadius: 12,
	overflow: 'hidden',
	width: 64,
	height: 64
},
avatarImage: {
	width: '100%',
	height: '100%',
	objectFit: 'cover'
},
 content: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: 8
 },
 mobileFlex: {
	flexDirection: 'row',
	alignItems: 'center',
	gap: 8
 },
 name: {
	fontSize: 16,
	fontWeight: '500'
 },
 instrument: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		gap: 10,
		borderRadius: 8,
		overflow: 'hidden',
		opacity: .8,
		backgroundColor: SECONDARY_PRIMARY_20,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '400'
 },
 dateTimeWrapper: {
	flexDirection: 'row',
	gap: 8,
	alignItems: 'center',
 },
 date: {
	fontSize: 14,
	color: SECONDARY_PRIMARY
 },
 dateToday: {
	fontSize: 14,
  color: SUCCESS_MAIN
 },
 time: {
		fontSize: 14,
		color: SECONDARY_PRIMARY
 },
 separator: {
	fontSize: 14,
	color: SECONDARY_PRIMARY
 }
});