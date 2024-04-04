import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '../../components/Shared/Input/Input.jsx';
import { auth } from '../../services/index.js';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon12Hours } from '@tabler/icons-react-native';
import { ERROR_LIGHT, ERROR_MAIN, PRIMARY_MAIN, TEXT_PRIMARY } from '../../consts/theme.js';
import { Button } from '../../components/Shared/Button/Button';
import { useProfile } from '../../hooks/useProfile';

const errors = {
	401: 'Пароль или почта введены неверно',
}

export const LoginPage = () => {
  const inset = useSafeAreaInsets()

	const [error, setError] = useState('')
	const {data: profile, refetch} = useProfile()

	const methods = useForm({
		defaultValues: {email: '', password: ''},
		mode: 'onTouched'
	})

	const navigation = useNavigation()

	const { formState } = methods

	const handleSubmit = methods.handleSubmit(data => {
		const loginPayload = {
			email: data.email,
			password: data.password
		}
	
		auth.login(loginPayload)
			.then(() => refetch())
			.catch((response) => {
				setError(response.response)
			})
	})

	const email = methods?.watch('email')
	const password = methods?.watch('password')
	const formFull = email && password

	const submitting = formState.isSubmitting || (formState.isSubmitted && !error)
	const notValid = (!formState.isValid && formState.isDirty) || !formFull  || submitting

	return (
		<View style={{...styles.card, paddingTop: inset.top + 40}}>
			<View>
				<Text style={styles.title}>
				Авторизация{profile?.name}
				</Text>
				<Text style={styles.register}>
					Новый пользователь?
					<Text onPress={() => navigation.navigate('FirstScreen')} style={styles.registerLink}> Создать аккаунт</Text>
				</Text>
			</View>
			{error && <View style={styles.error}><Text>{errors[error?.status]}</Text></View>}
			<FormProvider {...methods}>
					<View style={styles.form}>
						<Input 
							placeholder='Email' 
							name='email' 
							label={'Email'}
							validation={{
								required: {
									value: true,
									message: 'Заполните поле',
								},
								validate: {
									maxLength: (v) =>
										v.length <= 50 || "Почта должна содержать не более 50 символов.",
									matchPattern: (v) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
										"Адрес электронной почты недействителен.",
								},
							}}/>
						<Input  
							type="password" 
							placeholder='Пароль' 
							label={'Пароль'}
							name="password" 
							validation={{
								required: {
									value: true,
									message: 'Поле незаполнено',
								},
								minLength: {
									value: 8,
									message: 'Минимум 8 символов',
								},
								maxLength: {
									value: 50,
									message: 'Максимум 50 символов',
								},
							}}/>
						<Button label="Войти" pressHandler={handleSubmit} disabled={notValid}/>
					</View>
			</FormProvider>
		</View>
)}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		gap: 24
	},
	title: {
		marginBottom: 16,
		fontFamily: 'Inter',
		fontSize: 32,
		fontWeight: 900
	},
	form: {
		gap: 16
	},
	error: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: ERROR_MAIN,
		backgroundColor: `${ERROR_LIGHT}33`,
		borderRadius: 8
	},
	register: {
		color: TEXT_PRIMARY,
		fontSize: 14,
	},
	registerLink: {
		color: PRIMARY_MAIN,
		fontWeight: 500
	}
})