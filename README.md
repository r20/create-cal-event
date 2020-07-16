# creat-cal-event
This sample repo creates a calendar and an event with an alarm.

With expo-calendar version 8.2.1 on Android when endTimeZone is not null, this crashes the app.
If endTimeZone is null, an error occurs preventing the event from being created.

An older version of expo-calendar allowed creating the event with endTimeZone null.

