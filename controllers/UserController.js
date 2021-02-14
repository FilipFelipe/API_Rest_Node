const User = require("../models/User");

class UserController {
    async findAll(req, res) {
        var usuarios = await User.findAll();
        res.json(usuarios);
    }
    async create(req, res) {
        var { Email, Nome, Password } = req.body;
        if (Email == undefined) {
            res.status(403);
            res.json({ err: "Erro no E-mail" });
            return;
        }
        var EmailExistente = await User.findEmail(Email);
        if (EmailExistente) {
            res.status(406);
            res.json({ err: "E-mail já cadastrado!!" });
        }
        await User.new(Email, Password, Nome);
        res.status(200);
        res.send("OK");
    }
    async buscarId(req, res) {
        var ID = req.params.ID;
        var findById = await User.findById(ID);
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
        var findByEmail = await User.findByEmail(Email);
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
        var resultado = await User.update(ID, Nome, Email, Role);
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
    async remove(req,res){
        var id = req.params.ID;
        var resultado  = await User.delete(id);
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

}
module.exports = new UserController();