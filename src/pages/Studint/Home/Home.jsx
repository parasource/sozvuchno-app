import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NextClassCard } from '../../../components/Shared/NextClassCard/NextClassCard'
import { useUpcomingAppointments } from '../../../hooks/useUpcomingAppointments'
import { AllAppointments } from '../../../components/Student/AllAppointments/AllAppointments'

export const Home = () => {
	const {data: appointments, isLoading: appointmentIsLoading} = useUpcomingAppointments()

	return (
		<SafeAreaView>
			<ScrollView>
				{appointmentIsLoading ? <ActivityIndicator/> : 
				<View style={{paddingHorizontal: 16, paddingTop: 40, paddingBottom: 100}}>
					{appointments[0] && <NextClassCard {...appointments[0]} role="student"/>}
					<AllAppointments classes={appointments}/>
				</View>}
			</ScrollView>
		</SafeAreaView>
	)
}
