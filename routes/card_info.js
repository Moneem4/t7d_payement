const express = require('express');
const router = express.Router();

const {
addcardInfo,
deleteOnecardInfo,
findCardByIdWallet,
updateOnecardInfo
  } = require("../controllers/cardInfoController");


//add Card from endpoint addOneCard getting Card as body
router.post('/addOneCard', addcardInfo);
//find Card by id
router.get('/findOne/:id', findCardByIdWallet);
//delete CardInfo getting id CardInfo as param
router.delete('/deleteOneCardInfo/:id', deleteOnecardInfo);

module.exports = router;
