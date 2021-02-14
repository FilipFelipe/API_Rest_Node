var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");

router.get('/', HomeController.index);
router.post('/users',UserController.create);
router.get('/users', UserController.index);
router.get('/users/:ID', UserController.buscarId);
router.get('/users/email/:Email', UserController.buscarEmail);
module.exports = router;