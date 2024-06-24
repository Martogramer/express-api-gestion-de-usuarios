const { MercadoPagoConfig, Preference } = require("mercadopago");
const dotenv = require("dotenv");

//https://api.mercadopago.com/checkout/preferences

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  platform_id: process.env.PLATFORM_ID,
  integrator_id: process.env.INTEGRATOR_ID,
});
const preference = new Preference(client);

const body = {
  items: [
    {
      id: "1234",
      title: "Dummy Title",
      description: "Dummy description",
      picture_url: "http://www.myapp.com/myimage.jpg",
      category_id: "car_electronics",
      quantity: 1,
      currency_id: "BRL",
      unit_price: 10,
    },
  ],
  marketplace_fee: 0,
  payer: {
    name: "Test",
    surname: "User",
    email: "your_test_email@example.com",
    phone: {
      area_code: "11",
      number: "4444-4444",
    },
    identification: {
      type: "CPF",
      number: "19119119100",
    },
    address: {
      zip_code: "06233200",
      street_name: "Street",
      street_number: 123,
    },
  },
  back_urls: {
    success: "http://test.com/success",
    failure: "http://test.com/failure",
    pending: "http://test.com/pending",
  },
  differential_pricing: {
    id: 1,
  },
  expires: false,
  additional_info: "Discount: 12.00",
  auto_return: "all",
  binary_mode: true,
  external_reference: "1643827245",
  marketplace: "marketplace",
  notification_url: "http://notificationurl.com",
  operation_type: "regular_payment",
  payment_methods: {
    default_payment_method_id: "master",
    excluded_payment_types: [
      {
        id: "ticket",
      },
    ],
    excluded_payment_methods: [
      {
        id: "",
      },
    ],
    installments: 5,
    default_installments: 1,
  },
  shipments: {
    mode: "custom",
    local_pickup: false,
    default_shipping_method: null,
    free_methods: [
      {
        id: 1,
      },
    ],
    cost: 10,
    free_shipping: false,
    dimensions: "10x10x20,500",
    receiver_address: {
      zip_code: "06000000",
      street_number: 123,
      street_name: "Street",
      floor: "12",
      apartment: "120A",
    },
  },
  statement_descriptor: "Test Store",
};
const response = preference
  .create({ body })
  .then(console.log)
  .catch(console.log);

module.exports = response;
/* export const createPreference = async (req, res) => {
  const { id, name, description, imageUrl, quantity, price } = req.body;

  const preference = {
    items: [
      {
        id: id,
        title: name,
        description: description,
        picture_url: imageUrl,
        quantity: parseInt(quantity),
        unit_price: parseFloat(price),
      }
    ],
    back_urls: {
      success: `${process.env.APP_URL}/success`,
      failure: `${process.env.APP_URL}/failure`,
      pending: `${process.env.APP_URL}/pending`,
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
    console.log(response.body.id)
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).send('Something went wrong');
  }
}; */
