import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ButtonWrapper from '../../common/button/ButtonWrapper';
import LabelledInput from '../../common/input/LabelledInput';
import {useTheme} from '../../context/ThemeContext';
import {useAuthContext} from '../../context/AuthContext';
import {loginUser} from '../../redux/slices/authSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {ICONS} from '../../utils/assets/IconHelper';
import {isIos} from '../../utils/ui/UiHelper';
import {createStyles} from './Styles';

function LoginScreen() {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>(
    'testpracticaluser001@mailinator.com',
  );
  const [password, setPassword] = useState<string>('Test@123');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    dispatch(loginUser({email, password}));
  };

  const {setIsLoggedIn} = useAuthContext();
  useEffect(() => {
    if (auth.isAuthenticated) {
      Alert.alert('Success', 'Logged in successfully!', [
        {onPress: () => setIsLoggedIn(true), text: 'OK'},
      ]);
      // Optional navigation:
      // navigation.navigate('Home');
    } else if (auth.emailUnverified) {
      Alert.alert(
        'Verify Email',
        'Please verify your email before logging in. A verification link has been sent.',
      );
    } else if (auth.error) {
      Alert.alert('Login Error', auth.error);
    }
  }, [auth]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header view */}
      <View style={styles.headerView}>
        <Image source={ICONS.logo} style={styles.logo} />
        <Image source={ICONS.image} style={styles.image} />
      </View>

      {/* Input Container */}
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={isIos ? 'padding' : 'height'}>
        <LabelledInput
          value={email}
          onChangeValue={setEmail}
          label="Email"
          placeholder="Enter your email"
        />
        <LabelledInput
          value={password}
          onChangeValue={setPassword}
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          showForgotPassword={true}
        />
      </KeyboardAvoidingView>

      {/* Login Button Container */}
      <View style={styles.loginButtonContainerView}>
        <ButtonWrapper style={styles.signinButton} onPress={handleLogin}>
          <Text style={styles.signinButtonText}>Sign In</Text>
        </ButtonWrapper>

        <View style={styles.signupLine}>
          <Text style={styles.signupText}>Not a member?</Text>
          <ButtonWrapper style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up Here</Text>
          </ButtonWrapper>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerTxt}>or Sign In with:</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Media Buttons */}
      <View style={styles.socialMediaButtonContainerView}>
        <View style={styles.socialMediaButtonHorizontal}>
          <SocialMediaButton source={ICONS.google} />
          <SocialMediaButton source={ICONS.apple} />
          <SocialMediaButton source={ICONS.facebook} padding={0} />
        </View>
      </View>

      {/* Guest Access */}
      <ButtonWrapper style={styles.guestButton}>
        <Text style={styles.guestText}>Enter as Guest</Text>
      </ButtonWrapper>

      {/* Modal Loader */}
      <Modal
        transparent
        visible={auth.loading}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  function SocialMediaButton({
    source,
    tintColor,
    padding,
    onPress = () => {},
  }: {
    source: any;
    tintColor?: any;
    padding?: number;
    onPress?: () => void;
  }) {
    return (
      <ButtonWrapper
        onPress={onPress}
        style={[styles.socialMediaButton, padding !== undefined && {padding}]}>
        <Image
          style={styles.socialMediaIcon}
          source={source}
          tintColor={tintColor}
        />
      </ButtonWrapper>
    );
  }
}

export default LoginScreen;
