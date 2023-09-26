const Model =  require("../connect/model");

module.exports = new class Product extends Model{
    constructor(){
        super('PRODUCT','idProduct')
    }
}
