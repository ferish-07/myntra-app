import {StyleProp} from 'react-native';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  View,
} from 'react-native';

type TopShadowViewProps = {
  style?: StyleProp<ViewStyle>;
};

const ComponentName = 'TopShadowView';

export const TopShadowView =
  Platform.OS === 'android'
    ? requireNativeComponent<TopShadowViewProps>(ComponentName)
    : View;
