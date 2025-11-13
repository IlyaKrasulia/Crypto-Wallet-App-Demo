import { useHeaderHeight } from '@react-navigation/elements';
import { AppBackground } from 'components/Layout/AppBackground';
import { StakingBalance } from 'components/StakingBalance';
import { StakingBottomSheet } from 'components/StakingBottomSheet';
import { StakingList } from 'components/StakingList';
import { SView } from 'components/Styled/SView';
import { CustomTabs } from 'components/UI/CustomTabs';
import { SearchInput } from 'components/UI/Inputs/SearchInput';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

const TABS = ['Staked', 'Available', 'History'];

const DATA_Available = [
  {
    currency: 'BTC',
    amount: 0.01,
    profit: 3,
    title: 'Bitcoin',
  },
  {
    currency: 'BTC',
    amount: 0.1,
    profit: 5,
    title: 'Bitcoin',
  },
  {
    currency: 'ETH',
    amount: 0.5,
    profit: 2,
    title: 'Ethereum',
  },
];

const DATA_History = [
  {
    currency: 'BTC',
    amount: 0.01,
    profit: 3,
    title: 'Bitcoin',
  },
  {
    currency: 'BTC',
    amount: 0.1,
    profit: 5,
    title: 'Bitcoin',
  },
  {
    currency: 'ETH',
    amount: 0.5,
    profit: 2,
    title: 'Ethereum',
  },
  {
    currency: 'ETH',
    amount: 0.5,
    profit: 2,
    title: 'Ethereum',
  },
];

export const Staking = () => {
  const headerHeight = useHeaderHeight();

  const [viewHeight, setViewHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue('');
  }, [activeTab]);

  return (
    <AppBackground>
      <View
        style={[styles.container, { paddingTop: headerHeight }]}
        onLayout={handleLayout}
      >
        <CustomTabs
          data={TABS}
          activeItem={activeTab}
          setActiveItem={setActiveTab}
        />
        <SView marginTop={18} />
        {activeTab === 'Staked' ? (
          <StakingBalance type={'general'} profit={5} amount={1} />
        ) : null}
        {activeTab !== 'Staked' ? (
          <SearchInput
            defaultValue={searchValue}
            onChangeText={(text) => setSearchValue(text)}
            placeholder={'Search'}
          />
        ) : null}
      </View>
      {activeTab === 'Staked' ? (
        <StakingBottomSheet
          contentHeight={viewHeight}
          walletName={'Wallet 1'}
          data={[
            { coinTitle: 'BTC', coinFullTitle: 'Bitcoin', balance: 103300.21 },
            { coinTitle: 'BTC', coinFullTitle: 'Bitcoin', balance: 13300.21 },
            { coinTitle: 'BTC', coinFullTitle: 'Bitcoin', balance: 13300.21 },
            { coinTitle: 'BTC', coinFullTitle: 'Bitcoin', balance: 13300.21 },
            { coinTitle: 'BTC', coinFullTitle: 'Bitcoin', balance: 13300.21 },
          ]}
        />
      ) : null}
      {activeTab === 'Available' ? (
        <StakingList
          data={DATA_Available}
          type={'Available'}
          searchValue={searchValue}
        />
      ) : null}
      {activeTab === 'History' ? (
        <StakingList
          data={DATA_History}
          type={'History'}
          searchValue={searchValue}
        />
      ) : null}
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});
