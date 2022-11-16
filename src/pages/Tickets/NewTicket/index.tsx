import React, { useCallback, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import ModalTemplate from '@components/templates/ModalTemplate';
import Input from '@components/atoms/Input';
import { useTranslation } from 'react-i18next';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import { Pressable } from 'react-native';
import { Button, Menu, TextInput } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { ResponsePostTicket } from '@services/api/types';
import { toNumber } from 'lodash';
import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';

const NewTicket: React.FC<AppStackScreenProps<'NewTicket'>> = ({
  navigation,
  route,
}) => {
  const { loading, request } = useRequest<ResponsePostTicket>();
  const { t } = useTranslation('newTicket');
  const { showToast } = useToastContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [priorityMenuVisible, setPriorityMenuVisible] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      await request(
        apiService.postTicket({
          title,
          description,
          assignee_id: toNumber(route.params?.assignee?.user.id),
          location,
          opener_id: toNumber(user?.id),
          priority,
          status: 'open',
        })
      );
      showToast({
        text: t('createSuccess'),
        type: 'success',
      });
      navigation.navigate('TicketList');
    } catch (error: any) {
      if (error.message) {
        showToast({ text: error.message, type: 'error' });
      }
    }
  }, [
    description,
    location,
    navigation,
    priority,
    request,
    route.params?.assignee?.user.id,
    showToast,
    t,
    title,
    user?.id,
  ]);

  const getPriorityIcon = useCallback((p: 'low' | 'medium' | 'high') => {
    const iconByPriority: Record<typeof p, string> = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    return iconByPriority[p];
  }, []);

  return (
    <>
      <ModalTemplate title={t('title') ?? ''} onBackPress={navigation.goBack}>
        <Input
          label={t('inputs.titleLabel') ?? ''}
          placeholder={t('inputs.titlePlaceholder') ?? ''}
          onChangeText={setTitle}
          value={title}
          disabled={loading}
          maxLength={120}
        />

        <Input
          multiline
          numberOfLines={6}
          label={t('inputs.descriptionLabel') ?? ''}
          placeholder={t('inputs.descriptionPlaceholder') ?? ''}
          onChangeText={setDescription}
          value={description}
          disabled={loading}
          maxLength={255}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('SearchProfile');
          }}
          disabled={loading}
        >
          <Input
            label={t('inputs.assigneeLabel') ?? ''}
            placeholder={t('inputs.assigneePlaceholder') ?? ''}
            editable={false}
            value={
              route.params?.assignee.name ?? route.params?.assignee.user.email
            }
            disabled={loading}
          />
        </Pressable>
        <Input
          label={t('inputs.locationLabel') ?? ''}
          placeholder={t('inputs.locationPlaceholder') ?? ''}
          onChangeText={setLocation}
          value={location}
          disabled={loading}
          maxLength={120}
        />
        <Pressable
          disabled={loading}
          onPress={() => setPriorityMenuVisible((prevState) => !prevState)}
        >
          <Menu
            visible={priorityMenuVisible}
            onDismiss={() => setPriorityMenuVisible(false)}
            anchor={
              <Input
                left={<TextInput.Icon icon={getPriorityIcon(priority)} />}
                label={t('inputs.priorityLabel') ?? ''}
                placeholder={t('inputs.priorityPlaceholder') ?? ''}
                editable={false}
                disabled={loading}
                value={t(`inputs.priorityOptions.${priority}`) ?? ''}
              />
            }
          >
            <Menu.Item
              leadingIcon="arrow-up"
              onPress={() => {
                setPriority('high');
                setPriorityMenuVisible(false);
              }}
              title={t('inputs.priorityOptions.high') ?? ''}
            />
            <Menu.Item
              leadingIcon="minus"
              onPress={() => {
                setPriority('medium');
                setPriorityMenuVisible(false);
              }}
              title={t('inputs.priorityOptions.medium') ?? ''}
            />
            <Menu.Item
              leadingIcon="arrow-down"
              onPress={() => {
                setPriority('low');
                setPriorityMenuVisible(false);
              }}
              title={t('inputs.priorityOptions.low') ?? ''}
            />
          </Menu>
        </Pressable>
        <Container mt={60}>
          <Button
            loading={loading}
            disabled={loading}
            onPress={handleSubmit}
            mode="contained"
          >
            {t('buttons.save') ?? ''}
          </Button>
        </Container>
      </ModalTemplate>
    </>
  );
};

export default NewTicket;
