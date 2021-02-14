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
            if (resultado.length > 0) {
                return resultado[0];
            }else{
                return undefined;
            }
            
        } catch (error) {
            console.log(error);
            return undefined;;
        }
    }
    async findByEmail(Email) {
        try {
            var resultado = await knex.select(["ID", "Nome", "Email"]).table("Users").where({ Email: Email });
            if (resultado.length > 0) {
                return resultado[0];
            }else{
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async update(ID,Nome,Email,Role){
        var user = await this.findById(ID);
        if (user != undefined){
            var editUser ={};
            if(Email != undefined){
                if(Email !=user.Email){
                    var result = await this.findEmail(Email);
                    if(result == false){
                        editUser.Email = Email;
                    }
                    else{
                        return{Status: false,err:"Email já cadastrado"}
                    }
                }
            }
            if (Nome != undefined){
                editUser.Nome = Nome;
            }
            if (Role != undefined){
                editUser.Role = Role;
            }
            try {
                console.log("Alterando usuário");
                await knex.update(editUser).where({ID: ID}).table("Users");
                return {Status: true}
            } catch (error) {
                console.log(error);
                console.log("Erro na alteração");
                return{Status: false,err:error}
            }
            
        }else{
            return{Status: false,err:"O usuário não cadastrado"}
        }
    }
    async delete(ID){
        var user = await this.findById(ID);
        if (user != undefined) {
            try {
                await knex.delete().where({ID: ID}).table("Users");
                return{Status: true};
            } catch (error) {
                return{Status: false,err: error};
            }
        } else {
            return{Status: false,err: "O usuário não existe no banco de dados!"};
        }
    }
}
module.exports = new User();