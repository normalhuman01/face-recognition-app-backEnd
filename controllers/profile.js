const handleProfile = (req, res, database) =>{
    const { id } = req.params;
    database.select('*').from('users').where({id})
    .then(user =>{
        if(user.length)
            res.json(user[0])
        else
            res.status(400).json('User not found');
    })
    .catch(err => res.status(400).json('Something went wrong'));
}

module.exports = {
    handleProfile: handleProfile
}
