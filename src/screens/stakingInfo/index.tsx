import { AppLayout } from 'components/Layout/AppLayout';
import { Header } from 'components/UI/Header';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import BTCIcon from '@assets/icons/bitcoin.svg';
import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import { StakingBalance } from 'components/StakingBalance';
import { StakingInfoList } from 'components/StakingInfoList';
import { RouteProp } from '@react-navigation/native';
import i18n from 'utils/i18n.config';
import { RootStackParamList } from 'navigation/rootStack';

interface Props {
  route: RouteProp<RootStackParamList, 'StakingInfo'>;
}

export const StakingInfo: FunctionComponent<Props> = ({ route }) => {
  const params = route?.params;
  const { t } = i18n;

  return (
    <AppLayout>
      <View style={styles.container}>
        <Header
          type={'stake'}
          title={params.currency}
          coinIcon={<BTCIcon />}
          status={params?.status}
          staked={params?.staked}
        />
        <SText
          type={'b1Bold'}
          color={Colors.White}
          textAlign={'center'}
          marginTop={14}
          marginBottom={14}
        >
          {params.status === 'Staking'
            ? t('screens.staking.endStaking', { date: params.end })
            : `${params.start} - ${params.end}`}
        </SText>
        <StakingBalance
          amount={1000}
          coin={'BTC'}
          profit={6}
          startValue={0.0004}
          type={'info'}
        />
        <StakingInfoList data={params ? params.data : []} />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
});
