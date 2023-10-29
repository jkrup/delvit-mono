import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
					rel='stylesheet'
				/>

        {/* pwa configs */}
				<meta name='application-name' content='delvit' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='delvit' />
				<meta name='description' content='The best truth finding and survey platform ever made' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='msapplication-config' content='/icons/browserconfig.xml' />
				<meta name='msapplication-TileColor' content='#ae8b3b' />
				<meta name='msapplication-tap-highlight' content='no' />
				<meta name='theme-color' content='#000000' />

				<link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
				<link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
				<link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
				<link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

				<link rel='icon' type='image/png' sizes='32x32' href='/favicon.ico' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon.ico' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#ae8b3b' />
				<link rel='shortcut icon' href='/favicon.ico' />

				<meta name='twitter:card' content='summary' />
				<meta name='twitter:url' content='https://app.delvit.org' />
				<meta name='twitter:title' content='delvit' />
				<meta name='twitter:description' content='The best truth finding and survey platform ever made' />
				<meta name='twitter:image' content='https://app.delvit.org/icons/icon-192x192.png' />
				<meta name='twitter:creator' content='@DavidWShadow' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='delvit' />
				<meta property='og:description' content='The best truth finding and survey platform ever made' />
				<meta property='og:site_name' content='delvit' />
				<meta property='og:url' content='https://app.delvit.org' />
				<meta property='og:image' content='https://app.delvit.org/icons/apple-touch-icon.png' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
