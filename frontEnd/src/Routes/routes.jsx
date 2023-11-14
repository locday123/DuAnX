import Account from '../pageContent/Account/Account';
import UpdateAccount from '../pageContent/Account/UpdateAccount/UpdateAccount';
import Category from '../pageContent/Category/Category';
import Home from '../pageContent/Home/Home';
import Menu from '../pageContent/Menu/MenuPage';
import AddProduct from '../pageContent/Product/AddProduct';
import Product from '../pageContent/Product/Product';
import Storage from '../pageContent/Storage/Storage';
import FileManager from '../pageContent/FileManager/FileManager';



const pulicRoutes = [
    { path: '/', component: Home },
    { path: '/account', component: Account },
    { path: '/account/edit/:name', component: UpdateAccount },
    { path: '/account/:name', component: Menu },
    { path: '/category', component: Category },
    { path: '/storage', component: Storage },
    { path: '/product', component: Product },
    { path: '/product/add', component: AddProduct },
    { path: '/file-manager', component: FileManager }

]

const privateRoutes = [

]

export { pulicRoutes, privateRoutes }