import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message'

import Routes from './src/Navigations/Routes';
import { toastConfig } from './src/utils/toastConfig'
// Auth
const App = () => {

  return (
    <SafeAreaProvider>
      <Routes />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};


export default App;


