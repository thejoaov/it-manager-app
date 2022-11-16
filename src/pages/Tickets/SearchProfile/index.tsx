import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, List, Surface } from 'react-native-paper';
import { AppStackScreenProps } from '@routes/types';
import SearchTemplate from '@components/templates/SearchTemplate';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import { debounce } from 'lodash';
import { ResponseGetProfiles } from '@services/api/types';
import { getFirstTwoLetters } from '@utils/string';
import { ProfileWithUser } from '@models/user';

const SearchProfile: React.FC<AppStackScreenProps<'SearchProfile'>> = ({
  navigation,
}) => {
  const { t } = useTranslation('searchProfile');
  const [searchText, setSearchText] = useState('');
  // const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const { response, request, loading } = useRequest<ResponseGetProfiles>();

  const handleSearch = useCallback(async (text: string) => {
    request(
      apiService.getProfiles({
        name: text,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  );

  useEffect(() => {
    if (searchText.length > 2) {
      debouncedSearch(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onSubmit = useCallback(async () => {
    await handleSearch(searchText);
  }, [handleSearch, searchText]);

  const handleSelectProfile = useCallback(
    (profile: ProfileWithUser) => {
      navigation.navigate('NewTicket', {
        assignee: profile,
      });
    },
    [navigation]
  );

  return (
    <SearchTemplate
      headerTitle={t('headerTitle')}
      onBackPress={navigation.goBack}
      onSearch={setSearchText}
      query={searchText}
      loading={loading}
      onSubmit={onSubmit}
      searchPlaceholder={t('searchPlaceholder') ?? ''}
    >
      <FlatList
        data={response?.data}
        renderItem={({ item }) => (
          <Surface>
            <List.Item
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ padding: 10 }}
              title={item.name}
              description={item.user.email}
              onPress={() => handleSelectProfile(item)}
              // eslint-disable-next-line react/no-unstable-nested-components
              left={() => (
                <Avatar.Text
                  size={40}
                  label={getFirstTwoLetters(
                    (item.name ?? item.user.email) as string
                  )}
                  testID="profile-avatar"
                />
              )}
            />
          </Surface>
        )}
      />
    </SearchTemplate>
  );
};

export default SearchProfile;
