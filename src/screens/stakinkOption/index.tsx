import { AppLayout } from 'components/Layout/AppLayout';
import { Header } from 'components/UI/Header';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BTCIcon from '@assets/icons/bitcoin.svg';
import { StakingOptionTabs } from 'components/StakingOptionTabs';
import { StakingTimeline } from 'components/StakingTimeline';
import { SView } from 'components/Styled/SView';
import { CustomButton } from 'components/UI/CustomButton';
import { StakeOptionInput } from 'components/UI/Inputs/StakeOptionInput';

const TABS = [
  {
    profit: 10,
    deadline: 7,
  },
  {
    profit: 15,
    deadline: 3,
  },
  {
    profit: 6,
    deadline: 30,
  },
  {
    profit: 10,
    deadline: 7,
  },
  {
    profit: 15,
    deadline: 3,
  },
  {
    profit: 6,
    deadline: 30,
  },
];

export const StakingOption = () => {
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  return (
    <AppLayout>
      <View style={styles.container}>
        <Header
          type={'coin'}
          title={'BTC'}
          coinIcon={<BTCIcon />}
          coinFullName={'Bitcoin'}
        />
        <StakingOptionTabs
          data={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <StakeOptionInput
          marginTop={20}
          placeholder={'Min investment: 0.001'}
          onChangeText={(text) => setValue(text)}
          defaultValue={value.toString()}
          stakingOptonData={{
            currency: 'BTC',
            balance: 0.0001,
            profit: 0.00001,
            maxAmount: 100.01,
            onPressMax: () => setValue((0.0001).toString()),
          }}
        />
        <SView marginTop={40} />
        <StakingTimeline />
      </View>
      <SView marginLeft={16} marginRight={16}>
        <CustomButton text={'Subscribe now'} onPress={() => {}} />
      </SView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
});
