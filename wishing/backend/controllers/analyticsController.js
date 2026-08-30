const mongoose = require("mongoose");
const analyticsService = require("../services/analyticsService");

// POST /api/analytics/track
exports.trackEvent = async (req, res, next) => {
  try {
    const {
      visitorId,
      sessionId,
      pageInstanceId,

      referrer,
      entryType,
      url,

      userAgent,
      screen,

      event,
      meta,
      timestamp
    } = req.body;

    if (!visitorId || !sessionId || !pageInstanceId || !event || !timestamp) {
      return res.status(400).json({
        message: "Missing required analytics fields"
      });
    }

    // Skip database persistence if not connected to MongoDB
    if (mongoose.connection.readyState !== 1) {
      return res.sendStatus(200);
    }

    await analyticsService.createEvent({
      visitorId,
      sessionId,
      pageInstanceId,

      referrer,
      entryType,
      url,

      userAgent,
      screen,

      event,
      meta,
      timestamp
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// GET /api/analytics/session/:id
exports.getSessionTimeline = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const data = await analyticsService.getSessionTimeline(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// GET /api/analytics/visitor/:id
exports.getVisitorHistory = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const data = await analyticsService.getVisitorHistory(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
