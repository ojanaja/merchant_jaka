import * as React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import CanceledHistory from '../component/OrderScreen/CanceledHistory';
import DeliveredHistory from '../component/OrderScreen/DeliveredHistory';
import OnGoingHistory from '../component/OrderScreen/OnGoingHistory';

const ActiveRoute = () => (
  <OnGoingHistory />
);

const CompletedRoute = () => (
  <DeliveredHistory />
);

const CanceledRoute = () => (
  <CanceledHistory />
);

const renderScene = SceneMap({
  active: ActiveRoute,
  completed: CompletedRoute,
  canceled: CanceledRoute,
});

export default function OrderScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'active', title: 'On going' },
    { key: 'completed', title: 'Delivered' },
    { key: 'canceled', title: 'Canceled' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          tabStyle={{ textTransform: 'none' }}
          style={{ backgroundColor: Colors.WHITE }}
          indicatorStyle={{ backgroundColor: Colors.PRIMARY }}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ fontFamily: Fonts.semibold, color: Colors.BLACK, fontSize: 15 }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
}