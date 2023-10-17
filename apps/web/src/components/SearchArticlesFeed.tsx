import { trpc } from '../utils/trpc'
import Article from './FeedArticle'

interface SearchArticlesFeedProps {
	query: string
}

const SearchArticlesFeed: React.FC<SearchArticlesFeedProps> = ({ query }) => {
	// const articlesData = trpc.useQuery(['article.searchArticles', { query }]);
	//
	// if (articlesData.isLoading || !articlesData.data) {
	//   return (
	//     <div className="col-span-2 flex flex-col space-y-4">
	//       {Array(10).fill(0).map((_, i) => {
	//         return (
	//           <div key={i} className="bg-white rounded-md h-40 animate-pulse"> </div>
	//         )
	//       })}
	//     </div>
	//   )
	// }
	//
	// const articles = articlesData.data;
	// return (
	//   <div className="col-span-2 flex flex-col space-y-4">
	//     {articles.map(article => {
	//       // const url = `/articles/${article.id}`;
	//       // const postedByName = article.postedBy.name
	//       // const postedAt = article.postedAt.toDateString()
	//       return (
	//         <Article
	//           key={article.id}
	//           url={`/articles/${article.id}`}
	//           postedByName={article.postedBy.name ?? article.postedBy.id}
	//           postedAt={article.postedAt.toDateString()}
	//           title={article.title}
	//           imgSrc={article.imgSrc ?? undefined}
	//           parentArticlesCount={article._count.parentArticles}
	//           commentsCount={article._count.comments}
	//           views={article.views}
	//           body={article.body}
	//         />
	//       )
	//     })}
	//   </div>
	// )
	return null
}
export default SearchArticlesFeed
