import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StateProvider } from 'react-redux'
import { Provider as GraphQLProvider, createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import { store } from './redux/store'
import './index.scss'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-notifications/lib/notifications.css'
import 'intro.js/introjs.css'
import 'animate.css'
import './i18n'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import * as serviceWorker from './serviceWorker'

const rootElement = document.getElementById("root"),
    client = createClient({
        url: process.env.REACT_APP_API_PATH,
        exchanges: [
            dedupExchange,
            // Replace the default cacheExchange with the new one
            cacheExchange({
                /* config */
            }),
            fetchExchange
        ],
    })

const app = <ErrorBoundary><StateProvider store={store}> <GraphQLProvider value={client}> <App /> </GraphQLProvider> </StateProvider></ErrorBoundary>

ReactDOM.render(app, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
