const agendas = require('./agendas-data')

exports.getAgendas = (req, res) => {  
  res.status(200); // 200 OK
  res.json(agendas);
}

//update
exports.putAgenda = (req, res) => {  
    const originalAgenda = {
      id: parseInt(req.body.agenda.id, 10),
      title: req.body.agenda.title,
      description: req.body.agenda.description,
      start: req.body.agenda.start,
      end: req.body.agenda.end,
      appointmentPlace: req.body.agenda.appointmentPlace,
      appointmentPlaceX: req.body.agenda.appointmentPlaceX,
      appointmentPlaceY: req.body.agenda.appointmentPlaceY,
      userId: req.body.agenda.userId
    };
    var index = agendas.findIndex(u => u.id === originalAgenda.id);    
    var agenda = agendas.find(u => u.id === originalAgenda.id);    

    if(agenda.id > 0)
    {
      agenda.title = originalAgenda.title;
      agenda.description = originalAgenda.description;
      agenda.start = originalAgenda.start;
      agenda.end = originalAgenda.end;
      agenda.appointmentPlace = originalAgenda.appointmentPlace;
      agenda.appointmentPlaceX = originalAgenda.appointmentPlaceX;
      agenda.appointmentPlaceY = originalAgenda.appointmentPlaceY;
      agenda.userId = originalAgenda.userId;
      res.status(200).json(agendas);        
      console.log('Agenda updated successfully!');
    }  
}

//add new
exports.postAgenda = (req, res) => {
  const originalAgenda = {
    id: Math.floor((Math.random() * 1000) + 1),
    title: req.body.agenda.title,
    description: req.body.agenda.description,
    start: req.body.agenda.start,
    end: req.body.agenda.end,
    appointmentPlace: req.body.agenda.appointmentPlace,
    appointmentPlaceX: req.body.agenda.appointmentPlaceX,
    appointmentPlaceY: req.body.agenda.appointmentPlaceY,
    userId: req.body.agenda.userId
  };
  agendas.push(originalAgenda);
  res.status(201).json(agendas);  
}

//delete
exports.deleteAgenda = (req, res) => {  
  var id = parseInt(req.body.id, 10);  
  var index = agendas.findIndex(a => a.id === id);  
  agendas.splice(index, 1);  

  res.status(200).json(agendas);
}

exports.checkServerError = (res, error) => {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

exports.checkFound = (res, agenda) => {
  if (!agenda) {
    res.status(404).send('Agenda not found.');
    return;
  }
  return agenda;
}