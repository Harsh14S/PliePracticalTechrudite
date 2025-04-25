import {Dimensions, Platform, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from './Fonts';
import {ThemeColorType} from '../../theme/ThemeColorTypes';

// ------------------------------ Platform ------------------------------

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// =======================================================================

// ------------------------------ Responsive Sizes ------------------------------
// screen dimensions
export const {height: ScreenHeight, width: ScreenWidth} =
  Dimensions.get('window');

// screens aspect ratio
export const aspectRatio = ScreenHeight / ScreenWidth;

// for responsive size
export const RFSize = (size: number) => RFValue(size, ScreenHeight);

// check if device is large (iPad or Tablet)
export const isLargeDevice = aspectRatio <= 1.6;

// =======================================================================

// ------------------------------ Common Props ------------------------------
export const COMMON_PROPS = {
  active_opacity: 0.7,
};

// =======================================================================

// ------------------------------ Font Size ------------------------------

export const FONT_SIZE = {
  h0: RFSize(26),
  h1: RFSize(24),
  h2: RFSize(20),
  h3: RFSize(18),
  h4: RFSize(16),
  h5: RFSize(14),
  h6: RFSize(12),
};
// =======================================================================

// ------------------------------ Component Sizes ------------------------------

export const SIZES = {
  common_padding: RFSize(20),
  common_radius: RFSize(12),
};

type shadowProps = {
  colors: ThemeColorType;
};

export const shadowStyles = ({colors}: shadowProps) => {
  return StyleSheet.create({
    buttonShadow: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: RFSize(3), height: RFSize(3)},
      shadowOpacity: 0.3,
      shadowRadius: RFSize(5),
      elevation: 3,
    },
    inputShadow: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: RFSize(3), height: RFSize(3)},
      shadowOpacity: 0.3,
      shadowRadius: RFSize(2),
      elevation: 4,
    },
    dashBoardShadow: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16.0,
      elevation: 24,
    },
    shadowColor: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    lightShadowColor: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    tooLightShadowColor: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: 4, height: 4},
      shadowOpacity: 2,
      shadowRadius: 2,
      elevation: 3,
    },
    noShadow: {
      shadowColor: colors.common_shadow_color,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  });
};

// =======================================================================

// ------------------------------ Hit Slop ------------------------------

const squareHitSlop = (size: number) => ({
  top: size,
  bottom: size,
  left: size,
  right: size,
});
const rectHitSlop = (vertical: number, horizontal: number) => ({
  top: vertical,
  bottom: vertical,
  left: horizontal,
  right: horizontal,
});

export const HIT_SLOPS = {
  general: squareHitSlop(RFSize(4)),
  back_btn: rectHitSlop(RFSize(5), RFSize(8)),
};

// =======================================================================
