// preferenceController.js
const mercadopago = require('mercadopago');
const config = require('../config');

mercadopago.configure({
  access_token: config.ACCESS_TOKEN,
});

const createPreference = async (req, res) => {
  const { title, price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: title,
        unit_price: parseFloat(price),
        quantity: parseInt(quantity),
      }
    ],
    back_urls: {
      success: `${config.APP_URL}/success`,
      failure: `${config.APP_URL}/failure`,
      pending: `${config.APP_URL}/pending`
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  createPreference
};
