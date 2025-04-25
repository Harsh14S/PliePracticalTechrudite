import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef() as any;

// export function deepNavigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }
