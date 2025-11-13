import { View, StyleSheet, Image } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Colors, screenHeight, screenWidth } from 'utils/styles';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import BottomShadow from '@assets/images/bottom-blur.png';
import i18n from 'utils/i18n.config';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurBackground } from './UI/BlurBackground';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';
import { BottomSheetHeader } from './BottomSheetHeader';
import { SButton } from './Styled/SButton';

type coin = {
  balance: number;
  coinTitle: string;
  coinFullTitle: string;
};

interface IProps {
  walletName: string;
  data: Array<coin>;
  contentHeight: number;
}

const DATA = [
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
  {
    time: '12:53',
    date: '13.01.2025',
    currency: 'BTC',
    amount: 0.009,
  },
];

export const StakingBottomSheet = ({ contentHeight, data }: IProps) => {
  const { navigate } = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpened, setBottomSheetPoint] = useState(false);
  const { t } = i18n;

  const [searchValue, setSearchValue] = useState('');

  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const startPoint = 100 - (contentHeight / screenHeight) * 100;
  const endPoint = 100 - (headerHeight / screenHeight) * 100;

  const snapPoints = useMemo(
    () => [`${startPoint}%`, `${endPoint}%`],
    [endPoint, startPoint],
  );

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetPoint(index === 1);
  }, []);

  const list = useMemo(() => {
    if (searchValue) {
      return data.filter(
        (coin) =>
          coin.coinFullTitle
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          coin.coinTitle.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return data;
  }, [data, searchValue]);

  const renderItem = useCallback(
    (item: coin) => (
      <SButton
        styleBtn={styles.coinWrapper}
        onPress={() =>
          navigate('StakingInfo', {
            status: 'Staking',
            staked: true,
            data: DATA,
            currency: 'BTC',
            start: '13.01.2025',
          })
        }
      >
        <SFlex gap={8}>
          <View style={styles.iconWrapper}>
            <BitcoinIcon />
          </View>
          <View>
            <SText color={Colors.White} type={'b1Medium'}>
              {item.coinTitle}
            </SText>
            <SText color={Colors.PrimaryLight} type={'b1Medium'}>
              {t('screens.staking.unstaking')}
            </SText>
          </View>
        </SFlex>
        <SFlex flexDirection={'column'} alignItems={'flex-end'}>
          <SText color={Colors.White} type={'b1'} marginBottom={4}>
            {item.balance}
            {t('symbols.space')}
            {item.coinTitle}
          </SText>
          <SText color={Colors.Gray} type={'b2'}>
            {t('screens.staking.apr', { date: '2%' })}
          </SText>
        </SFlex>
      </SButton>
    ),
    [navigate, t],
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetWrapper}
        handleComponent={null}
        // eslint-disable-next-line react/jsx-props-no-spreading
        backgroundComponent={(props) => <BlurBackground {...props} />}
      >
        <BottomSheetHeader
          isOpened={isOpened}
          walletName={''}
          onPress={() => {}}
          onChangeSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <BottomSheetFlatList
          data={list}
          renderItem={({ item }) => renderItem(item)}
          contentContainerStyle={[
            styles.contentContainer,
            { paddingBottom: bottomTabBarHeight + 50 },
          ]}
          style={styles.list}
        />
      </BottomSheet>
      <Image source={BottomShadow} style={styles.bottomShadow} />
    </>
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
  list: {
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
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    width: screenWidth,
  },
});
