import Security from "../securityUtils/security.JS";

exports.decrypt = (req, res, next) => {
    req.setTimeout(4500000);

    const original = process.env.SECRET_KEY_FILE;
    const name = req.params.name;

    Security.decryptFile("./public/", name, original).then(function(results) {
        next()
    });
}