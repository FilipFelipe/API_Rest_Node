var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var UserM = require("../models/User");
const PasswordTokenM = require("../models/PasswordToken");

var secret = "6yx8q[[Z_WV7wh]F4:)q/8tgG4sThQx5Af"; // CHANGE

class UserController {
    async findAll(req, res) {
        var usuarios = await UserM.findAll();
        res.json(usuarios);
    }
    async create(req, res) {
        var { Email, Nome, Password } = req.body;
        if (Email == undefined) {
            res.status(403);
            res.json({ err: "Erro no E-mail" });
            return;
        }
        var EmailExistente = await UserM.findEmail(Email);
        if (EmailExistente) {
            res.status(406);
            res.json({ err: "E-mail já cadastrado!!" });
        }
        await UserM.new(Email, Password, Nome);
        res.status(200);
        res.send("OK");
    }
    async buscarId(req, res) {
        var ID = req.params.ID;
        var findById = await UserM.findById(ID);
        if (findById == undefined) {
            res.status(404);
            res.json({ "Usuário:": "NULL" });
        } else {
            res.status(200);
            res.json({ findById });
        }

    }
    async buscarEmail(req, res) {
        var Email = req.params.Email;
        var findByEmail = await UserM.findByEmail(Email);
        if (findByEmail == undefined) {
            res.status(404);
            res.json({ "Usuário:": "NULL" });
        } else {
            res.status(200);
            res.json({ findByEmail });
        }

    }
    async edit(req, res) {
        var { ID, Nome, Email, Role } = req.body;
        var resultado = await UserM.update(ID, Nome, Email, Role);
        if (resultado != undefined) {
            if (resultado.Status) {
                res.send("Editado com sucesso");
                res.status(200);
            } else {
                res.status(406);
                res.send(resultado.err);
            }
        } else {
            res.status(406);
            res.send("Error no servidor");
        }
    }
    async remove(req, res) {
        var id = req.params.ID;
        var resultado = await UserM.delete(id);
        if (resultado != undefined) {
            if (resultado.Status) {
                res.send("Removido com sucesso");
                res.status(200);
            } else {
                res.status(406);
                res.send(resultado.err);
            }
        } else {
            res.status(406);
            res.send("Error no servidor");
        }

    }
    async gerarToken(req, res) {
        var Email = req.body.Email;
        var resultado = await PasswordTokenM.createToken(Email);
        if (resultado.Status) {
            
            res.status(200);
            res.send("Token: " + resultado.token);
        } else {
            res.status(406);
            res.send(resultado.err);
        }
    }
    async changePassword(req, res) {
        var token = req.body.token;
        var Password = req.body.Password;
        var isTokenValid = await PasswordTokenM.validate(token);
        if (isTokenValid.Status) {
            await PasswordTokenM.trocarPassword(Password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterado com sucesso!");
        } else {
            res.status(406);
            res.send("Token inválido!");
        }
    }
    async login(req, res) {
        var { Email, Password } = req.body;

        var usuario = await UserM.findByEmail(Email);
        if (usuario != undefined) {
            var resultado = await bcrypt.compare(Password, usuario.Password);
            if (resultado) {
                var tokenJWT = jwt.sign({ Email: usuario.Email, Role: usuario.Role }, secret);
                res.status(200);
                res.json({"Token": tokenJWT});
            }
            else {
                res.status(406);
                res.send("Senha inválida");
            }
            
        } else {
            res.status(404);
            res.json({ "resultado": resultado });
        }
    }


}
module.exports = new UserController();