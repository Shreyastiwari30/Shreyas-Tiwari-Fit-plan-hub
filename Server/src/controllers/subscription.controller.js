const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

exports.subscribePlan = async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const alreadySubscribed = await Subscription.findOne({
      user: req.user.id,
      plan: planId
    });

    if (alreadySubscribed) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const subscription = await Subscription.create({
      user: req.user.id,
      plan: planId
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
      .populate("plan");

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
