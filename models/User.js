var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const { response } = require("express");

class User {

    async new(Email, Password, Nome) {
        try {
            var hash = await bcrypt.hash(Password, 10);
            await knex.insert({ Email, Password: hash, Nome, Role: 0 }).table("Users");
        } catch (error) {
            console.log(error);
        }
    }
    async findEmail(Email) {
        try {
            var resultado = await knex.select("*").from("Users").where({ Email: Email });
            if (resultado.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async findAll() {
        try {
            var resultado = await knex.select(["ID", "Nome", "Email"]).table("Users");
            return resultado;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findById(ID) {
        try {
            var resultado = await knex.select(["ID", "Nome", "Email"]).table("Users").where({ ID: ID });
            return resultado;;
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async findByEmail(Email) {
        try {
            var resultado = await knex.select(["ID", "Nome", "Email"]).table("Users").where({ Email: Email });
            return resultado;;
        } catch (error) {
            console.log(error);
            return [];
        }
    }


}
module.exports = new User();