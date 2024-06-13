const MercadoPago = "mercadopago";

// Configuración de Mercado Pago
const mercadopago = new MercadoPago({
  accessToken: process.env.ACCESS_TOKEN,
});

const createPreference = async (req, res) => {
  const { title, price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: title,
        unit_price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    ],
    back_urls: {
      success: `${process.env.APP_URL}/success`,
      failure: `${process.env.APP_URL}/failure`,
      pending: `${process.env.APP_URL}/pending`,
    },
    auto_return: "approved",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).send("Something went wrong");
  }
};
module.exports = createPreference;
