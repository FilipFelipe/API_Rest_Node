var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/users',UserController.create);
router.get('/users',AdminAuth, UserController.findAll);
router.get('/users/:ID',AdminAuth, UserController.buscarId);
router.get('/email/:Email',AdminAuth, UserController.buscarEmail);
router.put('/users',AdminAuth,UserController.edit);
router.delete('/users/:ID',AdminAuth,UserController.remove);
router.post('/recuperaremail',UserController.gerarToken);
router.post('/changepassword',UserController.changePassword);
router.post('/login',UserController.login);

module.exports = router;