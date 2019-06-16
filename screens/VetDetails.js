import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

export default class VetDetails extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<View style={StyleSheet.container}>
					<Text>VetDetails</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: 25
	}
});
