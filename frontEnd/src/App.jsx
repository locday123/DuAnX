import React, { Fragment } from "react";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Login from "./AdminPage/LoginView";
import AdminPage from "./AdminPage/AdminPage";
import {pulicRoutes} from './Routes/routes';



function App (){
  return (
    <Router>
      <Routes>
        {
          pulicRoutes.map((route, index)=>{
            const Layout = route.layout  === null ? Fragment: AdminPage
            const Page = route.component
            return <Route
                        key={index} 
                        path={route.path} 
                        element={<Layout><Page/></Layout>}/>
          })
        }
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>

    
  )
}

export default App