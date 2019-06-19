import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Row } from 'react-native';
import { Linking, Button, AppRegistry, Image } from 'react-native';

export default class List extends Component {
	render() {
		const { region } = this.props;
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.places}
					keyExtractor={(item, index) => item.id}
					renderItem={({ item }) => (
						<View style={styles.container}>
							<View>
								<Image
									style={styles.image}
									source={{ uri: item.imageURL }}
									defaultSource={require('../assets/images/puppyKitten.png')}
								/>
							</View>
							<View style={{ padding: 10, flex: 1, fontSize: 9 }}>
								<Text style={styles.phoneTextTitle} onPress={() => Linking.openURL(item.url)}>
									{item.name}
								</Text>
								<Text>Rating: {item.rating} stars</Text>
								<Text>{item.city}</Text>
								<Text style={styles.phoneText} onPress={() => Linking.openURL('tel:' + item.phone)}>
									{item.phone}
								</Text>
								<Text>Distance: {(item.distance / 1609).toFixed(1)} miles</Text>
								<Button title="Fees" />
							</View>
						</View>
					)}
				/>
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
		resizeMode: 'cover'
	}
});
