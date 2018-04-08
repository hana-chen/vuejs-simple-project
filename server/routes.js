const express = require('express');
const router = express.Router();

const userService = require('./user.service');
const agendaService = require('./agenda/agenda.service');

router.get('/users', (req, res) => {
  userService.getUsers(req, res);
});

router.post('/user', (req, res) => {
  userService.postUser(req, res);
});

router.put('/user/:id', (req, res) => {
  userService.putUser(req, res);
});

router.delete('/user/:id', (req, res) => {
  userService.deleteUser(req, res);
});

//agenda
router.get('/agendas', (req, res) => {
  agendaService.getAgendas(req, res);
});

router.post('/agenda', (req, res) => {
  agendaService.postAgenda(req, res);
});

router.put('/agenda/:id', (req, res) => {
  agendaService.putAgenda(req, res);
});

router.delete('/agenda/:id', (req, res) => {
  agendaService.deleteAgenda(req, res);
});

module.exports = router;