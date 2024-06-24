const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  platform_id: process.env.PLATFORM_ID,
  integrator_id: process.env.INTEGRATOR_ID,
});

const preference = new Preference(client);

preference
  .create({
    body: {
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
    },
  })
  .then(console.log)
  .catch(console.log);

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Especifica los métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Especifica los encabezados permitidos
  })
);
app.use(bodyParser.json());
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
