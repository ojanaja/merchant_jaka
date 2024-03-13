import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import TabNavigation from './TabNavigation';
import OTPScreen from '../screen/OTPScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
