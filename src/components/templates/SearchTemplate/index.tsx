import React, { PropsWithChildren } from 'react';
import { Searchbar } from 'react-native-paper';
import Flexbox from '@components/atoms/Flexbox';
import Loading from '@components/organisms/Loading';
import ModalTemplate from '@components/templates/ModalTemplate';
import { SearchTemplateContainer } from './styles';

export type SearchTemplateProps = {
  onBackPress: () => void;
  onSearch: (query: string) => void;
  query: string;
  headerTitle: string;
  loading?: boolean;
  onSubmit?: () => void;
  searchPlaceholder?: string;
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
      <ModalTemplate onBackPress={onBackPress} title={headerTitle}>
        <Searchbar
          value={query}
          onChangeText={onSearch}
          onSubmitEditing={onSubmit}
          placeholder={searchPlaceholder}
          autoFocus
        />
        <Flexbox mt={20}>{loading ? <Loading /> : children}</Flexbox>
      </ModalTemplate>
    </SearchTemplateContainer>
  );
};

export default SearchTemplate;
