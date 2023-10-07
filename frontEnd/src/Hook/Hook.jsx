
const slugify = (str) => {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}
const TreeCategory = (category, idCategory) => {
    var out = []
    for (var i in category) {

        if (category[i].rootCategory == idCategory) {

            var children = TreeCategory(category, category[i].idCategory)
            if (children.length) {
                category[i].childCategory = children
            }
            category[i].key = category[i].idCategory
            out.push(category[i])
        }
    }
    return out
}

const getParent = (category, idCategory) => {
    var out = []
    for (var i in category) {
        if (category[i].idCategory == idCategory)
        {
            var parent = getParent(category, category[i].rootCategory)
            if (parent.length) {
                category[i].parentChild = parent
            }
            out.push(category[i])
        }
    }
    return out
}

const getCategoryByProduct = (categoryEndCode, idCategory) => {
    var out = []
    for (var i in categoryEndCode) {
       
            out.push(categoryEndCode[i].nameCategory)
            getCategoryByProduct(categoryEndCode[i].parentChild, categoryEndCode[i].rootCategory)
    }
    return out
}


export { slugify, TreeCategory, getParent,getCategoryByProduct }