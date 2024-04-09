import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { IconCalendarTime } from "@tabler/icons-react-native";
import { useAppointmentToken } from '../../../hooks/useAppointmentToken';
import { SECONDARY_PRIMARY, SECONDARY_PRIMARY_20, SUCCESS_MAIN } from '../../../consts/theme';
import { Button } from '../Button/Button';

export const NextClassCard = ({
 id,
 teacher,
 student,
 starts_at,
 role,
 instrument
}) => {
 const date = new Date(starts_at);
 const today = new Date();

 const timeToRequest = new Date(date.getTime() - 15 * 60 * 1000);
 const shouldRequest = today >= timeToRequest;

 const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

 const { data: appointment_token, status } = useAppointmentToken({id, shouldRequest});

 const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
 ];

 const disabled = status === "pending" || status === "error";

 return (
    <View style={styles.nextClassCard}>
      <Text style={styles.title}>{disabled ? "Следующие занятие" : "Текущее занятие"}</Text>
      <View style={styles.content}>
        <Text style={styles.instrument}>{instrument.name}</Text>
        <View style={styles.info}>
          <View style={styles.dateWrapper}>
            <IconCalendarTime color="#A7AEB8" size={20} />
            <Text style={isToday ? styles.dateToday : styles.date}>
              {isToday ? "Сегодня" : date.getDate() + " " + months[date.getMonth()]}
            </Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.time}>
              {date.getHours() + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes()) + "-" + date.getHours() + ":50"}
            </Text>
          </View>
          <View style={styles.teacher}>
            <View style={styles.avatar}>
              {role === "student" ? (
                <Image
                 source={
                    teacher.avatar
                      ? { uri: process.env.EXPO_PUBLIC_STORAGE_URL + teacher.avatar.image }
                      : require("../../../../assets/images/default_avatar.png")
                 }
                 style={styles.avatarImage}
                />
              ) : (
                <Image
                 source={
                    student.avatar
                      ? { uri: process.env.EXPO_PUBLIC_STORAGE_URL + student.avatar.image }
                      : require("../../../../assets/images/default_avatar.png")
                 }
                 style={styles.avatarImage}
                />
              )}
            </View>
            <Text style={styles.teacherName}>{role === "student" ? teacher.name : student.name}</Text>
          </View>
        </View>
      </View>
			<Button size="small" label='Подключиться' disabled={disabled}/>
    </View>
 );
};

const styles = StyleSheet.create({
 nextClassCard: {
		paddingVertical: 16,
		gap: 20,
		borderTopWidth: 1,
		borderTopColor: SECONDARY_PRIMARY_20,
		borderBottomWidth: 1,
		borderBottomColor: SECONDARY_PRIMARY_20,
		position: 'relative',
 },
 title: {
		fontSize: 20,
		fontWeight: '700'
 },
 content: {
  	gap: 8
 },
 instrument: {
		fontSize: 18,
		fontWeight: '500'
 },
 info: {
  	gap: 16
 },
 time: {
		color: SECONDARY_PRIMARY,
		fontSize: 14,
		fontWeight: '500'
 },
 separator: {
		color: SECONDARY_PRIMARY,
		fontSize: 14,
		fontWeight: '500'
 },
 dateWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
 },
 dateToday: {
		color: SUCCESS_MAIN,
		fontSize: '700'
 },
 date: {
		color: SECONDARY_PRIMARY,
		fontSize: 16,
		fontWeight: '700'
 },
 teacher: {
    flexDirection: 'row',
		gap: 8,
		alignItems: 'center'
 },
 avatar: {
		borderRadius: 4,
		overflow: 'hidden',
		width: 24,
		height: 24
 },
 avatarImage: {
		width: '100%',
		height: '100%',
		objectFit: 'cover'
 },
 teacherName: {
	color: SECONDARY_PRIMARY,
	fontSize: 14,
	fontWeight: '500'
 },
});