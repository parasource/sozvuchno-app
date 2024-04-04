import { useQuery } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useAllTeachers = (params) => {
	return useQuery({
			queryKey: ['teachers', params],
			queryFn: () => profile.getAllTeachers(params),
			select: (data) => data.data
	})
}