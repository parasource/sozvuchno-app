import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAppointmentToken = ({id: appointmentId, shouldRequest}) => {
	return useQuery({
		queryKey: ['appointment-token', appointmentId],
		queryFn: () => classes.getClassTokenById(appointmentId),
		enabled: !!appointmentId && shouldRequest,
		select: (data) => data.data
	})
}