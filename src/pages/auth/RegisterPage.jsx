import React, { useState } from 'react'
import { auth } from '../services/index.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getTimezone } from '../helpersgetTimezone';
import { Register } from '../../components/auth/register/register';

export const RegisterPage = () => {
	const [error, setError] = useState('')
	const [errorTeacher, setErrorTeacher] = useState('')

	const methods = useForm({defaultValues: {
			email: '',
			password: '',
			name: '',
		},	
		mode: 'onTouched'
	})

	const methodsTeacher = useForm({defaultValues: {
			email: '',
			password: '',
			name: '',
		},	
		mode: 'onTouched'
	})

	const navigate = useNavigate()

	const {formState} = methods
	const {formState: formStateTeacher} = methodsTeacher

  const handleSubmit = methods.handleSubmit(data => {
		const payload = {
			email: data.email,
			password: data.password,
			name: data.name,
			timezone: getTimezone()
		}

		
		auth.register(payload).then((res) => {
			if(res.data.status === "success"){
				navigate('/login')
			}
		}).catch((response) => {
			setError(response.response)
		})
  })

  const handleSubmitTeacher = methodsTeacher.handleSubmit(data => {
		const payload = {
			email: data?.email,
			name: data?.name,
			phone: data?.phone,
			message: data?.message
		}
	
		auth.registerTeacher(payload).then((res) => {
			if(res.data.status === "success"){
				navigate('/login')
			}
		}).catch((response) => {
			setErrorTeacher(response.response)
		})
  })

	return <Register {...{handleSubmit, errorTeacher, error, methods, formState, handleSubmitTeacher, formStateTeacher, methodsTeacher}}/>
}