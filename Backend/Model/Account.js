const Model =  require("../connect/model");

module.exports = new class Account extends Model{
    constructor(){
        super('account','idAccount')
    }
}
