// Fix typo: `  subscription_list` → `subscription_list`
interface ScreenName {
  splash_screen: string;
  tab_menu: string;
  dashboard: string;
  settings: string;
  premium: string;
  subscription_list: string;
  add_new_subscription: string;
}

// Use `satisfies` keyword instead of `as` for better safety and autocomplete
export const SCREEN = {
  login: 'LoginScreen',
  search: 'SearchScreen',
  events: 'EventScreen',
  favorites: 'FavoritesScreen',
  profile: 'ProfileScreen',
};

export const bottomTabData = [
  {screenName: SCREEN.search},
  {
    screenName: SCREEN.events,
  },
  {
    screenName: SCREEN.favorites,
  },
  {
    screenName: SCREEN.profile,
  },
];
