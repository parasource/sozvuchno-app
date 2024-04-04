import { useQuery } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useTimeSlots = () => {
	return useQuery({
		queryKey: ['time-slots'], 
		queryFn: () => profile.getTimeSlots(),
		select: data => data.data
	})
}