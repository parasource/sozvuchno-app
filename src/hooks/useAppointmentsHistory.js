import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAppointmentsHistory = (page) => {
	return useQuery({
		queryKey: ['history', page],
		queryFn: () => classes.getHistory(page),
		select: data => data.data
	})
}