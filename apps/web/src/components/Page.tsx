import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'

type Props = {
	title: string
} & React.PropsWithChildren & React.HTMLProps<HTMLDivElement>
export default function Page({ title, children, ...rest }: Props) {
	const router = useRouter()
	return (
		<div {...rest} className='bg-stone-50 min-h-screen'>
			<Head>
				<title>DLV | {title}</title>
        <meta name="description" content="DLV App" />
        <link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
      <div className='max-w-screen-xl m-auto px-4 xl:px-0 py-8'>
			{children}

      </div>
		</div>
	)
}
