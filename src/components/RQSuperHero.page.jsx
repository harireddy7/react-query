import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

const RQSuperHeroPage = () => {
	const { id } = useParams();

	const { isLoading, data, isError, error } = useSuperHeroData(id);

    // console.log({ isLoading, data, isError, error  })

	if (isLoading) return <h2>Loading...</h2>;
	if (isError) return <h2>{error.message}</h2>;

	return (
		<div>
			{data?.data?.name} - {data?.data?.alterEgo}
		</div>
	);
};

export default RQSuperHeroPage;
