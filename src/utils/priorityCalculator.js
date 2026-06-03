const { TYPE_WEIGHT } = require("../config/constants");

function calculatePriority(notification) {
  const weight =
    TYPE_WEIGHT[notification.Type] || 0;

  const notificationTime =
    new Date(notification.Timestamp).getTime();

  const currentTime = Date.now();

  const ageInMinutes =
    (currentTime - notificationTime) /
    (1000 * 60);

  const freshnessScore =
    Math.max(0, 1000 - ageInMinutes);

  return weight + freshnessScore;
}

module.exports = {
  calculatePriority,
};