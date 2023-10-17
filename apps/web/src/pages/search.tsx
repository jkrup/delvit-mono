import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import SearchArticlesFeed from '@delvit/web/components/SearchArticlesFeed'

import Header from '../components/Header'
import PopularTopics from '../components/PopularTopics'

const SearchPage: NextPage = () => {
	const router = useRouter()

	const searchQuery = router.query.q as string

	return (
		<>
			<Head>
				<title>Search {searchQuery} | DLV</title>
				<meta name='description' content='DLV App' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<Header />
				<div className='pt-4 bg-zinc-700 min-h-screen'>
					<div className='grid grid-cols-3 gap-4 max-w-screen-xl mx-auto'>
						{/* Main SubSection */}
						<SearchArticlesFeed query={searchQuery} />

						{/* Right SubSection */}
						<div className='flex flex-col space-y-2'>
							{' '}
							{/* Col 2 */}
							{/* <TopContent /> */}
							<PopularTopics />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchPage
