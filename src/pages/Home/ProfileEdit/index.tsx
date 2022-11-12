import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/auth';
import { AppStackScreenProps } from '@routes/types';
import ModalTemplate from '@components/templates/ModalTemplate';
import Input from '@components/atoms/Input';
import Flexbox from '@components/atoms/Flexbox';
import { Avatar, Button } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { formatPhone, getFirstTwoLetters } from '@utils/string';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import { useToastContext } from '@contexts/toast';

const ProfileEdit: React.FC<AppStackScreenProps<'ProfileEdit'>> = ({
  navigation,
}) => {
  const { user, requestUserInfo } = useAuthContext();
  const { showToast } = useToastContext();
  const [name, setName] = useState(user?.profile?.name);
  const [jobTitle, setJobTitle] = useState(user?.profile?.job_title);
  const [telephone, setTelephone] = useState(user?.profile?.telephone);
  // const [birthdate, setBirthdate] = useState(user?.profile?.birthdate);
  // const [startDate, setStartDate] = useState(user?.profile?.start_date);

  const { loading, request } = useRequest<void>();

  const { t } = useTranslation('profileEdit');

  const handleSubmit = useCallback(async () => {
    await request(
      apiService.putProfileByUserId({
        userId: String(user?.id),
        body: {
          name,
          job_title: jobTitle,
          telephone,
          // birthdate: birthdate ? new Date(birthdate).toISOString() : undefined,
          // start_date: startDate ? new Date(startDate).toISOString() : undefined,
        },
      })
    );
    await requestUserInfo();

    navigation.navigate('Profile');
    showToast({
      text: t('messages.success'),
      type: 'success',
    });
  }, [
    // birthdate,
    jobTitle,
    name,
    navigation,
    request,
    requestUserInfo,
    showToast,
    // startDate,
    t,
    telephone,
    user?.id,
  ]);

  return (
    <ModalTemplate onBackPress={navigation.goBack} testID="profileEdit">
      <Container width="100%" p={20} centralize>
        <Avatar.Text
          size={100}
          label={getFirstTwoLetters(
            (user?.profile?.name ?? user?.email) as string
          )}
          testID="profile-avatar"
        />
      </Container>
      <Input
        disabled={loading}
        label={t('inputs.nameLabel') ?? ''}
        placeholder={user?.profile?.name ?? t('inputs.namePlaceholder')}
        value={name}
        onChangeText={setName}
      />
      <Input
        disabled={loading}
        label={t('inputs.telephoneLabel') ?? ''}
        placeholder={
          user?.profile?.telephone ?? t('inputs.telephonePlaceholder')
        }
        value={formatPhone(telephone ?? '')}
        keyboardType="number-pad"
        onChangeText={setTelephone}
        textContentType="telephoneNumber"
      />
      {/* 
      // TODO: Implement date picker
      <Input
        disabled={loading}
        keyboardType="number-pad"
        label={t('inputs.birthdateLabel') ?? ''}
        placeholder={
          user?.profile?.birthdate ?? t('inputs.birthdatePlaceholder')
        }
        value={birthdate}
        onChangeText={setBirthdate}
      /> */}
      <Input
        disabled={loading}
        label={t('inputs.jobTitleLabel') ?? ''}
        placeholder={
          user?.profile?.job_title ?? t('inputs.jobTitlePlaceholder')
        }
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      {/* 
      // TODO: Implement date picker
      <Input
        disabled={loading}
        label={t('inputs.startDateLabel') ?? ''}
        placeholder={
          user?.profile?.start_date ?? t('inputs.startDatePlaceholder')
        }
        value={startDate}
        onChangeText={setStartDate}
      /> */}
      <Flexbox justifyContent="flex-end" marginBottom={60}>
        <Button
          loading={loading}
          disabled={loading}
          onPress={handleSubmit}
          mode="contained"
        >
          {t('buttons.save')}
        </Button>
      </Flexbox>
    </ModalTemplate>
  );
};

export default ProfileEdit;
