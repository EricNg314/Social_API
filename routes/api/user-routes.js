const router = require('express').Router();
const { userCreate } = require('../../controllers/user-controller');

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  const {body} = req
  try {
    await userCreate({body}, res)
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

})

module.exports = router;