import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Colors, screenWidth } from 'utils/styles';
import TradeIcon from '@assets/icons/trade.svg';
import BottomShadow from '@assets/images/bottom-blur.png';
import i18n from 'utils/i18n.config';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';
import { SButton } from './Styled/SButton';
import { StakingListItem } from './StakingListItem';

interface DataType {
  currency: string;
  amount: number;
  profit: number;
  title: string;
}

interface IProps {
  data: DataType[];
  type: 'Available' | 'History';
  searchValue: string;
}

export const  StakingList = ({ data, type, searchValue }: IProps) => {
  const { t } = i18n;
  const [list, setList] = useState(data);
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) =>
      isAscending ? a.profit - b.profit : b.profit - a.profit,
    );
    setList(sortedData);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const filteredData = data.filter(
      (coin) =>
        coin.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setList(filteredData);
  }, [data, searchValue])

  return (
    <>
      <View style={[styles.wrapper, styles.opacityContainer]}>
        <SFlex justifyContent={'space-between'} alignItems={'center'}>
          <SText color={Colors.White} type={'h3'}>
            {t('screens.staking.available')}
          </SText>
          <SButton onPress={handleSort} styleBtn={styles.headerButton}>
            <SText color={Colors.White} type={'t1Bold'}>
              {t('screens.staking.votingPower')}
            </SText>
            <TradeIcon transform={'rotate(90)'} height={12} width={12} />
          </SButton>
        </SFlex>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <StakingListItem
              currency={item.currency}
              amount={item.amount}
              profit={item.profit}
              title={item.title}
              type={type}
            />
          )}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <Image source={BottomShadow} style={styles.bottomShadow} />
    </>
  );
};

const styles = StyleSheet.create({
  opacityContainer: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
  },
  wrapper: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 24,
    flex: 1,
  },
  headerButton: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  list: {
    marginBottom: 50,
    marginTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    opacity: 1,
    width: screenWidth,
  },
});
