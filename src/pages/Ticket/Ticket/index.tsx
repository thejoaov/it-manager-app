import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toNumber } from 'lodash';
import { ScrollView } from 'react-native';
import { Appbar, Button, Provider, TextInput } from 'react-native-paper';
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
import SelectInput, {
  SelectInputProps,
} from '@components/molecules/SelectInput';
import { IconName } from '@utils/icons';
import PressableInput from '@components/molecules/PressableInput';

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
  const [status, setStatus] = useState(route.params.ticket?.status || 'open');
  const [errors, setErrors] = useState<Record<string, ApiError | undefined>>({
    title: undefined,
    description: undefined,
    location: undefined,
    assignee_id: undefined,
    opener_id: undefined,
    priority: undefined,
    status: undefined,
  });

  const clearErrors = useCallback(() => {
    setErrors({
      title: undefined,
      description: undefined,
      location: undefined,
      assignee_id: undefined,
      opener_id: undefined,
      priority: undefined,
      status: undefined,
    });
  }, []);

  const handleError = useCallback(
    (error: any) => {
      console.log(JSON.stringify(error));
      if (error.errors[0].message) {
        const apiError = error.errors as ApiError[];
        setErrors({
          title: apiError.find((e) => e.field === 'title'),
          description: apiError.find((e) => e.field === 'description'),
          location: apiError.find((e) => e.field === 'location'),
          opener_id: apiError.find((e) => e.field === 'opener_id'),
          assignee_id: apiError.find((e) => e.field === 'assignee_id'),
          priority: apiError.find((e) => e.field === 'priority'),
          status: apiError.find((e) => e.field === 'status'),
        });
      }
      showToast({
        text: t('errors.default'),
        type: 'error',
      });
    },
    [showToast, t]
  );

  const getInputError = useCallback(
    (field: string) => {
      if (errors[field]) {
        return t(`errors.${errors[field]?.message}`);
      }
    },
    [errors, t]
  );

  useEffect(() => {
    if (route.params?.ticket?.opener) {
      setOpener(route.params?.ticket?.opener);
    }
    if (route.params?.ticket?.assignee) {
      setAssignee(route.params?.ticket?.assignee);
    }
  }, [route.params?.ticket]);

  useEffect(() => {
    if (title) {
      setErrors((err) => ({ ...err, title: undefined }));
    }
    if (description) {
      setErrors((err) => ({ ...err, description: undefined }));
    }
    if (location) {
      setErrors((err) => ({ ...err, location: undefined }));
    }
    if (priority) {
      setErrors((err) => ({ ...err, priority: undefined }));
    }
    if (opener) {
      setErrors((err) => ({ ...err, opener_id: undefined }));
    }
    if (assignee) {
      setErrors((err) => ({ ...err, assignee_id: undefined }));
    }
    if (status) {
      setErrors((err) => ({ ...err, status: undefined }));
    }
  }, [title, description, location, priority, opener, assignee, status]);

  const loadTicketDetails = useCallback(async () => {
    try {
      const response = await request(apiService.getTicketById({ id: id! }));
      setTitle(response.title);
      setDescription(response.description);
      setLocation(response.location);
      setPriority(response.priority);
      setAssignee(response?.assignee ?? undefined);
      setOpener(response.opener);
      setId(response.id);
      setStatus(response.status);
    } catch (error: any) {
      showToast({ text: error.message, type: 'error' });
    }
  }, [id, request, showToast]);

  useEffect(() => {
    if (route.params.type === 'details') {
      loadTicketDetails();
    }
  }, [loadTicketDetails, route.params.type]);

  const handleSubmit = useCallback(async () => {
    try {
      clearErrors();
      await request(
        apiService.postTicket({
          title,
          description,
          assignee_id: toNumber(assignee?.id),
          location,
          opener_id: toNumber(opener?.id ?? user?.profile?.id),
          priority,
          status,
        })
      );
      navigation.goBack();
      showToast({
        text: t('messages.createSuccess'),
        type: 'success',
      });
    } catch (error: any) {
      handleError(error);
    }
  }, [
    assignee?.id,
    clearErrors,
    description,
    handleError,
    location,
    navigation,
    opener?.id,
    priority,
    request,
    showToast,
    status,
    t,
    title,
    user?.profile?.id,
  ]);

  const handleEdit = useCallback(async () => {
    try {
      clearErrors();
      await request(
        apiService.putTicketById({
          id: id!,
          title,
          description,
          assignee_id: toNumber(assignee?.id),
          location,
          opener_id: toNumber(opener?.id ?? user?.profile?.id),
          priority,
          status,
        })
      );
      showToast({
        text: t('messages.createSuccess'),
        type: 'success',
      });
      navigation.goBack();
    } catch (error: any) {
      handleError(error);
    }
  }, [
    assignee?.id,
    clearErrors,
    description,
    handleError,
    id,
    location,
    navigation,
    opener?.id,
    priority,
    request,
    showToast,
    status,
    t,
    title,
    user?.profile?.id,
  ]);

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
      navigation.goBack();
    } catch (error: any) {
      console.log(JSON.stringify(error));
      showToast({
        text: t('errors.delete'),
        type: 'error',
      });
    }
  }, [id, navigation, request, showToast, t]);

  const getPriorityIcon = useCallback((p: 'low' | 'medium' | 'high') => {
    const iconByPriority: Record<typeof p, IconName> = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    return iconByPriority[p];
  }, []);

  const priorityOptions = useMemo(
    (): SelectInputProps['values'] => [
      {
        leadingIcon: getPriorityIcon('high'),
        onPress: () => {
          setPriority('high');
        },
        title: t('inputs.priorityOptions.high') ?? '',
      },
      {
        leadingIcon: getPriorityIcon('medium'),
        onPress: () => {
          setPriority('medium');
        },
        title: t('inputs.priorityOptions.medium') ?? '',
      },
      {
        leadingIcon: getPriorityIcon('low'),
        onPress: () => {
          setPriority('low');
        },
        title: t('inputs.priorityOptions.low') ?? '',
      },
    ],
    [getPriorityIcon, t]
  );

  const handleProgressStatus = useCallback(() => {
    if (status === 'open') {
      setStatus('solving');
    } else if (status === 'solving') {
      setStatus('closed');
    }
  }, [status]);

  const getStatusIcon = useCallback((p: 'open' | 'solving' | 'closed') => {
    const iconByPriority: Record<typeof p, IconName> = {
      open: 'alert-circle-outline',
      solving: 'alert-circle-check',
      closed: 'check-circle-outline',
    };

    return iconByPriority[p];
  }, []);

  const statusOptions = useMemo(
    (): SelectInputProps['values'] => [
      {
        leadingIcon: getStatusIcon('open'),
        onPress: () => {
          setStatus('open');
        },
        title: t('inputs.statusOptions.open') ?? '',
      },
      {
        leadingIcon: getStatusIcon('solving'),
        onPress: () => {
          setStatus('solving');
        },
        title: t('inputs.statusOptions.solving') ?? '',
      },
      {
        leadingIcon: getStatusIcon('closed'),
        onPress: () => {
          setStatus('closed');
        },
        title: t('inputs.statusOptions.closed') ?? '',
      },
    ],
    [t, getStatusIcon]
  );

  return (
    <Provider>
      <PageTemplate
        testID="ticket-container"
        title={(route.params.ticket?.id ? t('edit') : t('title')) ?? ''}
        onBackPress={navigation.goBack}
        aditionalActions={
          route.params.type !== 'new' &&
          (user?.profile?.role === 'admin' ||
            user?.id === route.params.ticket?.opener_id) ? (
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

          {user?.profile?.role === 'admin' && (
            <PressableInput
              onPress={() => {
                navigation.navigate('SearchProfile', {
                  headerTitle: t('inputs.openerLabel') ?? '',
                  roleFilter: 'except-guest',
                  handleSelect: (profile) => {
                    setOpener(profile);
                  },
                });
              }}
              disabled={loading}
              label={t('inputs.openerLabel') ?? ''}
              placeholder={t('inputs.openerPlaceholder') ?? ''}
              editable={false}
              leftIcon="account-box-outline"
              value={
                opener?.name ??
                opener?.user.email ??
                user?.profile.name ??
                user?.email
              }
              error={getInputError('opener_id')}
            />
          )}

          {['admin', 'manager', 'support', 'technician'].includes(
            user?.profile?.role || ''
          ) && (
            <>
              <PressableInput
                onPress={() => {
                  navigation.navigate('SearchProfile', {
                    headerTitle: t('inputs.assigneeLabel') ?? '',
                    roleFilter: 'admin-personel',
                    handleSelect: (profile) => {
                      setAssignee(profile);
                    },
                  });
                }}
                disabled={
                  loading ||
                  ['user', 'guest'].includes(user?.profile?.role || '')
                }
                label={t('inputs.assigneeLabel') ?? ''}
                placeholder={t('inputs.assigneePlaceholder') ?? ''}
                editable={false}
                value={assignee?.name ?? assignee?.user.email}
                error={getInputError('assignee_id')}
                leftIcon="account-alert-outline"
              />
              <SelectInput
                values={priorityOptions}
                disabled={
                  loading ||
                  ['user', 'guest'].includes(user?.profile?.role || '')
                }
                inputLabel={t('inputs.priorityLabel') ?? ''}
                inputPlaceholder={t('inputs.priorityPlaceholder') ?? ''}
                inputDisabled={
                  loading ||
                  ['user', 'guest'].includes(user?.profile?.role || '')
                }
                inputValue={t(`inputs.priorityOptions.${priority}`) ?? ''}
                inputError={getInputError('priority')}
                inputIcon={getPriorityIcon(priority)}
              />
              <SelectInput
                values={statusOptions}
                disabled={
                  loading ||
                  ['user', 'guest'].includes(user?.profile?.role || '')
                }
                inputLabel={t('inputs.statusLabel') ?? ''}
                inputPlaceholder={t('inputs.statusPlaceholder') ?? ''}
                inputDisabled={
                  loading ||
                  ['user', 'guest'].includes(user?.profile?.role || '')
                }
                inputValue={t(`inputs.statusOptions.${status}`) ?? ''}
                inputError={getInputError('status')}
                inputIcon={getStatusIcon(status)}
                inputRight={
                  status !== 'closed' && (
                    <TextInput.Icon
                      disabled={loading}
                      icon="skip-forward"
                      onPress={handleProgressStatus}
                    />
                  )
                }
              />
            </>
          )}
          <Container mt={60}>{getSubmitButton}</Container>
        </ScrollView>
      </PageTemplate>
    </Provider>
  );
};

export default Ticket;
