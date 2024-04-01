import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from 'expo-secure-store';
import { Toast } from "toastify-react-native";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const chatInstance = axios.create({
    baseURL: process.env.REACT_APP_CHAT_API_URL
})

const errorHandler = (error) => {
	if(error?.response?.status && error?.response?.status !== 403 && error?.response?.status !== 404){
		Toast.error(`${error?.response?.data?.message || 'Возникла ошибка'}`);  
	}

  return Promise.reject({ ...error })
}

instance.interceptors.response.use(
  (response) => {return response},
  (error) => errorHandler(error)
);

instance.interceptors.request.use(
	async config => {
			const token = await SecureStore.getItemAsync('token')
			if (!config.headers.Authorization) {
					config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
	}
)

const refreshAuthLogic = async failedRequest => {
	const refresh = await SecureStore.getItemAsync("refresh_token")
	instance.post('/auth/refresh', {"refresh_token": refresh}).then(async (tokenRefreshResponse) => {
			await SecureStore.setItemAsync('token', tokenRefreshResponse.data.token)
			failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
			return Promise.resolve();
	}).catch(err => {
			SecureStore.deleteItemAsync('token', null)
			SecureStore.deleteItemAsync('refresh_token', null)
			console.log('err', err);
	})
};

createAuthRefreshInterceptor(instance, refreshAuthLogic, {statusCodes: [401, 403]});

export const auth = {
	login(loginPayload) {
		return instance.post("/api/login", loginPayload)
	},
	loginVk(loginPayload) {
		return instance.post("/api/login/vk", loginPayload)
	},
	verifyEmail(token) {
		return instance.post("/api/verify-email/" + token)
	},
	register(payload) {
		return instance.post("/api/register", payload)
	},
	registerTeacher(payload) {
		return instance.post("/api/register/teacher", payload)
	},
	me() {
		return instance.get("/api/me")
	}
}

export const profile = {
	getAllInstruments() {
		return instance.get('/api/instruments/all')
	},
	updateProfileAvatar(data) {
		const formData = new FormData()
		formData.append('avatar', data);
	
		return instance.post('/api/profile/update-avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	updateProfile(data) {
		return instance.post("/api/profile/update", {...data})
	}, 
	updatePassword(data) {
		return instance.post("/api/profile/update-password", {...data})
	}, 
	updateProfileNotifications(data){
		return instance.post("/api/profile/update-notifications", {...data})
	},
	updateVideoPresentation(data) {
		const formData = new FormData()
		formData.append('video_presentation', data);
	
		return instance.post('/api/profile/update-video-presentation', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		
	},
	fillInformation(data) {
		return instance.post("/api/profile/fill-up", data)
	},
	getAllTeachers(params) {
		return instance.get('/api/teachers/search', {params: {...params}})
	},
	getTimeSlots() {
		return instance.get('/api/profile/timeslots')
	},
	updateTimeSlots(data) {
		return instance.post('/api/profile/timeslots/update', data)
	},
}

export const classes = {
	getClassById(id) {
		return instance.get(`/api/appointments/${id}`)
	},
	getClassTokenById(id) {
		return instance.get(`/api/appointments/${id}/join-token`)
	},
	getAllClasses() {
		return instance.get('/api/appointments')
	},
	getHistory(page){
		return instance.get('/api/appointments/history', {params: {page}})
	},
	cancelClass({id, reason}){
		return instance.post('/api/appointments/cancel', {
				appointment_id: id,
				reason: reason
		})
	},
	createClass(teacherId, time, date, instrument) {
		return instance.post('/api/appointments/create', {
			"teacher_id": teacherId,
			"date": date,
			"time": time,
			"duration": "1h",
			"instrument_id": instrument
		})
	},
	getTeacher(id) {
		return instance.get(`/api/teachers/${id}`)
	},
	getReviews(id) {
		return instance.get(`/api/teachers/${id}/feedbacks`)
	},
	addReview(body, id) {
		return instance.post(`/api/appointments/${id}/feedback`, body)
	}
}

export const chat = {
	getAllChats() {
		return chatInstance.get('/v1/chats')
	},
	postAttachment(data, options) {
		const onProgress = options?.onProgress;

		const formData = new FormData()
		formData.append('attachment', data);
	
		return instance.post('/api/attachments/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: progressEvent => {
				onProgress?.(Math.round((progressEvent.loaded / progressEvent.total) * 100));
			},
		})
	}
}