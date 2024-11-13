export async function createNewUser(data) {
  await addUser({
    data: {
      email,
      products: [{ id: MATCH_ID[short_product_id] }],
      subscriptionId: subscription_id,
      subscribedAt: sale_timestamp,
      country: ip_country,
      isActive: true,
    },
  });
}
