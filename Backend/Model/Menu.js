const Model =  require("../connect/model");

module.exports = new class Menu extends Model{
    constructor(){
        super('MENU','linkMenu')
    }
}
