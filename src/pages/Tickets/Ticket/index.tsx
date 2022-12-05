import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toNumber } from 'lodash';
import { Pressable, ScrollView } from 'react-native';
import { Appbar, Button, Menu, Provider, TextInput } from 'react-native-paper';
import apiService from '@services/api';
import { ResponsePostTicket } from '@services/api/types';
import { ApiError } from '@models/errors';
import { ProfileWithUser } from '@models/user';
import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';
import useTheme from '@hooks/useTheme';
import useRequest from '@hooks/useRequest';
import Container from '@components/atoms/Container';
import PageTemplate from '@components/templates/PageTemplate';
import Input from '@components/atoms/Input';
import { AppStackScreenProps } from '@routes/types';

const Ticket: React.FC<AppStackScreenProps<'Ticket'>> = ({
  navigation,
  route,
}) => {
  const { loading, request } = useRequest<ResponsePostTicket>();
  const { t } = useTranslation('newTicket');
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const theme = useTheme();

  const [id, setId] = useState(route.params?.ticket?.id);
  const [title, setTitle] = useState(route.params?.ticket?.title || '');
  const [description, setDescription] = useState(
    route.params?.ticket?.description || ''
  );
  const [location, setLocation] = useState(
    route.params?.ticket?.location || ''
  );
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(
    route.params?.ticket?.priority || 'medium'
  );
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

  const loadTicketDetails = async () => {
    try {
      const response = await request(apiService.getTicketById({ id: id! }));
      setTitle(response.title);
      setDescription(response.description);
      setLocation(response.location);
      setPriority(response.priority);
      setAssignee(response?.assignee ?? undefined);
      setOpener(response.opener);
      setId(response.id);
    } catch (error: any) {
      showToast({ text: error.message, type: 'error' });
    }
  };

  useEffect(() => {
    if (['details'].includes(route.params?.type)) {
      loadTicketDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (route.params?.ticket?.assignee) {
      setAssignee(route.params?.ticket?.assignee);
    }
  }, [route.params?.ticket?.assignee]);

  useEffect(() => {
    if (route.params?.ticket?.opener) {
      setOpener(route.params?.ticket?.opener);
    }
  }, [route.params?.ticket?.opener]);

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
          assignee_id: toNumber(assignee?.id),
          location,
          opener_id: toNumber(opener?.id ?? user?.profile?.id),
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
    assignee?.id,
    description,
    location,
    navigation,
    opener?.id,
    priority,
    request,
    showToast,
    t,
    title,
    user?.profile?.id,
  ]);

  const handleEdit = useCallback(async () => {
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
        apiService.putTicketById({
          id: id!,
          title,
          description,
          assignee_id: toNumber(assignee?.id),
          location,
          opener_id: toNumber(opener?.id ?? user?.profile?.id),
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
    assignee?.id,
    description,
    id,
    location,
    navigation,
    opener?.id,
    priority,
    request,
    showToast,
    t,
    title,
    user?.profile?.id,
  ]);

  const getPriorityIcon = useCallback((p: 'low' | 'medium' | 'high') => {
    const iconByPriority: Record<typeof p, string> = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    return iconByPriority[p];
  }, []);

  const getSubmitButton = useMemo(() => {
    if (route.params.type === 'new') {
      return (
        <Button
          loading={loading}
          disabled={loading}
          onPress={handleSubmit}
          mode="contained"
          icon="plus"
        >
          {t('common:buttons.save') ?? ''}
        </Button>
      );
    }

    if (route.params.type === 'edit') {
      return (
        <Button
          loading={loading}
          disabled={loading}
          onPress={handleEdit}
          mode="contained"
          icon="pencil"
        >
          {t('common:buttons.save') ?? ''}
        </Button>
      );
    }

    return null;
  }, [handleEdit, handleSubmit, loading, route.params.type, t]);

  const handleDelete = useCallback(async () => {
    try {
      await request(apiService.deleteTicketById({ id: id! }));
      showToast({
        text: t('messages.deleteSuccess'),
        type: 'success',
      });
      navigation.navigate('TicketList');
    } catch (error: any) {
      console.log(JSON.stringify(error));
      showToast({
        text: t('errors.delete'),
        type: 'error',
      });
    }
  }, [id, navigation, request, showToast, t]);

  return (
    <Provider>
      <PageTemplate
        testID="ticket-container"
        title={(route.params.ticket?.id ? t('edit') : t('title')) ?? ''}
        onBackPress={navigation.goBack}
        aditionalActions={
          route.params.type === 'edit' ? (
            <Appbar.Action
              icon="delete"
              onPress={handleDelete}
              color={theme.colors.error}
            />
          ) : null
        }
      >
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
                backType: route.params.type,
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
                  backType: route.params.type,
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
                  backType: route.params.type,
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
                    backType: route.params.type,
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
            onPress={() => {
              setPriorityMenuVisible(true);
            }}
          >
            <Menu
              visible={priorityMenuVisible}
              onDismiss={() => setPriorityMenuVisible(false)}
              anchor={
                <Input
                  left={
                    <TextInput.Icon
                      icon={getPriorityIcon(priority)}
                      onPress={() => {
                        setPriorityMenuVisible(true);
                      }}
                    />
                  }
                  label={t('inputs.priorityLabel') ?? ''}
                  placeholder={t('inputs.priorityPlaceholder') ?? ''}
                  editable={false}
                  disabled={loading}
                  onPressIn={() => {
                    setPriorityMenuVisible(true);
                  }}
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
          <Container mt={60}>{getSubmitButton}</Container>
        </ScrollView>
      </PageTemplate>
    </Provider>
  );
};

export default Ticket;
