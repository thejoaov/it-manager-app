import React, { useCallback } from 'react';
import { Avatar, Button, Card, Chip } from 'react-native-paper';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '@contexts/auth';
import Container from '@components/atoms/Container';
import { AppStackScreenProps } from '@routes/types';
import { getFirstTwoLetters } from '@utils/string';

import useTheme from '@hooks/useTheme';
import SafeContainer from '@components/atoms/SafeContainer';

const Profile: React.FC<AppStackScreenProps<'Profile'>> = ({ navigation }) => {
  const { user, requestLogout, requestUserInfo } = useAuthContext();
  const { t } = useTranslation('profile');
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      requestUserInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const onPressEdit = useCallback(() => {
    navigation.navigate('ProfileEdit');
  }, [navigation]);

  return (
    <SafeContainer testID="profile">
      <Container backgroundColor={colors.background}>
        <Container width="100%" p={20}>
          <Avatar.Text
            size={100}
            label={getFirstTwoLetters(
              (user?.profile?.name ?? user?.email) as string
            )}
            testID="profile-avatar"
          />
        </Container>
        <Container testID="profile-name">
          <Card.Title
            title={user?.profile?.name ?? user?.email}
            titleVariant="headlineMedium"
            titleNumberOfLines={2}
          />
        </Container>

        {user?.profile && (
          <>
            <Container
              flexDirection="row"
              alignContent="space-between"
              flexWrap="wrap"
              m={10}
              testID="profile-info-container"
            >
              {user?.profile.job_title && (
                <Container m={1}>
                  <Chip
                    mode="outlined"
                    compact
                    icon="briefcase-outline"
                    testID="profile-info-chip-job-title"
                  >
                    {user?.profile.job_title}
                  </Chip>
                </Container>
              )}
              {user?.profile.role && (
                <Container m={1}>
                  <Chip
                    mode="outlined"
                    compact
                    icon="police-badge-outline"
                    testID="profile-info-chip-role"
                  >
                    {user?.profile.role}
                  </Chip>
                </Container>
              )}
              {user?.profile.birthdate && (
                <Container m={1}>
                  <Chip
                    mode="outlined"
                    compact
                    icon="cake-variant-outline"
                    testID="profile-info-chip-birthdate"
                  >
                    {format(new Date(user?.profile.birthdate), 'dd/MM/yyyy')}
                  </Chip>
                </Container>
              )}
              {user?.profile.start_date && (
                <Container m={1}>
                  <Chip
                    mode="outlined"
                    compact
                    icon="party-popper"
                    testID="profile-info-chip-start-date"
                  >
                    {format(new Date(user?.profile.start_date), 'dd/MM/yyyy')}
                  </Chip>
                </Container>
              )}
              {user?.profile.telephone && (
                <Container m={1}>
                  <Chip
                    mode="outlined"
                    compact
                    icon="phone-outline"
                    testID="profile-info-chip-telephone"
                    onPress={() => {
                      Linking.openURL(`tel:${user?.profile?.telephone}`);
                    }}
                  >
                    {user?.profile.telephone}
                  </Chip>
                </Container>
              )}
            </Container>
          </>
        )}
      </Container>

      <Container testID="profile-username">
        <Card.Title title={t('username')} subtitle={user?.username ?? ''} />
      </Container>

      {user?.profile?.name && (
        <Container testID="profile-email">
          <Card.Title title={t('email')} subtitle={user?.email} />
        </Container>
      )}

      <Card.Actions>
        <Button
          mode="outlined"
          onPress={requestLogout}
          testID="profile-logout-button"
        >
          {t('buttons.logout')}
        </Button>
        <Button onPress={onPressEdit} testID="profile-edit-button">
          {t('buttons.edit')}
        </Button>
      </Card.Actions>
    </SafeContainer>
  );
};

export default Profile;
