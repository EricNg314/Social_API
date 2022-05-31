const router = require('express').Router();
const { 
  thoughtCreate, 
  thoughtGetAll, 
  thoughtGetById, 
  thoughtUpdateById,
  thoughtDeleteById } = require('../../controllers/thought-controller');
  const { 
    reactionCreate, 
    reactionDeleteById } = require('../../controllers/reaction-controller');

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
  .put(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {params, body} = req
    try {
      await thoughtUpdateById({params, body}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const { params } = req
    try {
      await thoughtDeleteById({ params }, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const {params, body} = req
    try {
      await reactionCreate({params, body}, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    console.log(`${req.method}: ${req.baseUrl}`);
    const { params, query } = req
    try {
      await reactionDeleteById({ params, query }, res)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  })



module.exports = router;