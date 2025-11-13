import { StyleSheet } from 'react-native';
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Colors, screenHeight } from 'utils/styles';
import BitcoinIcon from '@assets/icons/bitcoin.svg';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurBackground } from './UI/BlurBackground';
import { BottomSheetHeader } from './BottomSheetHeader';
import { CoinCard } from './CoinCard';

interface CoinType {
  currency: string;
  name: string;
  amount: number;
  changePercentage: number;
  coinPrice: number;
  icon: ReactNode;
  onPress?: () => void;
  isActive?: boolean;
}

interface IProps {
  walletName: string;
  data: Array<CoinType>;
  contenteight: number;
}

export const HomeBottomSheet = ({ data, contenteight }: IProps) => {
  const { navigate } = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetPoint, setBottomSheetPoint] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const startPoint = 100 - (contenteight / screenHeight) * 100;
  const endPoint = 100 - (headerHeight / screenHeight) * 100;

  const snapPoints = useMemo(
    () => [`${startPoint}%`, `${endPoint}%`],
    [endPoint, startPoint],
  );

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetPoint(index === 1);
  }, []);

  const coins = useMemo(() => {
    if (searchValue) {
      return data.filter(
        (coin) =>
          coin.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
          coin.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return data;
  }, [data, searchValue]);

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

      <BottomSheetFlatList
        data={coins}
        renderItem={({ item }) => (
          <CoinCard
            currency={item.currency}
            name={item.name}
            amount={item.amount}
            changePercentage={item.changePercentage}
            coinPrice={item.coinPrice}
            icon={<BitcoinIcon />}
            onPress={() =>
              navigate('Coin', {
                balance: item.amount,
                coinFullTitle: item.name,
                coinTitle: item.currency,
              })
            }
          />
        )}
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
  list: {
    paddingHorizontal: 16,
  },
});
