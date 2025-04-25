import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {FONTS} from '../../utils/ui/Fonts';
import {RFSize} from '../../utils/ui/UiHelper';

type props = {
  colors: ThemeColorType;
  insets: EdgeInsets;
};

const event_card_image_size = RFSize(90);
const event_card_image_radius = event_card_image_size * 0.1;
const event_card_title = event_card_image_size * 0.2;
const right_icon_size = event_card_title * 1.7;
const event_card_date = event_card_title * 0.8;
const event_card_price = event_card_date * 0.9;

export function createStyles({colors, insets}: props) {
  const {bottom, left, right, top} = insets;
  return StyleSheet.create({
    eventCardContainer: {
      flexDirection: 'row',
      backgroundColor: colors.theme_bg,
      borderRadius: RFSize(8),
      overflow: 'hidden',
    },
    eventCardImageContainer: {
      padding: RFSize(10),
      justifyContent: 'center',
    },
    eventCardImage: {
      width: event_card_image_size,
      height: event_card_image_size,
      borderRadius: event_card_image_radius,
    },
    eventCardDetailsContainer: {
      flex: 1,
    },
    eventCardUpperContainer: {
      flex: 1,
      gap: RFSize(5),
    },
    eventTitleContainer: {
      flexDirection: 'row',
    },
    eventCardTitleText: {
      flex: 1,
      fontSize: event_card_title,
      fontFamily: FONTS.semiBold,
      color: colors.common_txt_color,
      includeFontPadding: false,
      paddingTop: RFSize(16),
    },
    eventCardRightArrowIcon: {
      height: right_icon_size,
      width: right_icon_size,
      resizeMode: 'contain',
    },
    eventCardVenueDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eventCardVenueDateText: {
      fontFamily: FONTS.medium,
      fontSize: event_card_date,
      color: colors.common_highlighted_txt_color,
      includeFontPadding: false,
    },
    eventCardVenuePlaceText: {
      fontFamily: FONTS.regular,
      fontSize: event_card_price,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
    eventCardPriceRangeText: {
      fontFamily: FONTS.regular,
      fontSize: event_card_price,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
    eventCardLowerContainer: {
      flexDirection: 'row',
      gap: RFSize(5),
    },
    eventCardSubEventContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    subEventContainer: {
      paddingHorizontal: RFSize(8),
      paddingVertical: RFSize(5),
    },
    subEventNameText: {
      fontFamily: FONTS.medium,
      fontSize: event_card_date,
      color: colors.common_txt_color,
      includeFontPadding: false,
    },
    eventActionButtonContainer: {
      flexDirection: 'row',
      gap: RFSize(5),
    },
    eventActionButton: {
      height: RFSize(24),
      width: RFSize(24),
    },
    eventActionButtonIcon: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
  });
}
