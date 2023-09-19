const Model =  require("../connect/model");

module.exports = new class Category extends Model{
    constructor(){
        super('CATEGORY','idCategory')
    }
}
