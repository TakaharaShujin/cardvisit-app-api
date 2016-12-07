module.exports = {
  home: function (request, response) {
    return response.json({ name: 'Carvisit App API', version: '1.0.0' });
  }
};
