import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useUpdateTimeSlots = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data) => profile.updateTimeSlots(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['time-slots'])
    },
  })

	return mutation
}