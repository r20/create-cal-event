import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';

export default function App() {

  const [msg, setMsg] = React.useState('hi');

  const createCalendar = async () => {
    setMsg('Need to check calendar permission');
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      console.log('Here are all your calendars:');
      console.log({ calendars });

      let calendarSource = calendars[0].source;

      setMsg('Creating Example Calendar and event');

      const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSourceAsync()
          : { isLocalAccount: true, name: 'My Example Calendar' };


      const newCalendarId = await Calendar.createCalendarAsync({
        title: 'Example Calendar',
        color: 'red',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'Example Calendar',
        ownerAccount: 'personal',
        isVisible: true,
        isSynced: true,
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });

      let startDate = new Date();
      startDate.setDate(startDate.getDate() + 3);
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + 4);

      console.log('New cal id: ', newCalendarId);
      let exampleEvent = {
        title: 'Example event',
        alarms: [{ relativeOffset: 9 * 60, method: Calendar.AlarmMethod.ALERT }],
        notes: 'note',
        startDate: startDate,
        endDate: endDate,
        timeZone: Localization.timezone,
        endTimeZone: Localization.timezone, // Setting endTimeZone Localization.timezone crashes app
        /* Setting endTimeZone to null used to work on an older expo-calendar, but with 8.2.1 it causes an error.
         Note that it's good to support null because that's how the objects appear that are created by the default calendar app.
         If an expo app wants to query and clone an all day event created with the default calendar app it would have endTimeZone: null. */
      };
      console.log('Creating new event:');
      await Calendar.createEventAsync(newCalendarId, exampleEvent)

      setMsg("Event created");


    } else {
      console.warn('Calendar access not granted');
    }
  };

  React.useEffect(() => {
    createCalendar();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
