
# Campus Notification System Design

## Overview

This project fetches notifications from the evaluation API and displays the top 10 notifications based on priority.

## Priority Logic
Priority is calculated using:

* Notification Type
* Recency

Weights used:

* Placement = 100
* Result = 60
* Event = 30

Newer notifications receive a higher freshness score.








## Process Flow

1. Authenticate and get access token.
2. Fetch notifications.
3. Calculate priority for each notification.
4. Sort notifications by priority.
5. Display top 10 notifications.

## Logging
Logging middleware is integrated to track:

* Authentication
* Notification fetching
* Priority calculation
* Errors
## Scalability

For larger datasets, a Min Heap of size 10 can be used instead of sorting all notifications repeatedly.











## Conclusion

The system successfully ranks notifications based on importance and recency while maintaining simple and scalable logic.
