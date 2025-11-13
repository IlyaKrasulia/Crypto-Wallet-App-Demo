import { SButton } from 'components/Styled/SButton';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import { CustomButton } from 'components/UI/CustomButton';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors, screenHeight, screenWidth } from 'utils/styles';
import TradeIcon from '@assets/icons/trade-sm.svg';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import ChechIcon from '@assets/icons/check-blue.svg';
import BottomShadow from '@assets/images/bottom-blur.png';
import i18n from 'utils/i18n.config';
import { SearchInput } from 'components/UI/Inputs/SearchInput';
import { AppBackground } from 'components/Layout/AppBackground';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from 'navigation/rootStack';

interface CoinType {
  date: string;
  currency: string;
  name: string;
  amount: number;
  changePercentage: number;
  changeAmount: number;
}

const Data: CoinType[] = [
  {
    date: '03.01.2025',
    currency: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    changePercentage: 2.3,
    changeAmount: 12,
  },
  {
    date: '03.01.2025',
    currency: 'ETH',
    name: 'Ethereum',
    amount: 1.2,
    changePercentage: -1.5,
    changeAmount: -15,
  },
  {
    date: '03.01.2025',
    currency: 'LTC',
    name: 'Litecoin',
    amount: 10,
    changePercentage: 0.8,
    changeAmount: 2.5,
  },
  {
    date: '02.01.2025',
    currency: 'XRP',
    name: 'Ripple',
    amount: 500,
    changePercentage: -0.7,
    changeAmount: -3.5,
  },
  {
    date: '02.01.2025',
    currency: 'ADA',
    name: 'Cardano',
    amount: 300,
    changePercentage: 1.2,
    changeAmount: 3.6,
  },
  {
    date: '01.01.2025',
    currency: 'DOGE',
    name: 'Dogecoin',
    amount: 1000,
    changePercentage: 5.0,
    changeAmount: 50,
  },
  {
    date: '01.01.2025',
    currency: 'SOL',
    name: 'Solana',
    amount: 20,
    changePercentage: -2.0,
    changeAmount: -4,
  },
  {
    date: '01.01.2025',
    currency: 'DOT',
    name: 'Polkadot',
    amount: 15,
    changePercentage: 3.1,
    changeAmount: 5.4,
  },
  {
    date: '31.12.2024',
    currency: 'MATIC',
    name: 'Polygon',
    amount: 50,
    changePercentage: 1.5,
    changeAmount: 2.3,
  },
  {
    date: '31.12.2024',
    currency: 'BNB',
    name: 'Binance Coin',
    amount: 8,
    changePercentage: -1.0,
    changeAmount: -3,
  },
];

interface Props {
  navigation: RootStackNavigationProp<'SelectCoin'>;
  route: RouteProp<RootStackParamList, 'SelectCoin'>;
}

export const SelectCoin: FunctionComponent<Props> = ({ navigation, route }) => {
  const { t } = i18n;
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const [sortedData, setSortedData] = useState<CoinType[]>(Data);
  const [isAscending, setIsAscending] = useState(true);

  const { type } = route.params;

  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [searchValue, _] = useState('');
  const getBalance = (num: number) => {
    if (typeof num !== 'number') {
      return { integerPart: '0', fractionalPart: '00' };
    }

    const [integerPart, fractionalPart] = num.toFixed(2).split('.');

    return { integerPart, fractionalPart };
  };

  const onPress = useCallback(() => {
    switch (type) {
      case 'send':
        navigation.navigate("SendCrypto", { currency: selectedCoin });
        break;
      case 'receive':
        navigation.navigate('ReceiveAddress', { currency: selectedCoin });
        break;
      case 'swap':
        navigation.navigate('Swap');
        break;
    }
  }, [navigation, selectedCoin, type]);

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) => 
      isAscending ? a.amount - b.amount : b.amount - a.amount
    );
    setSortedData(sorted);
    setIsAscending(!isAscending);
  };

  const handleSearch = (query: string) => {
    const filteredData = Data.filter(
      (coin) =>
        coin.currency.toLowerCase().includes(query.toLowerCase()) ||
        coin.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedData(filteredData);
  };

  const renderItem = useCallback(
    (item: CoinType) => (
      <SButton
        styleBtn={
          selectedCoin === item.currency
            ? styles.activeCoin
            : styles.coinWrapper
        }
        onPress={() => setSelectedCoin(item.currency)}
      >
        <SFlex gap={8}>
          <View style={styles.iconWrapper}>
            <BitcoinIcon />
          </View>
          <View>
            <SText color={Colors.White} type={'b1Medium'}>
              {item.currency}
            </SText>
            <SText color={Colors.Gray} type={'b1Medium'}>
              {item.name}
            </SText>
          </View>
        </SFlex>
        <SFlex gap={12}>
          <SFlex flexDirection={'column'} alignItems={'flex-end'}>
            <SText color={Colors.White} type={'b1'} marginBottom={4}>
              {t('symbols.dollar')}
              {Number(getBalance(item.amount).integerPart).toLocaleString('en')}
              {Number(getBalance(item.amount).fractionalPart) !== 0 && (
                <>
                  {t('symbols.dot')}
                  <Text style={styles.span}>
                    {getBalance(item.amount).fractionalPart}
                  </Text>
                </>
              )}
            </SText>
            <SFlex alignItems={'center'}>
              <SText
                color={item.changePercentage >= 0 ? Colors.Green : Colors.Red}
                type={'b2'}
              >
                {item.changePercentage > 0 && '+'}
                {t('symbols.space')}
                {item.changePercentage}
                {t('symbols.procent')}
              </SText>
              <SText color={Colors.Gray} type={'b2'}>
                {item.changeAmount > 0 ? '+' : '-'}
                {t('symbols.dollar')}
                {item.changeAmount < 0
                  ? item.changeAmount.toString().slice(1)
                  : item.changeAmount}
              </SText>
            </SFlex>
          </SFlex>
          {selectedCoin === item.currency && <ChechIcon />}
        </SFlex>
      </SButton>
    ),
    [selectedCoin, t],
  );

  return (
    <AppBackground>
      <View style={[styles.container, { marginTop: headerHeight + 8 }]}>
        <SearchInput
          placeholder={'Search Tokens'}
          onChangeText={(text) => handleSearch(text)}
          defaultValue={searchValue}
        />
        <View style={styles.transactionsListWrapper}>
          <View style={styles.listWrapper}>
            <SFlex justifyContent={'space-between'} alignItems={'center'}>
              <SText type={'h3'} color={Colors.White}>
                {t('screens.selectCoin.yourAssets')}
              </SText>
              <SButton onPress={handleSort} styleBtn={styles.sortWrapper}>
                <SText type={'t1Bold'} color={Colors.White}>
                  {t('screens.selectCoin.votingPower')}
                </SText>
                <TradeIcon />
              </SButton>
            </SFlex>
            <FlatList
              data={sortedData}
              renderItem={({ item }) => renderItem(item)}
              style={styles.list}
              keyExtractor={(item, index) => item.currency + index}
              contentContainerStyle={{
                paddingBottom: 62 + bottom,
              }}
            />
          </View>
        </View>
        <View style={[styles.footer, { bottom: bottom + 16 }]}>
          <CustomButton
            text={t('buttons.continue')}
            onPress={onPress}
            btnStyle={styles.submitBtn}
          />
        </View>
      </View>
      <Image source={BottomShadow} style={styles.bottomShadow} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  transactionsListWrapper: {
    position: 'relative',
    flex: 1,
    marginTop: 12,
  },
  listWrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    flex: 1,
    width: screenWidth - 32,
    height: screenHeight - 200,
    position: 'absolute',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    width: screenWidth,
  },
  sortWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 16,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    backgroundColor: Colors.InputBg,
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCoin: {
    backgroundColor: Colors.LighterGray,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  span: {
    opacity: 0.5,
  },
  submitBtn: {
    zIndex: 99999,
  },
  list: {
    marginTop: 16,
    marginBottom: 40,
  },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
});