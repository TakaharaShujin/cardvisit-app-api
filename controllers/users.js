const { User } = require('../lib/models');

module.exports = {
  login: function (req, res) {
    // User.find({ email: req.body.email, pass: req.body.password }, function (err, data) {
    // if (err) return res.json(err);
    // })
    if (req.body.email == 'demo@demo.com' && req.body.password == 'demodemo') {
      return res.json({ message: 'Giriş başarılı', token: 'sgl3R9qqgzNKkVSZQmx6OWnJ7GvLhx85' });
    } else {
      return res.status(404).json({ message: 'Kullanıcı doğrulanamadı!' });
    }
  },
  store: function (request, response) {
    User.find({ email: request.body.email, pass: request.body.password }, function (err, data) {
      if (data.length > 0) {
        return response.status(200).json({ message: 'Bu kullanıcı zaten kayıtlı!', data: data });
      }
      let user = {
        email: request.body.email,
        pass: request.body.password,
        status: 'active'
      };
      var newuser = new User(user);
      newuser.save(function (err, data_user) {
        if (err) {
          return response.status(422).json({ message: 'Ekleme Sırasında bir hata oluştu', error: err });
        }
        return response.json({ message: 'Yeni kullanıcı eklendi!', data: data_user });
      });

    });
  },
  update: function (request, response) {
    if (request.body.email) {
      return response.status(422).json({ message: 'Mail alanı eksik' });
    }
    if (request.body.password) {
      return response.status(422).json({ message: 'Şifre alanı eksik!' });
    }
    let ddata = {
      name: request.body.email,
      email: request.body.password
    };
    User.findByIdAndUpdate({ _id: request.params.user_id }, ddata, function (err, tank) {
      if (err) return response.status(304).json(err);
      return response.json({ message: 'Kullanıcı güncellendi!', data: tank });
    });
  },
  delete: function (request, response) {
    var user_id = request.params.user_id;
    if (user_id) {
      User.find({ _id: user_id }, function (err, cards) {
        if (err) return response.json(err);
        let ddata = {
          name: cards.name,
          email: cards.email,
          phone: cards.phone,
          company: cards.company,
          company_position: cards.company_position,
          status: 'Deleted'
        };
        User.findByIdAndUpdate({ _id: user_id }, ddata, function (err, tank) {
          if (err) return response.status(500).json(err);
          return response.json({ message: 'kullanıcı silindi!', data: tank });
        });
      });
    }
  }
};
