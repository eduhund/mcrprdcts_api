import { Router } from "express";

import { USERS } from "../services/mongo/collections.js";

const webhook = Router();

webhook.post("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }
  switch (id) {
    case "lvuoig67rcoh": // Gumroad
      const { short_product_id, timestamp, ip_country, cancelled_at } =
        req.body;
      switch (short_product_id) {
        case "ttvvd": // Fixiq
          if (cancelled_at) {
            await USERS("Fixiq").findOneAndUpdate(
              { email },
              { $set: { isActive: false, canceledAt: cancelled_at } },
              { upsert: true }
            );
          } else {
            USERS.insertOne({
              email,
              subscriptionId: subscription_id,
              subscribedAt: sale_timestamp,
              country: ip_country,
              isActive: true,
            });
          }

          res.sendStatus(200);
          return;

        case "wjzmd": // Shlow
          if (cancelled_at) {
            await USERS("Shlow").findOneAndUpdate(
              { email },
              { $set: { isActive: false, canceledAt: cancelled_at } },
              { upsert: true }
            );
          } else {
            USERS.insertOne({
              email,
              subscriptionId: subscription_id,
              subscribedAt: sale_timestamp,
              country: ip_country,
              isActive: true,
            });
          }

          res.sendStatus(200);
          return;
      }

    default:
      res.sendStatus(400);
  }
});

export default webhook;

/*
{
  seller_id: 'bB15W3hXAIhyriC__t1gRQ==',
  product_id: 'u32Hl_4j3W9bP5fQwIyTzg==',
  product_name: 'Fixiq',
  permalink: 'fixiq',
  product_permalink: 'https://eduhund.gumroad.com/l/fixiq',
  short_product_id: 'yigpuc',
  email: 'nebel@eduhund.com',
  price: '120',
  gumroad_fee: '12',
  currency: 'usd',
  quantity: '1',
  discover_fee_charged: 'false',
  can_contact: 'true',
  referrer: 'direct',
  card: { visual: '', type: '', bin: '', expiry_month: '', expiry_year: '' },
  order_number: '223478607',
  sale_id: 'akGeF0vL8U0uOEiv3EAf4g==',
  sale_timestamp: '2024-08-28T16:12:32Z',
  purchaser_id: '6093095954623',
  test: 'true',
  'First Name': 'Roman',
  'Last Name': 'Nebyl',
  custom_fields: { 'First Name': 'Roman', 'Last Name': 'Nebyl' },
  ip_country: 'Montenegro',
  is_gift_receiver_purchase: 'false',
  refunded: 'false',
  resource_name: 'sale',
  disputed: 'false',
  dispute_won: 'false'
}
*/
