import COLORS from './Colors';
import {ThemeColorType} from './ThemeColorTypes';

const Theme: ThemeColorType = {
  theme_bg: COLORS.white,
  primary: COLORS.black,

  // login
  login_background: COLORS.gray_20,

  // common
  common_shadow_color: COLORS.black,
  common_txt_color: COLORS.black,
  common_secondary_txt_color: COLORS.light_gray,
  common_dark_txt: COLORS.dark_gray,
  common_button_txt: COLORS.white,
  common_button_background: COLORS.green,
  common_placeholder_color: COLORS.inactive_gray,
  common_light_icon_tint: COLORS.light_gray,
  common_divider: COLORS.dark_gray,
  common_modal_overlay: COLORS.semi_transparent_black,
  common_highlighted_txt_color: COLORS.active_green,
};
export default Theme;
