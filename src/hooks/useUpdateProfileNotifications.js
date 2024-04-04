import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useUpdateProfileNotifications = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data) => profile.updateProfileNotifications(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
  })

	return mutation
}