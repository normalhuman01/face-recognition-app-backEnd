const handleSignIn = (req, res, database, bcrypt) =>{
    const { email, password } = req.body;
    database.select('email', 'hash').from('login').where('email', '=', email)
    .then(data =>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return database.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                console.log(user[0]);
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get user'))
        }
        else
            res.status(400).json('Wrong email or password');
    })
    .catch(err => res.status(400).json('Wrong email or password'));
}

module.exports = {
    handleSignIn: handleSignIn
}
