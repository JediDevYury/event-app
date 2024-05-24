import Colors from '@/constants/Colors';
import { getEvents, Event } from '@/utils/events';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10
  },
  cardContainer: {
    padding: 10,
    gap: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 14
  },
  cardImage: { width: '100%', height: 140 },
  createNewEventButton: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5
  }
});

const EventsList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const tabBarHeight = useBottomTabBarHeight();

  const {isPending, data: eventResponse} = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents()
  });

  const onReloadList = () => {
    queryClient.refetchQueries({queryKey: ['events']});
  }

  const renderCardEvent: ListRenderItem<Event> = ({item}) => {
    return (
     <Link href={`/events/${item.id}`} asChild>
       <TouchableOpacity style={styles.card}>
         {item.image ? (<Image source={{uri: item.image}} style={styles.cardImage} />) : (
          <View
           style={{
             width: '100%',
             height: 140,
             backgroundColor: Colors.background,
             justifyContent: 'center',
             alignItems: 'center'
           }}
          >
            <Text style={{ color: '#888' }}>No image</Text>
          </View>
         )}
         <View style={styles.cardContainer}>
           <Text style={styles.cardTitle}>{item.title}</Text>
           <Text style={styles.cardDescription}>{
             item.description.length > 50 ? `${
             item.description.slice(0, 50)}...` : item.description
           }
           </Text>
         </View>
       </TouchableOpacity>
     </Link>
    );
  }

  return (
   <View>
    {isPending && (<ActivityIndicator size="small" color={Colors.primary} />)}
    <FlatList
      contentContainerStyle={{ padding: 14, paddingBottom: tabBarHeight }}
      data={eventResponse?.events}
      renderItem={renderCardEvent}
      keyExtractor={(item) => item.id!}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onReloadList}
          colors={[Colors.primary]}
        />
      }
    />
     {/* FAB */}
     <Link href="/(auth)/(modals)/new" style={{ position: 'absolute', bottom: tabBarHeight + 20, right: 20 }} asChild>
       <TouchableOpacity style={styles.createNewEventButton}>
          <Text style={{ color: Colors.white, fontSize: 24 }}>+</Text>
       </TouchableOpacity>
     </Link>
   </View>
  )
};

export default EventsList;
