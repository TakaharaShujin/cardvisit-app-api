const { Cards } = require('../lib/models');

module.exports = {
  index: function (request, response) {
    Cards.find(function (err, cards) {
      if (err) return response.json(err);
      return response.status(200).json({ data: cards });
    });
  },
  store: function (request, response, next) {
    let data = Object.assign(request.body, { status: 'active' });

    Cards.find({ email: request.body.email, phone: request.body.phone }, function (err, card) {
      if (err) return response.status(400).json({ message: err.errmsg });

      if (card.length > 0) {
        return response.status(400).json({ message: 'Bu kartvizit zaten kayıtlı!', data: card });
      }
      let newcard = new Cards(data);
      newcard.save(function (err, card) {
        if (err) return response.status(400).json({ message: err.errmsg });
        return response.json({ message: 'Yeni kartvizit eklendi!', data: card });
      });
    });
  },
  show: function (request, response) {
    Cards.find({ _id: request.params.card_id }, function (err, cards) {
      if (err) return response.status(400).json({ message: err.errmsg });
      return response.json(cards);
    });
  },
  update: function (request, response) {
    Cards.findByIdAndUpdate({ _id: request.params.card_id }, request.body, function (err, card) {
      if (err) return response.status(400).json({ message: err.errmsg });
      return response.json({ message: 'kartvizit güncellendi!', data: card });
    });
  },
  delete: function (request, response) {
    Cards.findByIdAndUpdate({ _id: card_id }, { status: 'deleted' }, function (err, card) {
      if (err) return response.status(400).json({ message: err.errmsg });
      return response.json({ message: 'Kartvizit silindi!', data: card });
    });
  }
};
