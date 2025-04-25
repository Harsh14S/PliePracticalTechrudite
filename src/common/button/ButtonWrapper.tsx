import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {COMMON_PROPS, HIT_SLOPS} from '../../utils/ui/UiHelper';

interface Props extends TouchableOpacityProps {
  children?: ReactNode;
}

const {active_opacity} = COMMON_PROPS;

export default function ButtonWrapper({children, ...props}: Props) {
  return (
    <TouchableOpacity
      hitSlop={HIT_SLOPS.general}
      {...props}
      activeOpacity={active_opacity}>
      {children}
    </TouchableOpacity>
  );
}
