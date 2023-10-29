import BottomTab from '@/components/mobile/partials/BottomTab'
import NavBar from '@/components/mobile/partials/NavBar'
import PageHeader from '@/components/mobile/partials/PageHeader'
import Header from '@/components/webview/Header'
import PopularTopics from '@/components/webview/PopularTopics'
import RecentConsensus from '@/components/webview/RecentConsensus'
import SearchArticlesFeed from '@/components/webview/SearchArticlesFeed'
import TrendingPosts from '@/components/webview/TrendingPosts'
import TrendingTopics from '@/components/webview/TrendingTopics'
import { useViewPort } from '@/hooks/useViewPort'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SearchPage: NextPage = () => {
	const router = useRouter()
	const { width } = useViewPort()
	const searchQuery = router.query.q as string

	return (
		<>
			<Head>
				<title>Search {searchQuery} | HSTK</title>
				<meta name='description' content='HSTK App' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{width > 992 ? (
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
			) : (
				<>
					<div className='h-screen bg-white'>
						<Header />
					</div>
					<BottomTab />
				</>
			)}
		</>
	)
}

export default SearchPage
