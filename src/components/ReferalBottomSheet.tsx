import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import { Colors, screenHeight } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurBackground } from './UI/BlurBackground';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';
import { BottomSheetHeader } from './BottomSheetHeader';
import { SButton } from './Styled/SButton';

type Transaction = {
  date: string;
  currency: string;
  name: string;
  amount: number;
  changePercentage: number;
  changeAmount: number;
};

interface IProps {
  walletName: string;
  data: Array<Transaction>;
  viewHeight: number;
}

interface SectionData {
  title: string;
  data: Transaction[];
}

export const ReferalBottomSheet = ({ viewHeight, data }: IProps) => {
  const { t } = i18n;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetPoint, setBottomSheetPoint] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const startPoint = 100 - ((viewHeight + 10) / screenHeight) * 100;
  const endPoint = 100 - (headerHeight / screenHeight) * 100;

  const snapPoints = useMemo(
    () => [`${startPoint}%`, `${endPoint}%`],
    [endPoint, startPoint],
  );

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetPoint(index === 1);
  }, []);

  const getBalance = (num: number) => {
    if (typeof num !== 'number') {
      return { integerPart: '0', fractionalPart: '00' };
    }

    const [integerPart, fractionalPart] = num.toFixed(2).split('.');

    return { integerPart, fractionalPart };
  };

  const sectionData = useMemo<SectionData[]>(() => {
    const filteredTransactions = data.filter((transaction) => {
      const query = searchValue.toLowerCase();
      return (
        transaction.currency.toLowerCase().includes(query) ||
        transaction.name.toLowerCase().includes(query)
      );
    });

    const grouped: { [date: string]: Transaction[] } = {};
    filteredTransactions.forEach((transaction) => {
      if (!grouped[transaction.date]) {
        grouped[transaction.date] = [];
      }
      grouped[transaction.date].push(transaction);
    });

    return Object.entries(grouped).map(([date, historyData]) => ({
      title: date,
      data: historyData,
    }));
  }, [data, searchValue]);

  const renderItem = useCallback(
    (item: Transaction) => (
      <SButton
        styleBtn={styles.coinWrapper}
        onPress={() => {}}
        key={Math.random()}
      >
        <SFlex gap={8}>
          <View style={styles.iconWrapper}>
            <BitcoinIcon />
          </View>
          <View>
            <SText color={Colors.White} type={'b1Medium'}>
              {item?.currency}
            </SText>
            <SText color={Colors.Gray} type={'b1Medium'}>
              {item?.name}
            </SText>
          </View>
        </SFlex>
        <SFlex flexDirection={'column'} alignItems={'flex-end'}>
          <SText color={Colors.White} type={'b1'} marginBottom={4}>
            {t('symbols.dollar')}
            {Number(getBalance(item?.amount).integerPart).toLocaleString('en')}
            {Number(getBalance(item?.amount).fractionalPart) !== 0 && (
              <>
                {t('symbols.dot')}
                <Text style={styles.span}>
                  {getBalance(item?.amount).fractionalPart}
                </Text>
              </>
            )}
          </SText>
          <SFlex alignItems={'center'}>
            <SText color={Colors.Green} type={'b2'}>
              {item.changePercentage}
              {t('symbols.procent')}
              {t('symbols.space')}
            </SText>
            <SText color={Colors.Gray} type={'b2'}>
              {t('symbols.dollar')}
              {item.changeAmount}
            </SText>
          </SFlex>
        </SFlex>
      </SButton>
    ),
    [t],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      onChange={handleSheetChanges}
      backgroundStyle={styles.bottomSheetWrapper}
      handleComponent={null}
      // eslint-disable-next-line react/jsx-props-no-spreading
      backgroundComponent={(props) => <BlurBackground {...props} />}
    >
      <BottomSheetHeader
        isOpened={bottomSheetPoint}
        walletName={''}
        onPress={() => {}}
        onChangeSearchValue={setSearchValue}
        searchValue={searchValue}
      />

      <BottomSheetSectionList
        sections={sectionData}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <SText type={'b1'} color={Colors.White} marginBottom={6}>
            {title}
          </SText>
        )}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: bottomTabBarHeight + 50 },
        ]}
        style={styles.list}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    marginHorizontal: 16,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    borderRadius: 24,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
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
  span: {
    opacity: 0.5,
  },
  list: {
    paddingHorizontal: 16,
  },
});
