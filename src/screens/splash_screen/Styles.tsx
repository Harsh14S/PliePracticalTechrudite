import {StyleSheet} from 'react-native';
import {ThemeColorType} from '../../theme/ThemeColorTypes';
import {EdgeInsets} from 'react-native-safe-area-context';
import {FONT_SIZE, RFSize, ScreenHeight} from '../../utils/ui/UiHelper';
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoIcon: {
      height: RFSize(100),
      width: RFSize(100),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });
}
