import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useProfile } from '../../../hooks/useProfile';
import { useUpdateProfile } from '../../../hooks/useUpdateProfile';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ERROR_MAIN } from '../../../consts/theme';

export const SettingsForm = () => {
	const [isFormDirty, setIsFormDirty] = useState(false);

	const {data: profile} = useProfile()
	const {mutate: updateProfile} = useUpdateProfile()
	
	const methods = useForm({
		defaultValues: {...profile, fname: profile.fname || '', lname: profile.lname || ''},
		mode: "onChange"
	})

	const {getValues, formState, watch: watchAllFields} = methods

	useEffect(() => {
		const isDirty = Object.keys(watchAllFields).some(key => watchAllFields[key] !== getValues()[key]);
		setIsFormDirty(isDirty);
	}, [watchAllFields, methods, profile]);

  const handleSubmit = methods.handleSubmit(data => {
		const d = data?.bday ? new Date(data?.bday) : null	
		const day = d ? +d.getDate() : null			
		const selectedMonth = d ? +d.getMonth() + 1 : null
		const selectedYear = d ? +d.getFullYear() : null

		const payload = {
			email: data?.email,
			name: data?.name,
			fname: data?.fname ? data?.fname : null,
			lname: data?.lname ? data?.lname : null,
			bday: data?.bday ? `${(day + '').length === 2 ? day : '0' + day}.${(selectedMonth + '').length === 2 ? selectedMonth : '0' + selectedMonth }.${selectedYear}` : null,
		}
		
		updateProfile(payload)
  })

	return (
		<FormProvider {...methods}>
			<View style={styles.row}>
				<Text style={styles.partTitle}>Профиль</Text> 
				<View style={styles.partForm}>
				<Input
					placeholder='Иван' 
					name='name' 
					label={'Имя'}
					required
					style={styles.input}
					validation={{
						required: {
							value: true,
							message: 'Заполните поле',
						},
						minLength: {
							value: 2,
							message: 'Минимум 2 символов',
						},
						maxLength: {
							value: 255,
							message: 'Максимум 255 символов',
						},
						validate: {
							matchPattern: (v) =>
							/^[А-ЯЁ][а-яё]*$/.test(v) ||
								"Имя указано неверно",
						},
					}}/>
				<Input 
					placeholder='Иванов' 
					name='fname' 
					label={'Фамилия'}
					style={styles.input}
					validation={{
						required: {
							value: false,
						},
						validate: {
							matchPattern: (v) => {
								if(v?.trim() !== ''){
									return /^[А-ЯЁ][а-яё]*$/.test(v) || "Фамилия указана неверно"
								}
							},
						},
					}}/>
				<Input
					placeholder='Иванович' 
					name='lname' 
					label={'Отчество'}
					style={styles.input}
					validation={{
						required: {
							value: false,
						},
						validate: {
							matchPattern: (v) => {
								if(v?.trim() !== ''){
									return /^[А-ЯЁ][а-яё]*$/.test(v) || "Отчество указано неверно"
								}
							},
						},
					}}/>
					<Button label='Сохранить изменения' style={styles.button} disabled={(!formState.isValid && formState.isDirty) || isFormDirty} pressHandler={handleSubmit}/>
				</View>
			</View>
		</FormProvider>
	)
}

const styles = StyleSheet.create({
	logout: {
		fontSize: 16,
		color: ERROR_MAIN
	},
	row: {
		gap: 16,
		paddingVertical: 16
	},
	partTitle: {
		fontSize: 16
	},
	partForm: {
		gap: 14
	}
})