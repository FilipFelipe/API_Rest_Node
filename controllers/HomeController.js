class HomeController{

    async index(req, res){
        res.send("Projeto de API no Node.js");
    }

}

module.exports = new HomeController();