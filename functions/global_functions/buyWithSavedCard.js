const userCards = require('../../models/userCards');

exports.module = async function getCardsOrAdd(req, res) {
    return userCards.findById({ id: req.body.cardid }).exec().then(data => {
        if (data === null) {
            return 404
        } else {
            return data
        }
    }).catch(error => {
        return 500
    })
}

