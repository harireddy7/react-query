import axios from 'axios';
import { useQueries } from 'react-query';

const fetchSuperHero = (id) => axios.get(`http://localhost:4000/superheroes/${id}`);

export const DynamicParallelQueries = ({ ids = [] }) => {
	const queryResults = useQueries(
		ids.map((id) => ({
			queryKey: ['super-hero', id],
			queryFn: () => fetchSuperHero(id),
		}))
	);

	console.log(queryResults);

	return (
		<>
			<h2>DynamicParallelQueries</h2>
		</>
	);
};
