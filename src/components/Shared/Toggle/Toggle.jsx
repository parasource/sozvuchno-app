import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { PRIMARY_MAIN } from '../../../consts/theme';

export const Toggle = ({ name, label }) => {
 const { control } = useFormContext();

 return (
    <View style={styles.flex}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
					<Switch onChange={() => onChange(!value)} value={value} trackColor={{true: PRIMARY_MAIN}} />
        )}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 flex: {
    flexDirection: 'row',
    alignItems: 'center',
		justifyContent: 'space-between'
 },
 label: {
    marginRight: 10,
 },
 wrapper: {
    width: 50,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#E2E4E7',
    justifyContent: 'center',
    alignItems: 'center',
 },
 toggle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
 },
 active: {
    backgroundColor: '#1890FF',
    borderColor: '#1890FF',
 },
});