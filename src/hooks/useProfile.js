import { useQuery } from "@tanstack/react-query"
import { auth } from "../services/index.js"
import { getTimezone } from "../helpers/getTimezone"
import { useUpdateProfile } from "./useUpdateProfile"
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";

export const useProfile = () => {
	const mutation = useUpdateProfile()
	const [token, setToken] = useState(null);

	useEffect(() => {
			const fetchToken = async () => {
					const token = await SecureStore.getItemAsync("token");
					setToken(token);
			};

			fetchToken();
	}, []);

	const response = useQuery({
		queryKey: ['profile'], 
		queryFn: () => auth.me(), 
		enabled: !!token,
		select: (data) => data.data,
		retry: 5
	})

	useEffect(() => {
		if(response.data?.timezone && response.data?.timezone !== getTimezone()){
				mutation.mutate({"timezone": getTimezone()});
		}
	}, [response.data?.timezone, mutation])	

	return response
}