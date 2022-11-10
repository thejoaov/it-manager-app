import React from 'react';
import { Avatar, Button, Card, Chip, Divider } from 'react-native-paper';
import { useAuthContext } from '@contexts/auth';
import Flexbox from '@components/atoms/Flexbox';
import { AppStackScreenProps } from '@routes/types';
import Container from '@components/atoms/Container';
import { ScrollView } from 'react-native';
import { format } from 'date-fns';

const Profile: React.FC<AppStackScreenProps<'Profile'>> = () => {
  const { user, requestLogout } = useAuthContext();

  const getFirstTwoLetters = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }
    return name[0];
  };

  const onPressEdit = () => {
    console.log('Edit');
  };

  return (
    <Flexbox as={ScrollView} p={10} testID="profile">
      <Container width="100%" p={20}>
        <Avatar.Text
          size={100}
          label={getFirstTwoLetters(user?.profile?.name ?? '')}
          testID="profile-avatar"
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
                >
                  {user?.profile.telephone}
                </Chip>
              </Container>
            )}
          </Container>
        </>
      )}

      <Container testID="profile-name">
        <Card.Title
          title={user?.profile?.name ?? user?.email}
          titleVariant="headlineMedium"
          titleNumberOfLines={2}
        />
      </Container>

      <Divider />

      <Container testID="profile-username">
        <Card.Title title="Nome de usuário" subtitle={user?.username ?? ''} />
      </Container>

      {user?.profile?.name && (
        <Container testID="profile-email">
          <Card.Title title="Email" subtitle={user?.email} />
        </Container>
      )}

      <Card.Actions>
        <Button
          mode="outlined"
          onPress={requestLogout}
          testID="profile-logout-button"
        >
          Logout
        </Button>
        <Button
          mode="outlined"
          onPress={onPressEdit}
          testID="profile-edit-button"
        >
          Edit Profile
        </Button>
      </Card.Actions>
    </Flexbox>
  );
};

export default Profile;
