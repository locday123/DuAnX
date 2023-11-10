const Product_SEO = [
    { nameInput: 'urlProduct', placehoder: 'Vui lòng nhập URL Sản phẩm', labelInput: 'URL Sản phẩm', typeInput: 'text' },
    { nameInput: 'metaTitle', placehoder: 'Vui lòng nhập Meta Title', labelInput: 'Meta Title', typeInput: 'text' },
    { nameInput: 'metaDescription', placehoder: 'Vui lòng nhập Meta Description', labelInput: 'Meta Description', typeInput: 'text' },
    { nameInput: 'metaKeyword', placehoder: 'Vui lòng nhập từ khóa', labelInput: 'Meta Keyword', typeInput: 'text' },
]

const Product_INFO = [
    { nameInput: 'nameProduct', placehoder: 'Vui lòng nhập tên Sản phẩm', labelInput: 'Tên Sản phẩm', typeInput: 'text' },
    { nameInput: 'idStorage', placehoder: 'Vui lòng chọn dung lượng', labelInput: 'Dung lượng', typeInput: 'select' },
    { nameInput: 'priceProduct', placehoder: 'Vui lòng nhập Giá sản phẩm', labelInput: 'Giá Sản phẩm', typeInput: 'number' },
    { nameInput: 'priceThrough', placehoder: 'Vui lòng nhập Giá thị trường', labelInput: 'Giá thị trường', typeInput: 'number' },
]

const Product_REVIEW = [
    { nameInput: 'productBox', placehoder: 'Thông tin của máy Box / Unbox', labelInput: 'Sản phẩm có gì ?', typeInput: 'text' },
    { nameInput: 'shortDescription', placehoder: 'Vui lòng nhập Mô rả ngắn', labelInput: 'Mô tả ngắn', typeInput: 'text' },
    { nameInput: 'reviewArticle', placehoder: 'Vui lòng soạn bài viết đánh giá', labelInput: 'Bài viết đánh giá', typeInput: 'text' },
]
const Product_CHECKVALIDATION = (data) => {
    console.log(data["idStorage"].length > 0);
    if (data["nameProduct"].length > 0 && data["urlProduct"].length > 0 && data["idStorage"] > 0 && data["idCategory"] > 0) {
        return true
    }
    return false
}



export {Product_SEO, Product_INFO, Product_REVIEW, Product_CHECKVALIDATION}