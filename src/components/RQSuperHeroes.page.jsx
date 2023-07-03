// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { useState } from 'react';

export const RQSuperHeroesPage = () => {
	// const [refetchInterval, setRefetchInterval] = useState(2000);
	const [name, setName] = useState('')
	const [alterEgo, setAlterEgo] = useState('')

	const handleSuccess = (data) => {
		console.log('success callback');
		console.log(data);
		// if (data?.length >= 5) {
		// 	setRefetchInterval(false);
		// }
	};

	const handleError = (err) => {
		console.log('error callback');
		console.log(err);
		// setRefetchInterval(false);
	};

	const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
		handleSuccess,
		handleError
	);

	const { mutate: addHeroApi } = useAddSuperHeroData(() => {
		setName('');
		setAlterEgo('')
	})

	// console.log({ isLoading, isFetching })
	// if (isFetching) return <h2>Fetching...</h2>

	if (isLoading) return <h2>Loading...</h2>;

	if (isError) return <h2>{error.message}</h2>;

	const handleAdd = () => {
		addHeroApi({ name, alterEgo })
	}

	return (
		<>
			<h2>RQ Super Heroes page</h2>

			<div>
				<input type="text" value={name} onChange={e => setName(e.target.value)} />
				<input type="text" value={alterEgo} onChange={e => setAlterEgo(e.target.value)} />
				<button onClick={handleAdd}>Add Hero</button>
			</div>

			<button className='refresh' onClick={refetch}>
				Fetch Heroes
			</button>
			{data?.data?.map((hero) => (
				<Link key={hero.name} to={hero?.id?.toString()} >{hero.name}</Link>
			))}
		</>
	);
};
