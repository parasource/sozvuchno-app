import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useUpdateProfileAvatar = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data) => profile.updateProfileAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
  })

	return mutation
}