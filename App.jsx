import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.removeItem('userToken');
        setUserToken(token);
      } catch (error) {
        console.error('Error retrieving user token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserToken();
  }, []);

  if (isLoading) {
    // You might want to render a loading spinner or indicator while checking the user token
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {userToken ? <TabNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
