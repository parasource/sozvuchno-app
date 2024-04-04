import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PRIMARY_CONTRAST, PRIMARY_MAIN, SECONDARY_PRIMARY } from '../../../consts/theme';
import { useNavigation } from '@react-navigation/native';

export const Button = ({label, style, theme, to, pressHandler}) => {
	const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...style,
        backgroundColor: theme == "light" ? null : PRIMARY_MAIN,
        borderStyle: theme == "light" ? "solid" : null,
        borderWidth: theme == "light" ? 1 : null,
        borderColor: theme == "light" ? SECONDARY_PRIMARY : null,
      }}
      onPress={to ? () => navigation.navigate(to) : pressHandler}
    >
      <Text
        style={{
          ...styles.label,
          color: theme == "light" ? SECONDARY_PRIMARY : PRIMARY_CONTRAST
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
    }
})