const router = require('express').Router();
const { thoughtCreate, thoughtGetAll, thoughtGetById } = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .get(async (req, res) => {
      console.log(`${req.method}: ${req.baseUrl}`);
      // const {body} = req
      try {
        await thoughtGetAll(req, res)
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    })
  .post(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {body} = req
    try {
      await thoughtCreate({body}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

// /api/thoughts/:id
router.route('/:id')
  .get(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {params} = req
    try {
      await thoughtGetById({params}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

module.exports = router;