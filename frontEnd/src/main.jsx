import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './Context'


import GlobalStyles from './components/GlobalStyles'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <GlobalStyles>
      
          <App/>
      
      
    </GlobalStyles>
  </ContextProvider>
)
