import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchHero = ({ queryKey: [ , heroId ] }) => {
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()
    return useQuery(['super-hero', heroId], fetchHero, {
        initialData: () => {
            const hero = queryClient.getQueryData('super-heroes')?.data?.find(hero => hero.id === +heroId)
            if (hero) return { data: hero }
            return undefined
        }
    })
}