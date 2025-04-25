import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {FONT_SIZE, RFSize} from '../../utils/ui/UiHelper';
import {FONTS} from '../../utils/ui/Fonts';

type props = {
  colors: ThemeColorType;
  insets: EdgeInsets;
};

export function createStyles({colors, insets}: props) {
  const {bottom, left, right, top} = insets;
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: top,
      backgroundColor: colors.theme_bg,
      gap: RFSize(15),
    },

    emptyText: {
      color: colors.common_txt_color,
      fontSize: FONT_SIZE.h2,
      fontFamily: FONTS.medium,
      marginTop: RFSize(20),
      textAlign: 'center',
    },
    listContent: {
      gap: RFSize(10),
      paddingVertical: RFSize(12),
      paddingHorizontal: RFSize(10),
    },

    modalBackground: {
      flex: 1,
      backgroundColor: colors.common_modal_overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderContainer: {
      backgroundColor: '#333',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    loaderText: {
      color: '#fff',
      marginTop: 10,
    },
  });
}
