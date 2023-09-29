import Account from '../pageContent/Account/Account';
import UpdateAccount from '../pageContent/Account/UpdateAccount/UpdateAccount';
import Category from '../pageContent/Category/Category';
import Home from '../pageContent/Home/Home';
import Menu from '../pageContent/Menu/MenuPage';
import Storage from '../pageContent/Storage/Storage';



const pulicRoutes = [
    { path: '/', component: Home },
    { path: '/account', component: Account },
    { path: '/account/edit/:name', component: UpdateAccount },
    { path: '/account/:name', component: Menu },
    { path: '/category', component: Category },
    { path: '/storage', component: Storage }

]

const privateRoutes = [

]

export { pulicRoutes, privateRoutes }