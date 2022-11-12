import { useToastContext } from '@contexts/toast';
import React, { useState, useCallback } from 'react';
import { Button } from 'react-native-paper';
import Container from '@components/atoms/Container';
import Input from '@components/atoms/Input';
import { useAuthContext } from '@contexts/auth';
import { AuthStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import { useTranslation } from 'react-i18next';

const Login: React.FC<AuthStackScreenProps<'Login'>> = ({
  navigation,
  route,
}) => {
  const [login, setLogin] = useState(route.params?.login || '');
  const [password, setPassword] = useState(route.params?.password || '');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastContext();
  const { requestLogin } = useAuthContext();
  const { t } = useTranslation('login');

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);

      await requestLogin({
        login,
        password,
      });
    } catch (error: any) {
      if (__DEV__ && error.errors[0].message) {
        showToast({
          text: error.errors[0].message,
          type: 'error',
        });
      } else {
        showToast({
          text: t('error.default'),
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [login, password, requestLogin, showToast, t]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <Flexbox justifyContent="center" p={20} testID="login">
      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.loginLabel')!}
          placeholder={t('inputs.loginPlaceholder')!}
          value={login}
          onChangeText={setLogin}
          defaultValue={route.params?.login}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.passwordLabel')!}
          placeholder={t('inputs.passwordPlaceholder')!}
          secureTextEntry
          showSecureButton
          value={password}
          defaultValue={route.params?.password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="password"
        />
      </Container>

      <Container mt={30}>
        <Container>
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !login || !password}
          >
            {t('buttons.login')}
          </Button>
        </Container>

        <Container mt={10}>
          <Button onPress={navigateToRegister}>{t('buttons.register')}</Button>
        </Container>
      </Container>
    </Flexbox>
  );
};
export default Login;
