/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderScreen from '../screen/OrderScreen';
import ProductScreen from '../screen/ProductScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import OTPScreen from '../screen/OTPScreen';
import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';
import AuthNavigation from './AuthNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: {
        fontFamily: Fonts.semibold,
      },
      tabBarActiveTintColor: Colors.PRIMARY,
      headerTitleAlign: 'left',
      headerTitleStyle: { fontFamily: Fonts.bold, fontSize: 23 },
    }}>
      <Tab.Screen
        name="Pesanan"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="cart" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="cart-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />
      <Tab.Screen
        name="Produk"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="food" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="food-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />
      <Tab.Screen name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="store" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="store-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
