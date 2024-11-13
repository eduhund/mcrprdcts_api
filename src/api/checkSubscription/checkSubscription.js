import { getUser, updateUser } from "../../services/mongo/requests/index.js";

export default async function (req, res) {
  const { user_id, email, product_id } = req.query;

  if (!(user_id && product_id)) {
    res.sendStatus(400);
    return;
  }

  const user = await getUser({ "figma.userId": user_id });

  if (!user) {
    res.sendStatus(400);
    return;
  }

  const { products = [] } = user;
  const productState = products.find((product) => product.id === product_id);

  res.json({ access: Boolean(productState?.isActive) });

  if (email) {
    updateUser({
      query: { email },
      data: {
        $set: {
          figma: {
            userId: user_id,
          },
        },
      },
    });
  }
}
