const router = require('express').Router();
const { 
  userCreate, 
  userGetAll, 
  userGetById, 
  userUpdateById, 
  userDeleteById } = require('../../controllers/user-controller');

// /api/users
router.route('/')
  .get(async (req, res) => {
      console.log(`${req.method}: ${req.baseUrl}`);
      // const {body} = req
      try {
        await userGetAll(req, res)
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }

    })
  .post(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {body} = req
    try {
      await userCreate({body}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

// /api/users/:id
router.route('/:id')
  .get(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {params} = req
    try {
      await userGetById({params}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })
  .put(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {params, body} = req
    try {
      await userUpdateById({params, body}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const { params } = req
    try {
      await userDeleteById({ params }, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

module.exports = router;