const users = require('./users-data')

exports.getUsers = (req, res) => {
  res.status(200); // 200 OK
  res.json(users)
}

exports.addUser = (usr, res) => {
    users.push(usr);
    res.json(users);
}