import React, { useCallback, useState } from 'react';
import { Button, IconButton, Menu } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { AppStackScreenProps } from '@routes/types';
import PageTemplate from '@components/templates/PageTemplate';
import Input from '@components/atoms/Input';
import { DEV_URL, PROD_URL, STG_URL } from '@constants/api';
import { apiInstance } from '@services/api/config';
import { useTranslation } from 'react-i18next';
import Flexbox from '@components/atoms/Flexbox';
import localStorage from '@services/localStorage';
import { useToastContext } from '@contexts/toast';
import { AXIOS_URL } from '@constants/storage';

const EasterEgg: React.FC<AppStackScreenProps<'EasterEgg'>> = ({
  navigation,
}) => {
  const { t } = useTranslation('easterEgg');
  const { showToast } = useToastContext();

  const [urlSelectionVisible, setUrlSelectionVisible] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string>(
    apiInstance.defaults.baseURL ?? ''
  );
  const [loading, setLoading] = useState(false);

  const handleSelectUrl = useCallback(async (url: string) => {
    setBaseUrl(url);
    setUrlSelectionVisible(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await localStorage.setItem(AXIOS_URL, baseUrl);
      apiInstance.defaults.baseURL = baseUrl;
      showToast({
        text: t('toast.success') ?? '',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      showToast({
        text: t('toast.error') ?? '',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [baseUrl, showToast, t]);

  return (
    <PageTemplate
      onBackPress={navigation.goBack}
      title={t('title') ?? ''}
      testID="easterEgg"
    >
      <Flexbox>
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flexbox>
            <Input
              label={t('apiUrlLabel') ?? ''}
              placeholder={t('apiUrlPlaceholder') ?? ''}
              value={baseUrl}
              onChangeText={setBaseUrl}
              disabled={loading}
            />
          </Flexbox>
          <Menu
            visible={urlSelectionVisible}
            onDismiss={() => setUrlSelectionVisible(false)}
            anchor={
              <IconButton
                icon="chevron-down"
                size={20}
                disabled={loading}
                onPress={() => {
                  setUrlSelectionVisible(true);
                }}
              />
            }
          >
            <Menu.Item
              trailingIcon={baseUrl === DEV_URL ? 'check' : undefined}
              onPress={() => {
                handleSelectUrl(DEV_URL);
              }}
              title={t('apiUrlDev') ?? ''}
            />
            <Menu.Item
              trailingIcon={baseUrl === STG_URL ? 'check' : undefined}
              onPress={() => {
                handleSelectUrl(STG_URL);
              }}
              title={t('apiUrlStg') ?? ''}
            />
            <Menu.Item
              trailingIcon={baseUrl === PROD_URL ? 'check' : undefined}
              onPress={() => {
                handleSelectUrl(PROD_URL);
              }}
              title={t('apiUrlProd') ?? ''}
            />
          </Menu>
        </Container>
      </Flexbox>
      <Container mb={30}>
        <Button loading={loading} mode="contained" onPress={handleSubmit}>
          {t('common:buttons.save')}
        </Button>
      </Container>
    </PageTemplate>
  );
};

export default EasterEgg;
