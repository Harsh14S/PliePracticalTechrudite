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
const logo_ratio = 0.63;
const logo_width = RFSize(120);
const logo_height = logo_ratio * logo_width;
const image_size = logo_width * 0.4;
const social_button_size = RFSize(50);

export function createStyles({colors, insets}: props) {
  const {bottom, left, right, top} = insets;
  const shadowStyle = shadowStyles({colors});
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.theme_bg,
    },
    headerView: {
      backgroundColor: colors.login_background,
      flexGrow: 1,
      flexShrink: 1,
      paddingTop: top + RFSize(10),
      justifyContent: 'space-between',
      paddingBottom: logo_width * 0.4,
    },
    logo: {
      height: logo_height,
      width: logo_width,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    image: {
      height: image_size,
      width: image_size,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    inputContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: RFSize(30),
      gap: RFSize(20),
    },
    loginButtonContainerView: {
      flexGrow: 1,
      paddingHorizontal: RFSize(30),
    },
    signinButton: {
      alignSelf: 'flex-end',
      backgroundColor: colors.common_button_background,
      paddingHorizontal: RFSize(20),
      paddingVertical: RFSize(10),
      borderRadius: RFSize(5),
    },
    signinButtonText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h5,
      color: colors.common_button_txt,
      includeFontPadding: false,
    },
    signupLine: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: RFSize(20),
      gap: RFSize(5),
    },
    signupText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h6,
      color: colors.common_txt_color,
      includeFontPadding: false,
      textAlign: 'right',
      alignItems: 'center',
    },
    signupButton: {
      justifyContent: 'center',
    },
    signupButtonText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h6,
      color: colors.common_txt_color,
      includeFontPadding: false,
      textDecorationLine: 'underline',
    },
    dividerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: RFSize(30),
    },
    dividerLine: {
      flex: 1,
      borderTopWidth: RFSize(1),
      borderColor: colors.common_divider,
    },
    dividerTxt: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h6,
      color: colors.common_dark_txt,
      includeFontPadding: false,
      paddingHorizontal: RFSize(10),
    },
    socialMediaButtonContainerView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    socialMediaButtonHorizontal: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: RFSize(30),
      padding: RFSize(20),
    },
    socialMediaButton: {
      backgroundColor: colors.theme_bg,
      height: social_button_size,
      width: social_button_size,
      borderRadius: social_button_size * 0.1,
      padding: social_button_size * 0.25,
      overflow: 'hidden',
      ...shadowStyle.buttonShadow,
    },
    socialMediaIcon: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    guestButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: RFSize(20),
    },
    guestText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h5,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.common_modal_overlay,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: RFSize(20),
      borderRadius: RFSize(8),
      alignItems: 'center',
      justifyContent: 'center',
      gap: RFSize(10),
    },
    loadingText: {
      fontFamily: FONTS.medium,
      fontSize: FONT_SIZE.h5,
      color: colors.common_secondary_txt_color,
      includeFontPadding: false,
    },
  });
}
