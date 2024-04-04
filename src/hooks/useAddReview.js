import { useMutation, useQueryClient } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useAddReview = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data) => classes.addReview(data.body, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['history'])
    },
  })

	return mutation
}