import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAllAppointments = () => {
	return useQuery({
		queryKey: ['appointments'],
		queryFn: () => classes.getAllClasses(),
		select: (data) => data.data
	})
}