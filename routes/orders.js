const router = require("express").Router();
const User = require("../model/User");

router.patch("/buy", async (req, res) => {
  let update = await User.updateOne(
    { email: req.body.email },
    { $push: { transactions: req.body.products } }
  );
  let user = await User.findOne({ email: req.body.email });

  user = {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    transactions: user.transactions,
  };
  res.send(user);
});

router.patch("/cancel", async (req, res) => {
  let update = await User.updateOne(
    { "transactions.renderId": req.body.id },
    {
      $set: {
        "transactions.$.cancelled": true,
      },
    }
  );
  let user = await User.findOne({ email: req.body.email });

  user = {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    transactions: user.transactions,
  };
  res.send(user);
});

module.exports = router;
