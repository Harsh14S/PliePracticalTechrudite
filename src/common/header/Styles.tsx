import {StyleSheet} from 'react-native';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {FONTS} from '../../utils/ui/Fonts';
import {FONT_SIZE, RFSize} from '../../utils/ui/UiHelper';

type props = {
  colors: ThemeColorType;
};

export function createStyles({colors}: props) {
  return StyleSheet.create({
    headerContainer: {
      paddingTop: RFSize(10),
      paddingBottom: RFSize(20),
      paddingHorizontal: RFSize(40),
      gap: RFSize(6),
    },
    headerProfileNameText: {
      fontFamily: FONTS.semiBold,
      fontSize: FONT_SIZE.h1,
      color: colors.common_txt_color,
      includeFontPadding: false,
    },
    headerInviteText: {
      fontFamily: FONTS.regular,
      fontSize: FONT_SIZE.h4,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
  });
}
