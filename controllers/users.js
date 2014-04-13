module.exports = function(app){
    var modelUser = app.models.users;

    return UserController = {
        createUser: function(req, res){
            var newUser = modelUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                country: req.body.country,
                city: req.body.city,
                photo: req.body.photo,
                fbId: req.body.fbId,
                fbAccessToken: req.body.fbAccessToken,
                fbData: req.body.fbData,
                why: req.body.why
            });
            var valid = req.body.email && req.username;
            if (valid){
                newUser.save();
                res.status(204).send('Usuario adicionado com sucesso');
            }else {
                res.status(400).send({data: "Username e email sao obrigatorios"});
            }
        },
        getAll: function(req, res){
            modelUser.find({}, function(err, users){
                if(users){
                    res.send(users);
                }else{
                    res.send('Ainda não há usuários cadastrados');
                }
            })
        },
        getById: function(req, res){
            modelUser.find({_id:req.params.id}, function(err, user){
                if(user){
                    res.send(user);
                }else{
                    res.send('Usuário não existe');
                }
            })
        },
        update: function(req, res){
            modelUser.find({_id:req.body.id}, function(err, user){
                if(user){
                    user.firstName = req.body.firstName;
                    user.lastName =  req.body.lastName;
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.country = req.body.country;
                    user.city = req.body.city;
                    user.photo = req.body.photo;
                    user.why = req.body.why;
                    user.save();
                    res.status(200).send({"message":"Usuário atualizado com sucesso."});
                }else{
                    res.status(400).send({"message":"Ocorreu um erro ao fazer update, tente novamente."});
                }
            })
        }
    }
};