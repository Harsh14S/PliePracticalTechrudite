import {Platform, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../utils/ui/Fonts';
import {FONT_SIZE, RFSize, shadowStyles} from '../../utils/ui/UiHelper';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {EdgeInsets} from 'react-native-safe-area-context';

type props = {
  colors: ThemeColorType;
  insets: EdgeInsets;
};

const HEIGHT_SIZE = RFValue(65);

export function createStyles({colors, insets}: props) {
  return StyleSheet.create({
    dashboardTabView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      backgroundColor: colors.theme_bg,
      ...shadowStyles({colors}).dashBoardShadow,
      paddingBottom: insets.bottom,
    },
    image: {
      height: RFSize(20),
      width: RFSize(20),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    labelFocused: {
      alignSelf: 'center',
      marginHorizontal: RFValue(5),
      // color: colors.active_txt,
      fontFamily: FONTS.medium,
      includeFontPadding: false,
      fontSize: FONT_SIZE.h6,
    },
    focusedView: {
      height: RFValue(38),
      alignSelf: 'center',
      borderRadius: RFValue(20),
    },
    mainView: {
      flexDirection: 'row',
      paddingHorizontal: RFValue(10),
    },
    animatedContainer: {
      alignSelf: 'center',
    },
  });
}
