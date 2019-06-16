import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import VetList from '../screens/VetList';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
	Home: HomeScreen
});

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
			}
		/>
	)
};

const LinksStack = createStackNavigator({
	Links: VetList
});

LinksStack.navigationOptions = {
	tabBarLabel: 'Vets',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
};

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	)
};

export default createBottomTabNavigator({
	HomeStack,
	LinksStack,
	SettingsStack
});
