var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");

router.get('/', HomeController.index);
router.post('/users',UserController.create);
router.get('/users', UserController.findAll);
router.get('/users/:ID', UserController.buscarId);
router.get('/email/:Email', UserController.buscarEmail);
router.put('/users',UserController.edit);
router.delete('/users/:ID',UserController.remove);
router.post('/recuperaremail',UserController.gerarToken);
router.post('/changepassword',UserController.changePassword);
router.post('/login',UserController.login);

module.exports = router;