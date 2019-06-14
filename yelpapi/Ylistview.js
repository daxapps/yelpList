import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { IconButton, Colors } from 'react-native-paper';
import { Linking, Button, AppRegistry, Image } from 'react-native';

export default class List extends Component {
	renderPlaces() {
		let Image_Http_URL = { uri: '' };

		return this.props.places.map((place, i) => (
			<View style={styles.container}>
				<View>
					<Image style={styles.image} source={{ uri: '' + place.imageURL }} />
				</View>

				<View style={{ padding: 10, flex: 1, fontSize: 10 }}>
					<Text style={styles.phoneTextTitle} onPress={() => Linking.openURL('' + place.url)}>
						{place.name}
					</Text>
					<Text>Rating: {place.rating} stars</Text>
					<Text>{place.city}</Text>
					<Text style={styles.phoneText} onPress={() => Linking.openURL('tel:' + place.phone)}>
						{place.phone}
					</Text>
					<Text>Distance from you: {(place.distance / 1609).toFixed(1)} miles</Text>
				</View>
			</View>
		));
	}

	render() {
		const { region } = this.props;
		return (
			<View style={styles.container}>
				<ScrollView>{this.renderPlaces()}</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 5
	},
	phoneText: {
		color: '#E91E63',
		textDecorationLine: 'underline'
	},
	phoneTextTitle: {
		color: 'black',
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		fontSize: 14
	},
	image: {
		width: 100,
		height: 100,
		resizeMode: 'stretch'
	}
});
