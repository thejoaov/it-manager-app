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
import DateInput from '@components/molecules/DateInput';

const ProfileEdit: React.FC<AppStackScreenProps<'ProfileEdit'>> = ({
  navigation,
}) => {
  const { t } = useTranslation('profileEdit');
  const { loading, request } = useRequest<void>();
  const { user } = useAuthContext();
  const { showToast } = useToastContext();

  const [name, setName] = useState(user?.profile?.name);
  const [jobTitle, setJobTitle] = useState(user?.profile?.job_title);
  const [telephone, setTelephone] = useState(user?.profile?.telephone);
  const [birthdate, setBirthdate] = useState(
    user?.profile?.birthdate ? new Date(user?.profile?.birthdate) : undefined
  );
  const [startDate, setStartDate] = useState(
    user?.profile?.start_date ? new Date(user?.profile?.start_date) : undefined
  );

  const handleSubmit = useCallback(async () => {
    try {
      await request(
        apiService.putProfileByUserId({
          userId: String(user?.id),
          body: {
            name,
            job_title: jobTitle,
            telephone: formatPhone(telephone ?? ''),
            birthdate: birthdate
              ? new Date(birthdate).toISOString()
              : undefined,
            start_date: startDate
              ? new Date(startDate).toISOString()
              : undefined,
          },
        })
      );

      showToast({
        text: t('messages.success'),
        type: 'success',
      });
      navigation.navigate('Profile');
    } catch (error: any) {
      if (error.message) {
        showToast({ text: t('messsages.error'), type: 'error' });
      }
    }
  }, [
    birthdate,
    jobTitle,
    name,
    navigation,
    request,
    showToast,
    startDate,
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
        placeholder={String(user?.profile?.name ?? t('inputs.namePlaceholder'))}
        value={name}
        onChangeText={setName}
      />
      <Input
        disabled={loading}
        label={t('inputs.telephoneLabel') ?? ''}
        placeholder={String(
          user?.profile?.telephone ?? t('inputs.telephonePlaceholder')
        )}
        value={formatPhone(telephone ?? '')}
        keyboardType="number-pad"
        onChangeText={setTelephone}
        textContentType="telephoneNumber"
      />
      <Input
        disabled={loading}
        label={t('inputs.jobTitleLabel') ?? ''}
        placeholder={String(
          user?.profile?.job_title ?? t('inputs.jobTitlePlaceholder')
        )}
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <DateInput
        mode="outlined"
        inputMode="start"
        label={t('inputs.birthdateLabel') ?? ''}
        placeholder={t('inputs.birthdatePlaceholder') ?? ''}
        value={birthdate}
        onChange={(date) => setBirthdate(date)}
        withDateFormatInLabel={false}
        disabled={loading}
        validRange={{
          startDate: new Date(1850, 0, 1),
          endDate: new Date(),
        }}
      />
      <DateInput
        mode="outlined"
        inputMode="start"
        label={t('inputs.startDateLabel') ?? ''}
        placeholder={t('inputs.startDatePlaceholder') ?? ''}
        value={startDate}
        onChange={(date) => setStartDate(date)}
        withDateFormatInLabel={false}
        disabled={loading}
        validRange={{
          startDate: new Date(1850, 0, 1),
          endDate: new Date(),
        }}
      />

      <Flexbox justifyContent="flex-end" marginTop={50} marginBottom={60}>
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
