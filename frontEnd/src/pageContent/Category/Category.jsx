import { useEffect, useState } from "react";
import { getCategory } from '../../Service/Category/CategoryService'

function Category() {
    const [category, setCategory] = useState([])
    const Tree = ({data}) => ( 
        <ul>
          {data && data.map(item => (
            <li>
              {item.nameCategory}
              {item.childCategory && <Tree data={item.childCategory} />}
            </li>
          ))}
        </ul>
      );
    useEffect(() => {
        getCategory().then((value) => {
            setCategory(value.category)
        });
    }, [])
    
    return (
        <div>
             <Tree data={category} />
        </div>
    )
}

export default Category;