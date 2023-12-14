const handleRegister = (req, res, database, bcrypt) =>{
    const { email, password, name } =  req.body;
    console.log(email, password, name);
    if(!email || !password || !name)
        return  res.status(400).json('Blank field');
    const hash = bcrypt.hashSync(password);
    database.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user =>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}
