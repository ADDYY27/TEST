const {
  getAccessToken,
} = require("./services/authService");

const {
  fetchNotifications,
} = require("./services/notificationService");

const {
  calculatePriority,
} = require("./utils/priorityCalculator");

const {
  Log,
  setToken,
} = require("./services/loggingService");

async function startApplication() {
  try {
   
    const token = await getAccessToken();

   
    setToken(token);

    await Log(
      "backend",
      "info",
      "auth",
      "Authentication successful"
    );

  
    const data = await fetchNotifications(token);

    await Log(
      "backend",
      "info",
      "service",
      "Notifications fetched successfully"
    );

    
    const topNotifications = data.notifications
      .map((notification) => ({
        ...notification,
        priority: calculatePriority(notification),
      }))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 10);

    await Log(
      "backend",
      "info",
      "handler",
      `Calculated top ${topNotifications.length} notifications`
    );

    console.log("\nTop 10 Priority Notifications\n");

    console.table(
      topNotifications.map((notification) => ({
        Type: notification.Type,
        Message: notification.Message,
        Timestamp: notification.Timestamp,
        Priority: notification.priority.toFixed(2),
      }))
    );
  } catch (error) {
    console.error("Application Error:", error.message);

    try {
      await Log(
        "backend",
        "error",
        "handler",
        error.message
      );
    } catch (logError) {
      console.error("Logging failed");
    }
  }
}

startApplication();