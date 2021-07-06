const express = require('express');
// const bodyParser = require('body-parser');

const { check } = require('express-validator');


const tasksControllers = require('../controllers/tasks-controllers');



const router = express.Router();










router.get('/:tid', tasksControllers.getTaskById);






router.get('/user/:uid', tasksControllers.getTasksByUserId);


router.post('/',
            [
            check('title')
            .not()
            .isEmpty(),
            check('description')
            .isLength({min: 10}),
            check('price')
            .not()
            .isEmpty()
         ],
          tasksControllers.createTask);


router.patch('/:tid',  [
  check('title')
  .not()
  .isEmpty(),
  check('description')
  .isLength({min: 5}),
  check('price')
  .not()
  .isEmpty()
], tasksControllers.updateTaskById);

router.delete('/:tid', tasksControllers.deleteTaskById);

module.exports = router;
