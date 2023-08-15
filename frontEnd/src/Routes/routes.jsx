import Account from '../pageContent/Account/Account';
import AddAccount from '../pageContent/Account/AccountAction/AddAccount/AddAccount';
import Home from '../pageContent/Home/Home';
import Menu from '../pageContent/Menu/MenuPage';



const pulicRoutes = [
    {path: '/', component: Home},
    {path: '/account', component: Account},
    {path: '/account/:name', component: Menu}   

]

const privateRoutes = [

]

export {pulicRoutes, privateRoutes}