import React from 'react'
import { View } from 'react-native'
import { SECONDARY_PRIMARY_20 } from '../../../consts/theme'

export const Seporator = ({style}) => <View style={{...style, borderTopColor: SECONDARY_PRIMARY_20, borderTopWidth: 1, width: '100%'}}></View>
