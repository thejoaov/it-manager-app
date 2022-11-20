import React, { PropsWithChildren } from 'react';
import { Searchbar } from 'react-native-paper';
import Flexbox from '@components/atoms/Flexbox';
import Loading from '@components/organisms/Loading';
import PageTemplate from '@components/templates/PageTemplate';
import { SearchTemplateContainer } from './styles';

export type SearchTemplateProps = {
  onBackPress: () => void;
  onSearch: (query: string) => void;
  query: string;
  headerTitle: string;
  loading?: boolean;
  onSubmit?: () => void;
  searchPlaceholder?: string;
  onClear?: () => void;
};

const SearchTemplate: React.FC<PropsWithChildren<SearchTemplateProps>> = ({
  children,
  headerTitle,
  loading,
  onBackPress,
  onSearch,
  query,
  onSubmit,
  searchPlaceholder,
}) => {
  return (
    <SearchTemplateContainer testID="searchTemplate-container">
      <PageTemplate onBackPress={onBackPress} title={headerTitle}>
        <Searchbar
          value={query}
          onChangeText={onSearch}
          onSubmitEditing={onSubmit}
          placeholder={searchPlaceholder}
          autoCapitalize="none"
          autoFocus
          keyboardType="email-address"
        />
        <Flexbox mt={20}>{loading ? <Loading /> : children}</Flexbox>
      </PageTemplate>
    </SearchTemplateContainer>
  );
};

export default SearchTemplate;
