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

// GET /api/subscription-status
app.get('/api/subscription-status', (req, res) => {
  const { userId } = req.query;
  const subscription = subscriptions[userId];
  if (!subscription) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, subscription });
});

// POST /api/update-subscription
app.post('/api/update-subscription', (req, res) => {
  const { userId, newPlan, effectiveDate } = req.body;

  // Update or create subscription
  subscriptions[userId] = {
    userId,
    plan: newPlan,
    status: "active",
    effectiveDate
  };

  res.json({
    success: true,
    subscription: subscriptions[userId]
  });
});

// Start server locally (for testing)
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

