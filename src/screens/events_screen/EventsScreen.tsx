import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import EventCard from '../../common/flatlist/EventCard';
import Header from '../../common/header/Header';
import {useTheme} from '../../context/ThemeContext';
import {fetchEvents} from '../../redux/slices/eventsSlice';
import {addFavorite, removeFavorite} from '../../redux/slices/favoritesSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {createStyles} from './Styles';

function EventsScreen() {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const dispatch = useDispatch<AppDispatch>();

  const eventsData = useSelector((state: RootState) => state.events);

  const {items: events, loading} = eventsData;
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const {token} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents(token || ''));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchEvents(token || ''));
  };

  const toggleFavorite = (item: any) => {
    const isAlreadyFavorite = favorites.some(
      fav => fav.event_id === item.event_id,
    );
    if (isAlreadyFavorite) {
      dispatch(removeFavorite(item.event_id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <EventCard
      item={item}
      onPressFavorite={() => {
        toggleFavorite(item);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={events}
        keyExtractor={(item, index) => `${item.event_id}${index}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loaderText}>Loading events...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EventsScreen;
