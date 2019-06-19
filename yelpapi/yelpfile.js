import axios from 'axios';
import { Constants } from 'expo';

const YELP_API_KEY = Constants.manifest.extra.yelpApiKey;

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: `Bearer ${YELP_API_KEY}`
	}
});

//this.props.navigation.state.params.user_name  //THIS RECEIVES

const vets = 'vet, All';
const uradius = 30000;
const ulimit = 20;
//Refreshing on app works

const getVetPlaces = (userLocation) => {
	//getCoffeeShops
	return (
		api
			.get('/businesses/search', {
				//params={'term':'bookstore', 'location':'New York City'}    //ORIGINAL
				params: {
					radius: uradius, //this is in meteres, max 40000
					limit: ulimit,
					sort_by: 'distance',
					//categories: 'coffee,coffeeroasteries,coffeeshops',
					categories: vets, //Determines yelp categories

					...userLocation
				}
			})
			//tags for marker, connects to map or ymapview and have to list how they will show in marker
			.then((res) =>
				res.data.businesses.map((business) => {
					return {
						name: business.name,
						id: business.id,
						// coords: business.coordinates,
						phone: business.phone,
						city: business.location.display_address,
						rating: business.rating,
						distance: business.distance,
						// price: business.price,
						url: business.url,
						imageURL: business.image_url
					};
				})
			)
			.catch((error) => console.error(error))
	);
};

export default {
	getVetPlaces
};
