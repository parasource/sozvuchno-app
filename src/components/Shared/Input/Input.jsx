import { IconEye, IconEyeOff } from "@tabler/icons-react-native"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
import { ERROR_MAIN, TEXT_SECONDARY } from "../../../consts/theme"

export const Input = ({type = 'text', required, placeholder, name, style, validation, label, leftIcon, rightIcon, title}) => {
	const {control} = useFormContext()

	const [isHidden, setIsHidden] = useState(true)

  return (
			<Controller 
				control={control} 
				name={name} 
				rules={validation}
				render={({field, fieldState: {error}}) => (
					<View style={styles.wrapper}>
						{label && (
							<Text
								style={styles.label}
							>
								{label}{required && <Text style={styles.star}> *</Text>}
							</Text>
						)} 
						<View style={styles.inputWrapper}>
							{leftIcon}
							<TextInput
								secureTextEntry={type === 'password' && isHidden}
								placeholder={placeholder} 
								style={ styles.input}
								onChangeText={value => field.onChange(value)}
								{...field}
							/>
							{type === 'password' &&
								<TouchableHighlight style={styles.eyeBtn} onPress={() => {setIsHidden((prev) => !prev)}}>
									{isHidden ? <IconEye size={18}/> : <IconEyeOff size={18}/>}
								</TouchableHighlight>
							}
							{rightIcon}
						</View>
						{error && (
							<Text style={styles.error}>{error.message}</Text>
						)}
				</View>
			)}/>
  )
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		gap: 4,
	},
	label: {
		color: TEXT_SECONDARY,
		fontSize: 14
	},
	inputWrapper: {
		flexDirection: 'row',
		borderRadius: 8,
		borderColor: '#E2E4E7',
		borderWidth: 1,
		background: '#FFF',
		gap: 10,
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	input: {
		flex: 1,
	},
	error: {
		color: ERROR_MAIN,
		fontSize: 14,
	}
})