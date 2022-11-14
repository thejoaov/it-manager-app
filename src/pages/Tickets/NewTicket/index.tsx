import React, { useEffect, useMemo, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import { debounce } from 'lodash';
import ModalTemplate from '@components/templates/ModalTemplate';
import Input from '@components/atoms/Input';
import { useTranslation } from 'react-i18next';
// import { Dimensions, FlatList } from 'react-native';
import useRequest from '@hooks/useRequest';

import apiService from '@services/api';
import { Profile } from '@models/user';
// import Container from '@components/atoms/Container';

const NewTicket: React.FC<AppStackScreenProps<'NewTicket'>> = ({
  navigation,
}) => {
  // const { loading, request, response } = useRequest<Profile[]>();
  const { request } = useRequest<Profile[]>();
  const { t } = useTranslation('newTicket');
  const [
    searchValue,
    // setSearchValue
  ] = useState('');

  const requestSearch = async () => {
    await request(apiService.getProfiles({ name: searchValue }));
  };

  const debouncedSearch = useMemo(
    () => debounce(requestSearch, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue]
  );

  useEffect(() => {
    if (searchValue.length > 2) {
      debouncedSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <ModalTemplate title="New ticket" onBackPress={navigation.goBack}>
      <Input label={t('inputs.titleLabel') ?? ''} />
      <Input
        multiline
        numberOfLines={6}
        label={t('inputs.descriptionLabel') ?? ''}
      />
      <Input label={t('inputs.openerLabel') ?? ''} />
    </ModalTemplate>
  );
};

export default NewTicket;
