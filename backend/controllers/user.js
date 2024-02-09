const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User =  require("../models/user");

exports.createUser = (req, res, next) => {

    // El número corresponde al nivel de seguridad de la clave
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Invalid authentication credentiales!'
                    })
                })
            

        })
};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
     User.findOne({ email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } 
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if(!result){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            // sign crea un nuevo token basado en los datos de entrada
            // token se conforma por header, payload y 
            const token = jwt.sign(
                // HEADER
                {email: fetchedUser.email, userId: fetchedUser._id},
                // Payload
                process.env.JWT_KEY,
                // configuración del token, js object
                {expiresIn: '1h'}
            );
            res.status(200).json({
                token: token, 
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid authentication credentiales!'
            });

        });
    }