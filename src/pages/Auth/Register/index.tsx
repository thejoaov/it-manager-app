import { useToastContext } from '@contexts/toast';
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from 'react-native-paper';
import Container from '@components/atoms/Container';
import Input from '@components/atoms/Input';
import apiService from '@services/api';
import { AuthStackScreenProps } from '@routes/types';
import { ApiError } from '@models/errors';
import Flexbox from '@components/atoms/Flexbox';
import { useTranslation } from 'react-i18next';

const Register: React.FC<AuthStackScreenProps<'Register'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, ApiError | undefined>>({
    email: undefined,
    username: undefined,
    password: undefined,
    passwordConfirmation: undefined,
  });

  const { t } = useTranslation('register');

  const { showToast } = useToastContext();

  const getInputError = useCallback(
    (field: string) => {
      if (errors[field]) {
        return t(`errors.${errors[field]?.message}`);
      }
    },
    [errors, t]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await apiService.postUsers({
        email,
        username,
        password,
        passwordConfirmation,
      });
      setErrors({
        email: undefined,
        username: undefined,
        password: undefined,
        passwordConfirmation: undefined,
      });
      showToast({
        text: t('messages.registerSuccess'),
        type: 'success',
        action: {
          label: 'Login',
          onPress: () => {
            navigation.navigate('Login', { login: email, password });
          },
        },
        onDismiss: () => {
          navigation.navigate('Login', { login: email, password });
        },
      });
    } catch (error: any) {
      if (error.errors[0].message) {
        const apiError = error.errors as ApiError[];
        setErrors({
          email: apiError.find((e) => e.field === 'email'),
          username: apiError.find((e) => e.field === 'username'),
          password: apiError.find((e) => e.field === 'password'),
          passwordConfirmation: apiError.find(
            (e) => e.field === 'passwordConfirmation'
          ),
        });
      }
      showToast({
        text: t('errors.default'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [
    email,
    username,
    password,
    passwordConfirmation,
    showToast,
    t,
    navigation,
  ]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const disableSubmit = useMemo(() => {
    return (
      loading ||
      !email ||
      !username ||
      !passwordConfirmation ||
      !password ||
      password !== passwordConfirmation
    );
  }, [email, loading, password, passwordConfirmation, username]);

  return (
    <Flexbox justifyContent="center" p={20} testID="login">
      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.emailLabel') ?? ''}
          placeholder={t('inputs.emailPlaceholder') ?? ''}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          error={getInputError('email')}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.usernameLabel') ?? ''}
          placeholder={t('inputs.usernamePlaceholder') ?? ''}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="username-new"
          keyboardType="twitter"
          error={getInputError('username')}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.passwordLabel') ?? ''}
          placeholder={t('inputs.passwordPlaceholder') ?? ''}
          secureTextEntry
          showSecureButton
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="password-new"
          error={getInputError('password')}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label={t('inputs.confirmPasswordLabel') ?? ''}
          placeholder={t('inputs.confirmPasswordPlaceholder') ?? ''}
          secureTextEntry
          showSecureButton
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          autoCapitalize="none"
          autoComplete="password-new"
          error={getInputError('passwordConfirmation')}
        />
      </Container>

      <Container mt={30}>
        <Container>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={disableSubmit}
          >
            {t('buttons.register')}
          </Button>
        </Container>

        <Container mt={10}>
          <Button onPress={navigateToLogin}>{t('buttons.login')}</Button>
        </Container>
      </Container>
    </Flexbox>
  );
};
export default Register;
