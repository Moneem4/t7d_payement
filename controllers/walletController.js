const WalletModel = require('../models/wallet.schema');

// update wallet with personal infos
exports.editWallet = async (req, res) => {
  const wallet = new WalletModel({
    _id: req.params.id,
    amount: req.body.amount,
    GD_amount: req.body.GD_amount,
    currency: req.body.currency,
    recharge_date: new Date(),
    card_number: req.body.card_number,
    card_expire_date: req.body.card_expire_date,
    saved: req.body.saved,
  });
  WalletModel.updateOne({ _id: req.params.id }, wallet)
    .then(() => {
      res.status(201).json({
        message: 'Success',
        data: wallet,
      });
      console.log(wallet);
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Failed',
        data: { errorMessage: 'Update process failed' },
      });
    });
};

// find wallet by ID
exports.findWalletById = async (req, res) => {
  try {
    const { id } = req.params;
    const walletExist = await WalletModel.findOne({ _id: id });
    if (!walletExist)
      res.status(401).json({
        message: 'Fialed',
        data: { errorMessage: 'Could not find a wallet with such ID' },
      });
    res.status(200).json({ message: 'Success', data: walletExist });
  } catch (error) {
    res.status(500).json({
      message: 'Failed',
      data: { errorMessage: 'Internal Server Error' },
    });
  }
};
