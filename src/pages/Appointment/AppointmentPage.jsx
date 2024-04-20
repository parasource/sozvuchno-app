import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { useAppointment } from '../../hooks/useAppointment';
import { useProfile } from '../../hooks/useProfile';
import { SECONDARY_PRIMARY, SECONDARY_PRIMARY_20 } from '../../consts/theme';
import { Button } from '../../components/Shared/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActionSheet } from '@expo/react-native-action-sheet';

export const AppointmentPage = ({route}) => {
	const {appointmentId} = route.params
	const { showActionSheetWithOptions } = useActionSheet();

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (data) => classes.cancelClass(data),
		onSuccess: () => {
      queryClient.invalidateQueries(['appointments'])
    },
	})
	
	const cancelAppointment = () => {
		mutation.mutate({id: appointmentId, reason: 'Reason'})
	}

	const {data: appointment, isFetched} = useAppointment(appointmentId)
	const {data: profile} = useProfile()

	const teacher =  appointment?.teacher
	const student =  appointment?.student

	if(!isFetched){
		return <ActivityIndicator/>
	}


	const openActionSheet = () => {
    const options = ['Отменить занятие', 'Закрыть'];
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 1

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case destructiveButtonIndex:
					cancelAppointment()
          break;

        case cancelButtonIndex:
      }});
  }
	
	return (
		<View style={{padding: 16}}>
				{profile?.role === 'student' ? 
				<View style={s.profile}>
					<View style={s.avatar}>
						<Image style={s.avatarImage} 
							source={ teacher.avatar
								? { uri: process.env.EXPO_PUBLIC_STORAGE_URL + teacher.avatar.image }
								: require('../../../assets/images/default_avatar.png')}/>
					</View>
					<View style={s.profileContent}>
						<Text style={s.name}>{`${teacher?.fname || ""} ${teacher?.name || ""} ${teacher?.lname || ""}`}</Text>
						<Text style={s.role}>Преподаватель</Text>
					</View>
				</View> : 
				<View style={s.profile}>
					<Image style={s.avatarImage} 
					source={ student.avatar
								? { uri: process.env.EXPO_PUBLIC_STORAGE_URL + student.avatar.image }
								: require('../../../assets/images/default_avatar.png')}/>
					<View style={s.profileContent}>
						<Text style={s.name}>{`${student?.fname || ""} ${student?.name || ""} ${student?.lname || ""}`}</Text>
						<Text style={s.role}>Ученик</Text>
					</View>
				</View>
				}
				<View style={s.classInfo}>
					<View style={s.infoItem}>
						<Text style={s.infoLabel}>Специальность</Text>
						<Text style={s.infoValue}>{appointment?.instrument.name}</Text>
					</View>
					<View style={s.infoItem}>
						<Text style={s.infoLabel}>Начало</Text>
						<Text style={s.infoValue}>{(new Date(appointment?.starts_at)).toLocaleDateString('RU-ru', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit'
						})}</Text>
					</View>
					<View style={s.infoItem}>
						<Text style={s.infoLabel}>Длительность</Text>
						<Text style={s.infoValue}>50 мин.</Text>
					</View>
					<View style={s.buttons}>
						<Button style={s.cancelBtn} theme='light' label={'Отменить занятие'} pressHandler={() => openActionSheet()}/>
					</View>
				</View>
		</View>
	)
}

const s = StyleSheet.create({
	profile: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingBottom: 16,
		borderBottomColor: SECONDARY_PRIMARY_20,
		borderBottomWidth: 1
	},
	avatarImage: {
		width: 50,
		height: 50,
		objectFit: 'cover',
	},	
	avatar: {
		width: 50,
		height: 50,
		borderRadius: '50%',
		overflow: 'hidden',
		flexShrink: 0,
	},
	profileContent: {
		gap: 4,
	},
	name: {
		color: '#000',
		fontSize: 14
	},
	role: {
		color: SECONDARY_PRIMARY,
		fontSize: 10
	},
	classInfo: {
		marginTop: 16,
		gap: 8
	},
	infoItem: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'flex-start'
	},
	infoLabel: {
		fontSize: 16,
		fontWeight: '400',
	},
	infoValue: {
		fontSize: 16,
		fontWeight: '600',
	},
	buttons: {
		marginTop: 32,
		gap: 8
	}
})