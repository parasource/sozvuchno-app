import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import { SettingsForm } from '../../components/Shared/SettingsForm/SettingsForm'
import { useProfile } from '../../hooks/useProfile'
import { useUpdateProfileAvatar } from '../../hooks/useUpdateProfileAvatar';
import { PRIMARY_MAIN, SECONDARY_PRIMARY, SECONDARY_PRIMARY_20 } from '../../consts/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { IconEdit } from '@tabler/icons-react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RecyclerViewBackedScrollView } from 'react-native';

export const Profile = () => {
	const inset = useSafeAreaInsets()
	const {data: profile} = useProfile()
	const {mutate: updateProfileAvatar} = useUpdateProfileAvatar()
	const { showActionSheetWithOptions } = useActionSheet();

	const onClose = () => {
		setImage(null)
	}

	const onSave = async (image) => {
		if(image){
			let localUri = image.uri;
			localUri.split('/').pop();
			let filename = localUri.split('/').pop();
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			
			updateProfileAvatar({ uri: localUri, name: filename, type })
		}
	};

	const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
			onSave(result.assets[0])
    }
  };

	const takePhoto = async () => {
		await ImagePicker.requestCameraPermissionsAsync()
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
			onSave(result.assets[0])
    }
  };

	const openActionSheet = () => {
    const options = ['Загрузить из галереи', 'Сделать фото', 'Удалить изображение', 'Отмена'];
    const destructiveButtonIndex = 2
    const cancelButtonIndex = 3

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 0:
					pickImage()
          break;
        
				case 1:
					takePhoto()
          break;

        case destructiveButtonIndex:
					console.log('remove');
          break;

        case cancelButtonIndex:
					onClose()

      }});
  }

	return (
		<ScrollView style={{paddingHorizontal: 16, paddingTop: inset.top + 40}}>
			<View style={s.profile}>
				<View style={s.avatar}>
					<TouchableHighlight style={s.edit} onPress={openActionSheet}>
						<Image style={s.avatarImage} source={{uri: profile?.avatar ? process.env.EXPO_PUBLIC_STORAGE_URL + profile?.avatar?.image : '../../../assets/images/default_avatar.png'}}/>
					</TouchableHighlight>
				</View>
				<View style={s.profileContent}>
					<Text style={s.name}>{profile?.name}</Text>
					<Text style={s.role}>{profile?.email}</Text>
				</View>
			</View>
			<SettingsForm/>
		</ScrollView>
	)
}


const s = StyleSheet.create({
	profile: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingBottom: 16,
		borderBottomColor: SECONDARY_PRIMARY_20,
		borderBottomWidth: 1
	},
	avatarImage: {
		width: 60,
		height: 60,
		objectFit: 'cover',
		position: 'absolute',
		top: '0',
		left: '0',
	},	
	avatar: {
		width: 60,
		height: 60,
		borderRadius: '50%',
		position: 'relative',
		flexShrink: 0,
		overflow: 'hidden',
	},
	edit: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.4)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileContent: {
		gap: 4,
	},
	name: {
		color: '#000',
		fontSize: 14
	},
	role: {
		color: SECONDARY_PRIMARY,
		fontSize: 10
	}
})