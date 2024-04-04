import * as Font from "expo-font";
 
const useFonts = async () =>
  await Font.loadAsync({
    'Inter': require('../../assets/fonts/inter.ttf'),
    'Futur': require('../../assets/fonts/futur.ttf'),
  });

  export default useFonts