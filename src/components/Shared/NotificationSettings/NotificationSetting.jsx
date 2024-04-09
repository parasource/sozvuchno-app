import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useProfile } from '../../../hooks/useProfile';
import { profile as profileApi } from '../../../services/index';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../Button/Button';
import { useUpdateProfileNotifications } from '../../../hooks/useUpdateProfileNotifications';
import { Toggle } from '../Toggle/Toggle';
import { SECONDARY_PRIMARY_20 } from '../../../consts/theme';
import { Seporator } from '../Seporator/Seporator';

export const NotificationSetting = () => {
	const {data: profile, refetch} = useProfile()
	const {mutate: updateSettings} = useUpdateProfileNotifications()

	const methods = useForm({
		mode: "onChange",
		onChange: () => handleSubmit,
		defaultValues: {
			telegram_notification_new_appointment: profile?.telegram_notification_new_appointment,
			telegram_notification_upcoming_appointment: profile?.telegram_notification_upcoming_appointment,
			telegram_notification_unread_messages: profile?.telegram_notification_unread_messages,
			telegram_notification_new_login: profile?.telegram_notification_new_login,
			telegram_notification_newsletter: profile?.telegram_notification_newsletter,
			email_notification_new_appointment: profile?.email_notification_new_appointment,
			email_notification_new_login: profile?.email_notification_new_login,
			email_notification_newsletter: profile?.email_notification_newsletter
		}
	})

  const handleSubmit = methods.handleSubmit(data => {
		const payload = {
			telegram_notification_new_appointment: data?.telegram_notification_new_appointment,
			telegram_notification_upcoming_appointment: data?.telegram_notification_upcoming_appointment,
			telegram_notification_unread_messages: data?.telegram_notification_unread_messages,
			telegram_notification_new_login: data?.telegram_notification_new_login,
			telegram_notification_newsletter: data?.telegram_notification_newsletter,
			email_notification_new_appointment: data?.email_notification_new_appointment,
			email_notification_new_login: data?.email_notification_new_login,
			email_notification_newsletter: data?.email_notification_newsletter,
		}
		
		updateSettings(payload)
  })

	const {formState} = methods

	return (
		<View style={s.card}>
			<Seporator/>
			<Text style={s.cardHeader}>Социальные сети и аккаунты</Text>
			{profile?.telegram_chat_id ? 
			<Button theme='light' label={'Отвязать Telegram'} onClick={() => {
				profileApi.detachTelegram().then(() => {
					refetch()
				})
			}}/>
				: 
			<Button label={'Подключить Telegram'} to={'https://t.me/sozvuchno_bot?start=' + profile?.telegram_token} style={s.tgBtn}/>
			}
			<Seporator/>
			<Text style={s.cardHeader}>Уведомления</Text>
			<FormProvider {...methods}>
				<View style={s.form}>
				{profile?.telegram_chat_id ? <>
						<View style={s.row}>
							<Text style={s.partTitle}>
								Telegram
							</Text>
							<View style={s.partForm}>
								{profile?.role === 'teacher' && <Toggle label={'Новые занятия'} name='telegram_notification_new_appointment'/>}
								<Toggle label={'Напоминания о предстоящих занятиях'} name='telegram_notification_upcoming_appointment'/>
								<Toggle label={'Непрочитанные сообщения'} name='telegram_notification_unread_messages'/>
								<Toggle label={'Вход в аккаунт'} name='telegram_notification_new_login'/>
								<Toggle label={'Новости сервиса'} name='telegram_notification_newsletter'/>
							</View>
						</View>
					</> : null}
					{profile?.email ? <>
						<View style={s.row}>
							<Text style={s.partTitle}>
								Почта
							</Text>
							<View style={s.partForm}>
								{profile?.role === 'teacher' && <Toggle label={'Новые занятия'} name='email_notification_new_appointment'/>}
								<Toggle label={'Вход в аккаунт'} name='email_notification_new_login'/>
								<Toggle label={'Новости сервиса'} name='email_notification_newsletter'/>
							</View>
						</View>
					</> : null}
					{(profile?.email || profile?.telegram_chat_id) && <Button label='Сохранить изменения' style={s.button} disabled={!formState.isValid || !formState.isDirty || formState.isSubmitting} pressHandler={handleSubmit}/>}
				</View>
				<Seporator style={{marginBottom: 16}}/>
			</FormProvider>
		</View>
	)
}

const s = StyleSheet.create({
	card: {
		gap: 24,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		fontSize: 16,
		fontWeight: '600',
		gap: 10,
	},
	row: {
		gap: 16,
	},
	partTitle: {
		fontSize: 16,
	},
	partForm: {
		gap: 14
	},
	form: {
		gap: 16
	}
})