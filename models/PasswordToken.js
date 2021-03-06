var knex = require("../database/connection");
const UserM = require("./User");
var bcrypt = require("bcrypt");

class PasswordToken{
    async createToken(Email){
        var usuario = await UserM.findByEmail(Email);
        
        if(usuario != undefined){
            try {
                var token = Date.now();
                await knex.insert({user_id: usuario.ID, used: 0, token: token}).table("ps_token"); 
                return {Status: true,token: token};
            } catch (error) {
                return {Status: false,err: error};
            }
            
        }else{
            return {Status: false,err: "O E-mail não existe no banco de dados"};
        }
    }

    async validate(token){
        try {
            var resultado = await knex.select().where({token: token}).table("ps_token");
            if (resultado.length > 0 ) {
                var tk = resultado[0];
                if (tk.used == 1){
                    return {Status:false, aqui: "o"};
                }else{
                    return {Status: true ,token: tk};
                }
            } else {
                return {Status:false};
            }
        } catch (error) {
            console.log(error);
            return {Status:false};
        }
    }

    async setUsed(token){
        await knex.update({used:1}).where({token: token}).table("ps_token");
    }
    async trocarPassword(newPassword, id, token) {
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({ Password: hash }).where({ ID: id }).table("Users");
        await this.setUsed(token);
    }
}

module.exports = new PasswordToken() 