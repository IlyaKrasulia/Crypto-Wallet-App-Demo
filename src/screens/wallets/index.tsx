import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AppBackground } from 'components/Layout/AppBackground';
import { SelectWalletItem } from 'components/SelectWalletItem';
import { SButton } from 'components/Styled/SButton';
import { SText } from 'components/Styled/SText';
import React, { FunctionComponent, useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import i18n from 'utils/i18n.config';
import { Colors } from 'utils/styles';

interface Wallet {
  name: string;
  balance: number;
  id: number;
}

const WALLETS: Wallet[] = [
  {
    name: 'Crypto wallet 1',
    balance: 23817.21,
    id: 0,
  },
  {
    name: 'Crypto wallet 2',
    balance: 2317.0,
    id: 1,
  },
];

export const Wallets: FunctionComponent = () => {
  const { navigate } = useNavigation();
  const { t } = i18n;

  const headerHeight = useHeaderHeight();

  const onPress = useCallback(() => {
    navigate('MainTabs');
  }, [navigate]);

  const renderItem: ListRenderItem<Wallet> = useCallback(
    ({ item }) => (
      <SelectWalletItem
        onPress={onPress}
        walletName={item.name}
        balance={item.balance}
      />
    ),
    [onPress],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: Wallet, index: number) => `wallet_${item.id}_${index}`,
    [],
  );

  return (
    <AppBackground>
      <FlatList
        data={WALLETS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={[styles.container]}
        ListFooterComponent={
          <SButton onPress={() => navigate('SignIn')} styleBtn={styles.button}>
            <SText color={Colors.White} type={'h3Bold'} textAlign={'center'}>
              {t('screens.wallets.addWallet')}
            </SText>
          </SButton>
        }
        style={{ marginTop: headerHeight + 16 }}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  button: {
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderColor: Colors.LighterGray,
    padding: 20,
    borderRadius: 24,
    marginTop: 16,
  },

  separator: {
    height: 16,
  },
});
