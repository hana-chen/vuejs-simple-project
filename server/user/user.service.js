const users = require('./users-data')

exports.getUsers = (req, res) => {  
  res.status(200); // 200 OK
  res.json(users);
}

//update
exports.putUser = (req, res) => {  
    const originalUser = {
      id: parseInt(req.body.user.id, 10),
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      phoneNumber: req.body.user.phoneNumber,
      address: req.body.user.address,
    };
    var index = users.findIndex(u => u.id === originalUser.id);    
    var user = users.find(u => u.id === originalUser.id);    

    if(user.id > 0)
    {
      user.firstName = originalUser.firstName;
      user.lastName = originalUser.lastName;
      user.email = originalUser.email;
      user.phoneNumber = originalUser.phoneNumber;
      user.address = originalUser.address;
      res.status(200).json(users);        
      console.log('User updated successfully!');
    }  
}

//add new
exports.postUser = (req, res) => {
  const originalUser = {
    //id: parseInt(req.params.id, 10),
    id: Math.floor((Math.random() * 1000) + 1),
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    phoneNumber: req.body.user.phoneNumber,
    address: req.body.user.address
  };

  users.push(originalUser);
  res.status(201).json(users);
}

exports.deleteUser = (req, res) => {    
  var id = parseInt(req.body.id, 10);  
  var index = users.findIndex(u => u.id === id);  
  users.splice(index, 1);

  res.status(200).json(users);
}

exports.checkServerError = (res, error) => {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

exports.checkFound = (res, user) => {
  if (!user) {
    res.status(404).send('User not found.');
    return;
  }
  return user;
}