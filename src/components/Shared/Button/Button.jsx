import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PRIMARY_CONTRAST, PRIMARY_MAIN, SECONDARY_PRIMARY, SECONDARY_PRIMARY_20 } from '../../../consts/theme';
import { useNavigation } from '@react-navigation/native';

export const Button = ({label, style, theme = 'normal', to, pressHandler, disabled}) => {
	const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...style,
				...{"light": disabled ? styles.lightDisabled : styles.light, 
				"normal":  disabled ? styles.normalDisabled : styles.normal}[theme],
      }}
			disabled={disabled}
      onPress={to ? () => navigation.navigate(to) : pressHandler}
    >
      <Text
        style={{
          ...styles.label,
          color: theme == "light" ? SECONDARY_PRIMARY : (disabled ? SECONDARY_PRIMARY : PRIMARY_CONTRAST),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 11,
        borderRadius: 12,
    },
    label: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
		light: {
			backgroundColor: null,
			borderStyle: "solid",
			borderWidth: 1,
			borderColor: SECONDARY_PRIMARY_20,
		},
		normal: {
			backgroundColor: PRIMARY_MAIN,
		},
		lightDisabled: {
			borderStyle: "solid",
			borderWidth: 1,
			borderColor: SECONDARY_PRIMARY,
		},
		normalDisabled: {
			backgroundColor: SECONDARY_PRIMARY_20,
			color: SECONDARY_PRIMARY
		},
})