import { useToastContext } from '@contexts/toast';
import React, { useState, useCallback, useEffect } from 'react';
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
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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
    } catch (err: any) {
      console.log(err);
      showToast({
        text: t('errors.default'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [login, password, requestLogin, showToast, t]);

  useEffect(() => {
    if (route.params?.login && route.params?.password) {
      setLogin(route.params?.login);
      setPassword(route.params?.password);
    }
  }, [route.params?.login, route.params?.password]);

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
