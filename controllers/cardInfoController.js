const cardInfoModel = require('../models/card_info.schema');


// find wallet by ID
exports.findCardByIdWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const cardExist = await cardInfoModel.findOne({ id_wallet: id });
    if (!cardExist)
    return  res.status(401).json({
        message: 'Fialed',
        data: { errorMessage: 'Could not find a card with such ID' },
      });
    res.status(200).json({ message: 'Success', data: cardExist });
  } catch (error) {
    res.status(500).json({
      message: 'Failed',
      data: { errorMessage: 'Internal Server Error' },
    });
  }
};

exports.addcardInfo = async (req, res) => {
  try {
    const cardInfo = new cardInfoModel(req.body);
    const card  = await cardInfo.save();
    console.log(card)
    res.status(200).send({ message: "success", data: cardInfo });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "error",
      data: {
        errorMessage: error,
      },
    });
  }
};

// Update one cardInfo by id
exports.updateOnecardInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = Object.keys(req.body);
    const updates = {};
    // constructing dynamic query
    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(req.body)[i];
    }
    cardInfoModel.updateOne(
      {
        id_wallet : id,
      },
      {
        $set: updates,
      },
      function (err, success) {
        if (err) throw err;
        else {
          res.status(200).send({
            message: "update success",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server error .",
      error,
    });
    console.log(error);
  }
};

// Update a cardInfo record (islam)
// exports.updatecardInfo = async (req, res) => {
//   const cardInfo = new cardInfoModel({
//     _id: req.params.id,
//     // xp: req.body.xp,
//     // pro: req.body.pro,
//     // birth_date: req.body.birth_date,
//     // phone_number: req.body.phone_number,
//     // gender: req.body.gender,
//     // country_of_origin: req.body.country_of_origin,
//     // description: req.body.description,
//     // full_name: req.body.full_name,
//   });
//   cardInfoModel.updateOne({ _id: req.params.id }, cardInfo)
//     .then(() => {
//       res.status(201).json({
//         message: "cardInfo updated successfully!",
//         cardInfo,
//       });
//       console.log(cardInfo);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

// Delete one cardInfo by id
exports.deleteOnecardInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const cardInfoExist = await cardInfoModel.findOne({ id_wallet: id });
    if (!cardInfoExist) res.status(401).json("card dosen't exist");
    const response = await cardInfoExist.deleteOne({ _id: id });
    res.status(200).send({ message: "success", data: response });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error .",
      error,
    });
  }
};