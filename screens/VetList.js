import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Linking, Image } from 'react-native';
import List from '../yelpapi/Ylistview';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
// GETS THE USERS LOCATION
import { Location, Permissions } from 'expo';
// GETS LOCATIONS FOR VETS
import YelpService from '../yelpapi/yelpfile';

// A placeholder until we get our own location
const region = {
	latitude: 49.1828, //37.321996988,
	longitude: -122.8449, //-122.0325472123455,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};
/* ----------------GETS THE USERS LOCATION AND TELL APP HOW MUCH TO ZOOM IN----------------------- */
const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};

//Talked about missing component, added class and made it React.Component and it worked
export default class VetList extends React.Component {
	state = {
		region: null,
		vetPlaces: []
	};

	componentWillMount() {
		this.getLocationAsync();
	}

	getVetPlaces = async () => {
		const { latitude, longitude } = this.state.region;
		const userLocation = { latitude, longitude };
		const vetPlaces = await YelpService.getVetPlaces(userLocation);
		this.setState({ vetPlaces });
	};

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		const region = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			...deltas
		};
		await this.setState({ region });
		await this.getVetPlaces();
	};
	/* ----------------NOTE FOR BOTTOM, LIST REMOVES OR PUSHES UP THE TOP NAVIGATION----------------------- */
	render() {
		// const { region } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.titlecontainer}>
					<Text style={styles.title}>Vets</Text>
				</View>
				<View style={styles.listContainer}>
					<FlatList
						data={this.state.vetPlaces}
						keyExtractor={(item, index) => item.id}
						renderItem={({ item }) => (
							<View style={styles.listContainer}>
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
									<TouchableOpacity onPress={() => this.props.navigation.navigate('VetDetails')}>
										<Text>Fees</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 5
	},
	title: {
		fontSize: 15,
		color: '#E7E7E6',
		margin: 10
	},
	titlecontainer: {
		// flex: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#6666FF'
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
