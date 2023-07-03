import { BrowserRouter as Router, Routes, Route, Link,  } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css';
import { HomePage } from './components/Home.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page';
import { SuperHeroesPage } from './components/SuperHeroes.page';
import RQSuperHeroPage from './components/RQSuperHero.page';
import { ParallelQueriesPage } from './components/ParallelQueries.page';
import { DynamicParallelQueries } from './components/DynamicParallelQueries.page';
import { DependentQueries } from './components/DependentQueries.page';

const queryClient = new QueryClient();

function App() {
	return (
    <QueryClientProvider client={queryClient}>
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/super-heroes'>Traditional Super Heroes</Link>
						</li>
						<li>
							<Link to='/rq-super-heroes'>RQ Super Heroes</Link>
						</li>
						{/* <li>
							<Link to='/rq-parallel'>Parallel Queries</Link>
						</li>
						<li>
							<Link to='/rq-dynamic-parallel'>Dynamic Parallel Queries</Link>
						</li>
						<li>
							<Link to='/rq-dependent'>Dependent Queries</Link>
						</li> */}
					</ul>
				</nav>
				<div>
					<Routes>
						<Route path='/super-heroes' element={<SuperHeroesPage />} />
						<Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
						<Route path='/rq-super-heroes/:id' element={<RQSuperHeroPage />} />
						<Route path='/rq-parallel' element={<ParallelQueriesPage />} />
						<Route path='/rq-dynamic-parallel' element={<DynamicParallelQueries ids={[2, 4]} />} />
						<Route path='/rq-dependent/:id' element={<DependentQueries />} />
						<Route path='/' element={<HomePage />} />
					</Routes>
				</div>
			</div>
		</Router>
		<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
	);
}

export default App;
