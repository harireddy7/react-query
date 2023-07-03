import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const fetchWitcherById = (id) => axios.get('http://localhost:4000/witcher/' + id);

const fetchVisitedPlacesByKey = (key) => axios.get('http://localhost:4000/places/' + key);

// Get witcher character by id prop
// Get his/her visited places

export const DependentQueries = () => {
    const { id } = useParams()

	const { isLoading: isWitcherLoading, data: witcherData } = useQuery(['witcher', id], () =>
		fetchWitcherById(id)
	);

	const witchKey = witcherData?.data?.key;
    console.log({ witchKey })

	const { isLoading: isPlacesLoading, data: placesData } = useQuery(
		['visited-places', witchKey],
		() => fetchVisitedPlacesByKey(witchKey),
		{
			enabled: !!witchKey,
		}
	);

	if (isWitcherLoading || isPlacesLoading) return <h2>Loading...</h2>;

	return (
		<>
			<h2>DependentQueries</h2>
			<h3>{witcherData?.data?.name}</h3>
            {placesData?.data?.visited?.map(place => <div key={place}>{place}</div>)}
		</>
	);
};
