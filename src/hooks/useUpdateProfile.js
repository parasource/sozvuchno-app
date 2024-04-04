import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../services/index.js"

export const useUpdateProfile = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data) => profile.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
  })

	return mutation
}