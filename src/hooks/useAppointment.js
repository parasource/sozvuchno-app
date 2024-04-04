import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAppointment = (appointmentId) => {
	return useQuery({
		queryKey: ['appointment', appointmentId],
		queryFn: () => classes.getClassById(appointmentId),
		enabled: !!appointmentId,
		select: (data) => data.data
	})
}