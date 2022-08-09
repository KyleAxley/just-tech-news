// dependacies
const router = require("express").Router();
const { User } = require("../../models");

//Create(post) Receive(get) Update(put) Delete(delete)

// GET /api/users
router.get("/", (req, res) => {
  //Access our User model and run .findAll() mehtod)
  User.findAll({
    attributes: {exclude:['password']}
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: req.params.id,
    }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//verification for user login
router.post('/login', (req, res) => {
  //expects {username: 'Lernantino', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!'});
      return;
    }
    // res.json({ user: dbUserData});
    // verify user
    const validPassword = dbUserData.checkPassWord(req.body.password);
    if(!validPassword) {
      res.status(400).json({ message: 'Incorrect password! '});
      return;
    }
    res.json({ user: dbUserData, message: 'You are not logged in!' });
  });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
  //if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id " });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json(err)
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err)
    })
    
});

module.exports = router;
