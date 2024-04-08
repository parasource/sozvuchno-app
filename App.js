import React, {useCallback, useEffect, useState} from 'react';

import useFonts from './src/hooks/useFont';
import * as SplashScreen from 'expo-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { QueryClient } from '@tanstack/react-query';
import { AppContainer } from './src/components/AppContainer';
import { QueryClientProvider } from '@tanstack/react-query';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const defaultErrorHandler = ErrorUtils.getGlobalHandler()

const queryClient = new QueryClient()

const myErrorHandler = (e, isFatal) => {
  defaultErrorHandler(e, isFatal)
}

ErrorUtils.setGlobalHandler(myErrorHandler)

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts()
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!appIsReady) {
    return null;
  }
 
  return (
		<QueryClientProvider client={queryClient}>
			<ActionSheetProvider>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<AppContainer/>
				</TouchableWithoutFeedback>
			</ActionSheetProvider>
			<View onLayout={onLayoutRootView}></View>
		</QueryClientProvider>
  );
}