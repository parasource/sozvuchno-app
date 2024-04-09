import { StyleSheet, Text, View } from "react-native"
import { SECONDARY_PRIMARY, SECONDARY_PRIMARY_20 } from "../../../consts/theme"
import { ClassCard } from "../../Shared/ClassCard/ClassCard"

export const AllAppointments = ({classes, style}) => {
	return (
		<View style={{...style, ...s.card}}>
			{classes.length > 0 ? 
			<>
				<Text style={s.title}>Все занятия</Text>
				<View style={s.list}>
					{classes?.filter(el => el.status !== 'cancelled').map(cl => <ClassCard {...cl}/>)} 
				</View>
			</>
			: <Text style={s.notFound}>Нет занятий</Text>}
		</View>
	)
}

const s = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: '600'
	},
	list: {
		gap: 16
	},
	notFound: {
		flex: 1,
		color: SECONDARY_PRIMARY,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	},
	card: {
		paddingVertical: 16,
		gap: 16,
		position: 'relative',
	}
})