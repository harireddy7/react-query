import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

const fetchWitcher = () => axios.get('http://localhost:4000/witcher');

export const ParallelQueriesPage = () => {
    const { isLoading: isHeroesLoading, data: superheroesData } = useQuery('super-heroes', fetchSuperHeroes)
    const { isLoading: isWitcherLoading, data: witcherData } = useQuery('witcher', fetchWitcher)

    if (isHeroesLoading || isWitcherLoading) return <h2>Loading...</h2>

    return (
        <>
            <h2>ParallelQueriesPage</h2>
            <h3>Super Heroes</h3>
            {superheroesData?.data?.map((hero) => (
				<div key={hero.name}>{hero.name}</div>
			))}
            <h3>Witcher</h3>
            {witcherData?.data?.map((witch) => (
				<Link to={`/rq-dependent/${witch.id}`} key={witch.name}>{witch.name}</Link>
			))}
        </>
    )
}