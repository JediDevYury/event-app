import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEvent } from '@/utils/events';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import { defaultStyles } from '@/constants/Styles';
import { attendEvent, getAttendanceForEvent, cancelAttendance } from '@/utils/attendance';
import { useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '@/providers/AuthProvider';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tabBarHeight = useBottomTabBarHeight();
  const { getUserData } = useAuth();

  const queryClient = useQueryClient();
  const [attend, setAttend] = useState(false);

  const { data: event } = useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id!)
  });

  const { data: attendanceResponse } = useQuery({
    queryKey: ['attendance', id],
    queryFn: () => getAttendanceForEvent(id!)
  });

  useEffect(() => {
    if (attendanceResponse) {
      const userId = getUserData!()?.id;
      const user = attendanceResponse.attendance.find((a) => a.userId === userId);
      if (user) {
        setAttend(true);
      } else {
        setAttend(false);
      }
    }
  }, [attendanceResponse]);

  const attendMutation = useMutation({
    mutationFn: attendEvent,
    onSuccess: async (data) => {
      invalidateQueries();
    }
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAttendance,
    onSuccess: async (data) => {
      invalidateQueries();
    }
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['attendance']
    });

    queryClient.invalidateQueries({
      queryKey: ['events']
    });
  };

  const onAttendEvent = () => {
    attendMutation.mutate({ eventId: id!, status: 'Coming' });
  };
  const onCancelAttendance = () => {
    cancelMutation.mutate(id!);
  };

  return (
   <ScrollView
    style={{ flex: 1 }}
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={{ paddingBottom: tabBarHeight }}
   >
     {event && (
      <>
        <Stack.Screen
         options={{
           headerTitle: event.title
         }}
        />
        <Image source={{ uri: event.image }} style={{ width: '100%', height: 250 }} />
        <View style={{ padding: 20, gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="calendar" size={24} color={Colors.orange} />
            <Text style={{ marginLeft: 10 }}>{format(event.start, 'MMMM do, yyyy H:mma')}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person-circle-outline" size={24} color={Colors.orange} />
            <Text style={{ marginLeft: 10 }}>Created by: {event.user?.name}</Text>
          </View>
          {attendanceResponse && (
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Ionicons name="people-outline" size={24} color={Colors.orange} />
             <Text style={{ marginLeft: 10 }}>
               {attendanceResponse.attendance.length} people are coming to this event.
             </Text>
           </View>
          )}

          <Text style={styles.description}>{event.description}</Text>

          {attend ? (
           <TouchableOpacity style={defaultStyles.button} onPress={onCancelAttendance}>
             <Text style={defaultStyles.buttonText}>I won't come</Text>
           </TouchableOpacity>
          ) : (
           <TouchableOpacity style={defaultStyles.button} onPress={onAttendEvent}>
             <Text style={defaultStyles.buttonText}>Reserve my seat</Text>
           </TouchableOpacity>
          )}
        </View>
      </>
     )}
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 16,
    lineHeight: 24
  }
});
export default Page;
