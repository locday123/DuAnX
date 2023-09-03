import { useEffect, useState } from "react";
import { getCategory } from '../../Service/Category/CategoryService'

function Category({ cats }) {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getCategory().then((value) => {
            setCategory(category)

        });
    }, [])
    console.log(category);
    return (
        <div>
            {category.map(cat => (
                <div>
                    <span key={cat.idCategory}>{cat.nameCategory}</span>

                </div>
            ))}
        </div>
    )
}

export default Category;