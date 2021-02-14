const User = require("../models/User");

class UserController {
    async index(req, res) {
        var usuarios = await User.findAll();
        res.json(usuarios);
    }
    async create(req, res) {
        var { Email, Nome,Password } = req.body;
        if (Email == undefined) {
            res.status(403);
            res.json({err:"Erro no E-mail"});
            return;
        }
        var EmailExistente = await User.findEmail(Email);
        if (EmailExistente){
            res.status(406);
            res.json({err:"E-mail já cadastrado!!"});
        }
        await User.new(Email,Password,Nome);
        res.status(200);
        res.send("OK");
    }
    async buscarId(req, res) {
        var ID = req.params.ID;
        var findById = await User.findById(ID);
        res.status(200);
        res.json({findById});
    }
    async buscarEmail(req, res) {
        var Email = req.params.Email;
        var findByEmail = await User.findByEmail(Email);
        res.status(200);
        res.json({findByEmail});
    }

}
module.exports = new UserController();