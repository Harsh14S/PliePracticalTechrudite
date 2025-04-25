import React, {memo, useMemo, useState} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';

import {useNavigation} from '@react-navigation/native';
import {ICONS} from '../../utils/assets/IconHelper';
import ButtonWrapper from '../button/ButtonWrapper';
import {createStyles} from './Styles';

interface eventCardProps {
  item: any;
  onPressFavorite?: () => void;
}

function EventCard({item, onPressFavorite = () => {}}: eventCardProps) {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const [loading, setLoading] = useState(true);

  function EventActionButton({
    onPress = () => {},
    source,
  }: {
    onPress?: () => void;
    source: ImageSourcePropType | undefined;
  }) {
    return (
      <ButtonWrapper style={styles.eventActionButton} onPress={onPress}>
        <Image source={source} style={styles.eventActionButtonIcon} />
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper style={styles.eventCardContainer}>
      {/* Event image */}
      <View style={styles.eventCardImageContainer}>
        <Image
          source={{uri: item.event_profile_img}}
          style={styles.eventCardImage}
        />
      </View>

      <View style={styles.eventCardDetailsContainer}>
        <View style={styles.eventCardUpperContainer}>
          {/* Event title */}
          <View style={styles.eventTitleContainer}>
            <Text style={styles.eventCardTitleText} numberOfLines={1}>
              {item.event_name}
            </Text>
            <ButtonWrapper onPress={() => {}}>
              <Image
                source={ICONS.arrow_right}
                style={styles.eventCardRightArrowIcon}
              />
            </ButtonWrapper>
          </View>
          {/* Event Venue details */}
          <View style={styles.eventCardVenueDetailsContainer}>
            {/* Event Date */}
            <Text style={styles.eventCardVenueDateText}>
              {item.readable_from_date} - {item.readable_to_date}
            </Text>
            {/* Event Place */}
            <Text style={styles.eventCardVenuePlaceText}>
              {item.city}, {item.country}
            </Text>
          </View>
          {/* Event Price */}
          <Text style={styles.eventCardPriceRangeText}>
            €{item.event_price_from} - €{item.event_price_to}
          </Text>
        </View>
        {/* Lower container */}
        <View style={styles.eventCardLowerContainer}>
          {/* Sub Events */}
          <View style={styles.eventCardSubEventContainer}>
            {item.danceStyles.map((style: any, index: number) => (
              <View key={index} style={styles.subEventContainer}>
                <Text style={styles.subEventNameText}>{style?.ds_name}</Text>
              </View>
            ))}
          </View>
          {/* Action Buttons */}
          <View style={styles.eventActionButtonContainer}>
            <EventActionButton source={ICONS.share} onPress={() => {}} />
            <EventActionButton
              source={
                item?.isFavorite === 0 ? ICONS.unfavorite : ICONS.favorite
              }
              onPress={onPressFavorite}
            />
          </View>
        </View>
      </View>
    </ButtonWrapper>
  );
}

export default memo(EventCard);
