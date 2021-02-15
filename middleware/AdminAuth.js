var jwt = require("jsonwebtoken");
var secret = "6yx8q[[Z_WV7wh]F4:)q/8tgG4sThQx5Af";

module.exports = function (req, res, next) {

    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        try {
            var decoded = jwt.verify(token,secret);
            if (decoded.Role == 1) {
                next();
            } else {
                res.status(403);
                res.send("Sem permissão");
                return; 
            }
        } catch (error) {
            res.status(403);
        res.send("Sem permissão");
        return;
        }

    } else {
        res.status(403);
        res.send("Usuário não autenticado");
        return;
    }
}