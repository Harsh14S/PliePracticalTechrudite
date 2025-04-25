import React, {useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';

import {useDispatch, useSelector} from 'react-redux';
import EventCard from '../../common/flatlist/EventCard';
import Header from '../../common/header/Header';
import {addFavorite, removeFavorite} from '../../redux/slices/favoritesSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {createStyles} from './Styles';

function FavoritesScreen() {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const dispatch = useDispatch<AppDispatch>();

  // favorites store data
  const favorites = useSelector((state: RootState) => state.favorites.items);

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

  const renderItem = ({item}: {item: any}) => {
    return (
      <EventCard
        item={item}
        onPressFavorite={() => {
          toggleFavorite(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={favorites}
        keyExtractor={item => `${item.event_id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorite events yet.</Text>
        }
      />
    </View>
  );
}

export default FavoritesScreen;
