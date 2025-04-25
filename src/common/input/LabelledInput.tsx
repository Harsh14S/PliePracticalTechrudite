import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {useTheme} from '../../context/ThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyles} from './Styles';
import ButtonWrapper from '../button/ButtonWrapper';
import {ICONS} from '../../utils/assets/IconHelper';

interface LabelledInput {
  value: string;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  showForgotPassword?: boolean;
  onPressForgot?: () => void;
  onChangeValue?: (value: string) => void;
}

export default function LabelledInput({
  value = '',
  label = 'label',
  placeholder = '',
  secureTextEntry = false,
  showForgotPassword = false,
  onPressForgot = () => {},
  onChangeValue = () => {},
}: LabelledInput) {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const inputRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);

  const logo = useMemo(
    function () {
      return showPassword ? ICONS.view : ICONS.hide;
    },
    [showPassword],
  );

  function ShowPasswordButton() {
    if (!secureTextEntry) return null;
    return (
      <ButtonWrapper onPress={() => setShowPassword(!showPassword)}>
        <Image
          source={logo}
          style={styles.logo}
          tintColor={theme.common_light_icon_tint}
        />
      </ButtonWrapper>
    );
  }

  function ForgotPasswordButton() {
    if (!showForgotPassword) return null;
    return (
      <ButtonWrapper
        onPress={onPressForgot}
        style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </ButtonWrapper>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current?.focus();
      }}>
      <View style={styles.container}>
        <Text style={styles.labelText}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeValue}
            style={styles.textInput}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !showPassword}
          />
          <ShowPasswordButton />
        </View>
        <ForgotPasswordButton />
      </View>
    </TouchableWithoutFeedback>
  );
}
