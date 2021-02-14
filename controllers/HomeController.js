class HomeController{

    async index(req, res){
        res.send("ds");
    }

}

module.exports = new HomeController();