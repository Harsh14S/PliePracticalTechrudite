import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {FONT_SIZE, RFSize, shadowStyles, SIZES} from '../../utils/ui/UiHelper';
import {FONTS} from '../../utils/ui/Fonts';

type props = {
  colors: ThemeColorType;
  insets: EdgeInsets;
};
const {common_padding} = SIZES;
const image_size = RFSize(20);

export function createStyles({colors, insets}: props) {
  const {bottom, left, right, top} = insets;

  const shadowStyle = shadowStyles({colors});
  return StyleSheet.create({
    container: {
      backgroundColor: colors.theme_bg,
    },
    labelText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h4,
      color: colors.common_txt_color,
      includeFontPadding: false,
    },
    inputContainer: {
      backgroundColor: colors.theme_bg,
      flexDirection: 'row',
      gap: RFSize(5),
      borderRadius: RFSize(5),
      paddingHorizontal: RFSize(10),
      alignItems: 'center',
      marginTop: RFSize(10),
      ...shadowStyle.inputShadow,
    },
    textInput: {
      flex: 1,
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h5,
      color: colors.common_txt_color,
      includeFontPadding: false,
      paddingVertical: RFSize(14),
    },
    logo: {
      height: image_size,
      width: image_size,
      resizeMode: 'contain',
    },
    forgotPasswordContainer: {
      alignSelf: 'flex-end',
      marginTop: RFSize(8),
    },
    forgotPasswordText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h6,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
  });
}
