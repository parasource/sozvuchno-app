import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAppointmentToken = (appointmentId) => {
	return useQuery({
		queryKey: ['appointment-token', appointmentId],
		queryFn: () => classes.getClassTokenById(appointmentId),
		enabled: !!appointmentId,
		select: (data) => data.data
	})
}