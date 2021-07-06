const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');


const Task =  require('../models/task');



const db = require('../util/database');

//
// let DUMMY_TASKS = [
//       {
//
//                 id: 't1',
//                 title: 'task 1',
//                 description: 'React authantication',
//                 price: '5000',
//                 creator: 'u1'
//
//
//
//       }
// ];


const getTaskById = (req, res, next) => {

        const taskId = req.params.tid;
        // const task = DUMMY_TASKS.find(t => t.id === taskId);

       Task.findByPk(taskId).then(t => {

                if (!t) {

                      return next(new HttpError('Could not find a task for this specific id!.', 404));


                }

            return res.json({task: t});

        }).catch(err => console.log(err));
        //
        // if (!task) {
        //
        //       throw new HttpError('Could not find a task for this specific id!.', 404);
        //
        //
        // }

        // db.execute('SELECT * FROM tasks WHERE id = ?', [taskId])
        // .then(result => {
        //   if (!result) {
        //
        //       next(new HttpError('Could not find a task for this specific id!.', 404));
        //
        //
        //   }
        //   // console.log(result);
        //   return res.status(200).json({task: result});
        // })
        // .catch(err => next(new HttpError('An error occured, please try again later', 422)));


        // res.json({task});


};



const getTasksByUserId = (req, res, next) => {

        const userId = req.params.uid;
        // const tasks = DUMMY_TASKS.filter(t => t.creator === userId);

        Task.findAll({
          where: {creator: `${userId}`}
        }).then(t => {

          console.log('tasks', t);
          if (!t || t.length === 0) {


                return next(
                  new HttpError('Could not find a tasks for this specific user id!.', 404)
                );


          }
          res.json({task: t[0]});
        }).catch(err => console.log(err));

                // if (!tasks || tasks.length === 0) {
                //
                //
                //       return next(
                //         new Error('Could not find a tasks for this specific user id!.', 404)
                //       );
                //
                //
                // }
        // res.json({tasks});


};

const createTask = (req, res, next) => {

    const errors = validationResult(req);

      if (!errors.isEmpty()) {

              throw new HttpError('Invalid inputs passed, Please check your data!.', 422);

      }

        const { title, description, price, creator } = req.body;


        const createTask = {


                    id: uuidv4(),
                    title,
                    description,
                    price,
                    creator,





        };

        req.user.createTask({

          id: `${createTask.id}`,
          title,
          description,
          price,
          creator,
        


        }).then(result =>  res.status(201).json({task: result})).catch(err => console.log(err));

        // db.execute('INSERT INTO tasks (id, title, description, price) VALUES (?, ?, ?, ?)', [createTask.id, createTask.title, createTask.description, createTask.price])
        // .then(result => res.status(201).json({task: createTask}))
        // .catch(err => new HttpError('An error occured, please try again later', 422));
        //

        //DUMMY_TASKS.push(createTask);




};

const updateTaskById = (req, res, next) => {

  const errors = validationResult(req);

    if (!errors.isEmpty()) {

            throw new HttpError('Invalid inputs passed, Please check your data!.', 422);

    }


  const { title, description, price } = req.body;

  const taskId = req.params.tid;




         Task.findByPk(taskId).then(t => {

                  if (!t) {

                        return next(new HttpError('Could not find a task for this specific id!.', 404));


                  }


                  t.title = title;
                  t.description = description;
                  t.price = price;
                  return t.save();



          }).then(result => {
            console.log(result);
            return res.json({task: result});
          }).catch(err => console.log(err));


  // const updatedTask = {...DUMMY_TASKS.find(t => t.id === taskId)};
  // const taskIndex = DUMMY_TASKS.findIndex(t => t.id === taskId);
  //
  // updatedTask.title = title;
  // updatedTask.description = description;
  // updatedTask.price = price;
  //
  // DUMMY_TASKS[taskIndex] = updatedTask;
  //
  // res.status(200).json({task: updatedTask});


};

const deleteTaskById = (req, res, next) => {

                  const taskId = req.params.tid;
                  Task.findByPk(taskId)
                  .then(t => {
                    if(!t) {

                        return next(new HttpError('Could not find a place for that id.!', 404));

                    }


                    return t.destroy();

                  })
                  .then(result => {

                    console.log('Destroyed task');
                    return res.status(200).json({message: 'delete Task'});
                  }).catch(err => console.log(err));


                  // if(!DUMMY_TASKS.find(t => t.id === req.params.tid)) {
                  //
                  //     throw new HttpError('Could not find a place for that id.!', 404);
                  //
                  // }
                  //
                  // DUMMY_TASKS = DUMMY_TASKS.filter(t => t.id !== req.params.tid);
                  //
                  // res.status(200).json({message: 'delete Task'});


};




exports.getTaskById = getTaskById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTaskById = updateTaskById;
exports.deleteTaskById = deleteTaskById;
