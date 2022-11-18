import React, { useCallback, useEffect, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import ModalTemplate from '@components/templates/ModalTemplate';
import Input from '@components/atoms/Input';
import { useTranslation } from 'react-i18next';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import { Pressable, ScrollView } from 'react-native';
import { Button, Menu, TextInput } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { ResponsePostTicket } from '@services/api/types';
import { toNumber } from 'lodash';
import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';
import { ApiError } from '@models/errors';
import { ProfileWithUser } from '@models/user';

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
  const [assignee, setAssignee] = useState<ProfileWithUser>();
  const [opener, setOpener] = useState<ProfileWithUser>();
  const [priorityMenuVisible, setPriorityMenuVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, ApiError | undefined>>({
    title: undefined,
    description: undefined,
    location: undefined,
    assignee_id: undefined,
    opener_id: undefined,
    priority: undefined,
  });

  useEffect(() => {
    if (route.params?.assignee) {
      setAssignee(route.params.assignee);
    }
  }, [route.params?.assignee]);

  useEffect(() => {
    if (route.params?.opener) {
      setOpener(route.params?.opener);
    }
  }, [route.params?.opener]);

  useEffect(() => {
    if (title) {
      setErrors((err) => ({ ...err, title: undefined }));
    }
  }, [title]);

  useEffect(() => {
    if (description) {
      setErrors((err) => ({ ...err, description: undefined }));
    }
  }, [description]);

  useEffect(() => {
    if (location) {
      setErrors((err) => ({ ...err, location: undefined }));
    }
  }, [location]);

  useEffect(() => {
    if (priority) {
      setErrors((err) => ({ ...err, priority: undefined }));
    }
  }, [priority]);

  useEffect(() => {
    if (opener) {
      setErrors((err) => ({ ...err, opener_id: undefined }));
    }
  }, [opener]);

  useEffect(() => {
    if (assignee) {
      setErrors((err) => ({ ...err, assignee_id: undefined }));
    }
  }, [assignee]);

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
      setErrors({
        title: undefined,
        description: undefined,
        location: undefined,
        assignee_id: undefined,
        opener_id: undefined,
        priority: undefined,
      });
      await request(
        apiService.postTicket({
          title,
          description,
          assignee_id: toNumber(assignee?.user.id),
          location,
          opener_id: toNumber(opener?.user.id ?? user?.id),
          priority,
          status: 'open',
        })
      );
      showToast({
        text: t('messages.createSuccess'),
        type: 'success',
      });
      navigation.navigate('TicketList');
    } catch (error: any) {
      console.log(JSON.stringify(error));
      showToast({ text: error.message, type: 'error' });
      if (error.errors[0].message) {
        const apiError = error.errors as ApiError[];
        setErrors({
          title: apiError.find((e) => e.field === 'title'),
          description: apiError.find((e) => e.field === 'description'),
          location: apiError.find((e) => e.field === 'location'),
          opener_id: apiError.find((e) => e.field === 'opener_id'),
          assignee_id: apiError.find((e) => e.field === 'assignee_id'),
        });
      }
      showToast({
        text: t('errors.default'),
        type: 'error',
      });
    }
  }, [
    description,
    location,
    navigation,
    priority,
    request,
    assignee?.user.id,
    opener?.user.id,
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
    <ModalTemplate title={t('title') ?? ''} onBackPress={navigation.goBack}>
      <ScrollView>
        <Input
          label={t('inputs.titleLabel') ?? ''}
          placeholder={t('inputs.titlePlaceholder') ?? ''}
          onChangeText={setTitle}
          value={title}
          disabled={loading}
          maxLength={120}
          error={getInputError('title')}
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
          error={getInputError('description')}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('SearchProfile', {
              type: 'assignee',
              headerTitle: t('inputs.assigneeLabel') ?? '',
            });
          }}
          disabled={loading}
        >
          <Input
            label={t('inputs.assigneeLabel') ?? ''}
            placeholder={t('inputs.assigneePlaceholder') ?? ''}
            editable={false}
            value={assignee?.name ?? assignee?.user.email}
            disabled={loading}
            onPressIn={() => {
              navigation.navigate('SearchProfile', {
                type: 'assignee',
                headerTitle: t('inputs.assigneeLabel') ?? '',
              });
            }}
            error={getInputError('assignee_id')}
            left={<TextInput.Icon icon="account-alert-outline" />}
          />
        </Pressable>
        {user?.profile?.role === 'admin' && (
          <Pressable
            onPress={() => {
              navigation.navigate('SearchProfile', {
                type: 'opener',
                headerTitle: t('inputs.openerLabel') ?? '',
              });
            }}
            disabled={loading}
          >
            <Input
              label={t('inputs.openerLabel') ?? ''}
              placeholder={t('inputs.openerPlaceholder') ?? ''}
              editable={false}
              left={<TextInput.Icon icon="account-check-outline" />}
              value={
                opener?.name ??
                opener?.user.email ??
                user?.profile.name ??
                user?.email
              }
              onPressIn={() => {
                navigation.navigate('SearchProfile', {
                  type: 'opener',
                  headerTitle: t('inputs.openerLabel') ?? '',
                });
              }}
              disabled={loading}
              error={getInputError('opener_id')}
            />
          </Pressable>
        )}
        <Input
          label={t('inputs.locationLabel') ?? ''}
          placeholder={t('inputs.locationPlaceholder') ?? ''}
          onChangeText={setLocation}
          value={location}
          disabled={loading}
          maxLength={120}
          error={getInputError('location')}
          left={<TextInput.Icon icon="map-marker-outline" />}
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
                onPressIn={() =>
                  setPriorityMenuVisible((prevState) => !prevState)
                }
                value={t(`inputs.priorityOptions.${priority}`) ?? ''}
                error={getInputError('priority')}
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
      </ScrollView>
    </ModalTemplate>
  );
};

export default NewTicket;
