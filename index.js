const express = require('express');
const app = express();

app.use(express.json());

// Mock subscription data
let subscriptions = {
  USER_001: {
    userId: "USER_001",
    plan: "annual_spiritual",
    status: "active",
    expiresAt: "2026-06-05T00:00:00Z"
  }
};

// GET: Subscription Status
app.get('/api/subscription-status', (req, res) => {
  const { userId } = req.query;
  const subscription = subscriptions[userId];
  if (!subscription) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, subscription });
});

// POST: Update Subscription
app.post('/api/update-subscription', (req, res) => {
  const { userId, newPlan, effectiveDate } = req.body;
  subscriptions[userId] = {
    userId,
    plan: newPlan,
    status: "active",
    effectiveDate
  };
  res.json({ success: true, subscription: subscriptions[userId] });
});

// NEW: GET /api/update-subscription for browser preview
app.get('/api/update-subscription', (req, res) => {
  res.json({
    success: true,
    subscription: {
      userId: "USER_001",
      plan: "monthly_spiritual",
      status: "active",
      effectiveDate: "2025-07-01T00:00:00Z"
    }
  });
});

// Export for Vercel
module.exports = app;
