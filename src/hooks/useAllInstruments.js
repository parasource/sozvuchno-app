import { useQuery } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useAllInstruments = () => {
	return useQuery({
		queryKey: ['instruments'],
		queryFn: () => profile.getAllInstruments(),
		select: (data) => data.data
})
}