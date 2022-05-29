
const res = require('express/lib/response');
const { User } = require('../../models');

const userCreate = async () => {
  res.json({message: 'User Created.'})
}

module.exports = {userCreate};