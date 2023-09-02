import { useEffect, useState } from "react";
import {getCategory} from '../../Service/Category/CategoryService'

function Category(){
    const [category, setCategory] = useState([])
    const getMenu = (category, idCategory) =>{
        var out = []
        for (var i in category) {
            
          if (category[i].rootCategory == idCategory) {
            
            var children = getMenu(category, category[i].idCategory)
            if (children.length) {
                category[i].childCategory = children
            }
            out.push(category[i])
          }
        }
        return out
    }
    useEffect(() => {
        getCategory().then((value) => {
            setCategory(getMenu(value,null))
            
        });
    }, [])
    console.log(category);
    return(
        <div>
            <span>abc</span>
        </div>
    )
}

export default Category;