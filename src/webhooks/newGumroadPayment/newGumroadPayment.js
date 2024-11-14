import { getProductByPaymentGateway } from "../../services/mongo/requests/getProduct/getProduct.js";
import {
  addUser,
  getUserByEmail,
  updateUser,
} from "../../services/mongo/requests/index.js";

export async function newGumroadPayment({
  short_product_id,
  email,
  subscription_id,
  sale_id,
  price,
  currency,
  sale_timestamp,
  ip_country,
  cancelled_at,
  custom_fields,
}) {
  const { id: productId } = await getProductByPaymentGateway(
    "gumroad",
    short_product_id
  );
  if (!productId) {
    throw new Error("Unknown product ID");
  }

  const firstName = custom_fields["First Name"];
  const lastName = custom_fields["Last Name"];

  const user = await getUserByEmail(email);

  if (!user) {
    await addUser({
      data: {
        email,
        firstName,
        lastName,
        products: [
          {
            id: productId,
            purchaseId: subscription_id || sale_id,
            start: sale_timestamp,
            isActive: true,
          },
        ],
        country: ip_country,
      },
    });
  } else {
    if (cancelled_at) {
      await updateUser({
        query: { email, "products.id": productId },
        data: {
          $set: {
            "products.$.isActive": false,
            "products.$.end": cancelled_at,
          },
        },
      });
    } else {
      await updateUser({
        query: { email, "products.id": { $ne: productId } },
        data: {
          $addToSet: {
            products: {
              id: productId,
              purchaseId: subscription_id || sale_id,
              start: sale_timestamp,
              isActive: true,
            },
          },
        },
      });
    }
  }

  return true;
}

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
