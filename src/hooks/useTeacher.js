import { useQuery } from "@tanstack/react-query"
import { classes } from "../services/index.js"

export const useTeacher = (teacher_id) => {
	return useQuery({
			queryKey: ['teacher', teacher_id],
			queryFn: async () => {
					const teacherResponse = await classes.getTeacher(teacher_id);
					const reviewsResponse = await classes.getReviews(teacher_id);
					teacherResponse.data.reviews = reviewsResponse.data;
					return teacherResponse.data;
			},
			enabled: !!teacher_id,
			select: (data) => data,
			
	})
}