const Model =  require("../connect/model");

module.exports = new class Storage extends Model{
    constructor(){
        super('STORAGE','idStorage')
    }
}
