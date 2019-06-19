import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import List from '../yelpapi/Ylistview';
import { createStackNavigator, createAppContainer } from 'react-navigation';

/* ----------------GETS THE USERS LOCATION----------------------- */
import { Location, Permissions } from 'expo';
/* ----------------GETS THE USERS LOCATION----------------------- */

/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */
import YelpService from '../yelpapi/yelpfile';
/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */

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
		vetPlaces: [] //coffeeShops
	};

	componentWillMount() {
		this.getLocationAsync();
	}
	/* ----------------GETS THE USERS LOCATION AND TELL APP HOW MUCH TO ZOOM IN----------------------- */

	/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */
	getVetPlaces = async () => {
		const { latitude, longitude } = this.state.region;
		const userLocation = { latitude, longitude };
		const vetPlaces = await YelpService.getVetPlaces(userLocation);
		this.setState({ vetPlaces });
	};

	/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */

	/* ----------------GETS THE USERS LOCATION----------------------- */
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

		/* ----------------GETS THE USERS LOCATION----------------------- */

		/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */
		await this.getVetPlaces(); //getCoffeeShops
		/* ----------------GETS LOCATIONS FOR COFFEE SHOPS----------------------- */

		/* ----------------GETS THE USERS LOCATION----------------------- */
	};
	/* ----------------NOTE FOR BOTTOM, LIST REMOVES OR PUSHES UP THE TOP NAVIGATION----------------------- */
	render() {
		return (
			<View style={styles.container}>
				{/* <View style={styles.headermenu}> */}
				{/*TO CREATE TITLE FOR HEADER, NEED VIEWS WITHIN VIEWS, ONE FOR MENU AND OTHER FOR TITLE AND THEN A CONTAINER FOR THE TWO*/}
				{/* <View>
						<Button
							icon="menu"
							color="black"
							size={50}
							onPress={() => this.props.navigation.navigate('DrawerToggle')}
						/>
					</View> */}
				<View style={styles.titlecontainer}>
					<Text style={styles.title}>Vets</Text>
					<Button
						style={styles.title}
						title="Go to Details"
						onPress={() => this.props.navigation.navigate('VetDetails')}
					/>
				</View>
				{/* </View> */}
				<List
					region={region}
					places={this.state.vetPlaces}
					// keyExtractor={(item, index) => item[0].toString()}
				/>
			</View>
		);
	}
}
/* ----------------GETS THE USERS LOCATION----------------------- */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	// headermenu: {
	// 	alignItems: 'flex-start',
	// 	justifyContent: 'flex-start',
	// 	flex: 0.09,
	// 	backgroundColor: '#6666FF',
	// 	flexDirection: 'row',
	// 	marginTop: 25
	// },
	title: {
		// fontFamily: 'Marker Felt',
		fontSize: 15,
		color: '#E7E7E6',
		margin: 10
	},
	titlecontainer: {
		// flex: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#6666FF'
	}
});
