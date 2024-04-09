import { useQuery } from "@tanstack/react-query"
import { classes } from "../services";

export const useUpcomingAppointments = () => {
    return useQuery({
        queryKey: ['upcoming-appointments'],
        queryFn: () => classes.getUpcomingClasses(),
        select: (data) => data.data
    });
};