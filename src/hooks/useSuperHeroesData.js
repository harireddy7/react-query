import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils'

const fetchHeroes = () => {
	// return axios.get('http://localhost:4000/superheroes');
	return request({ url: '/superheroes' })
};

const addSuperHero = (hero) => {
	// return axios.post('http://localhost:4000/superheroes', hero);
	return request({ url: '/superheroes', method: 'post', data: hero })
};

export const useSuperHeroesData = (onSuccess, onError) => {
	return useQuery('super-heroes', fetchHeroes, {
		// cacheTime: 5000,
		// staleTime: 30000,
		// refetchOnMount: true,
		refetchOnWindowFocus: false,
		// refetchInterval: 3000,
		// refetchIntervalInBackground: true
		// enabled: false
		onSuccess: onSuccess,
		onError: onError,
		// select: (data) => data.data.map((hero) => hero.name),
	});
};

export const useAddSuperHeroData = (onSuccess) => {
	const queryClient = useQueryClient();
	return useMutation(addSuperHero, {
		// onSuccess: (data) => {
		// 	onSuccess()
		// 	// queryClient.invalidateQueries('super-heroes')
		// 	// update exising superheroes query data with add superhero response
		// 	// instead of refetching it via network call
		// 	queryClient.setQueryData('super-heroes', (oldData) => {
		// 		return {
		// 			...oldData,
		// 			data: [...oldData.data, data.data]
		// 		}
		// 	})
		// }
		onMutate: async (newHero) => {
			await queryClient.cancelQueries('super-heroes');
			const prevHeroesData = queryClient.getQueryData('super-hero');
			queryClient.setQueryData('super-heroes', (oldData) => {
				return {
					...oldData,
					data: [...oldData.data, { id: oldData?.data?.length + 1, ...newHero }],
				};
			});
			return {
				prevHeroesData,
			}
		},
		onError: (_error, _hero, context) => {
			queryClient.setQueryData('super-hero', context?.prevHeroesData)
		},
		onSettled: () => {
			onSuccess()
			queryClient.invalidateQueries('super-heroes')
		},
	});
};
