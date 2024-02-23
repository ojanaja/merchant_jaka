import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderScreen from '../screen/OrderScreen';
import ProductScreen from '../screen/ProductScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

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
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <MaterialCommunityIcons name="cart" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="cart-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <MaterialCommunityIcons name="food" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="food-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />
      <Tab.Screen name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <MaterialCommunityIcons name="store" size={23} color={Colors.PRIMARY} />
            ) : (
              <MaterialCommunityIcons name="store-outline" size={23} color={Colors.GREY} />
            ),
        }}
      />

    </Tab.Navigator>
  )
}

export default TabNavigation
