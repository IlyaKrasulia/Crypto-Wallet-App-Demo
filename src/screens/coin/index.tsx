import { AppLayout } from 'components/Layout/AppLayout';
import { SFlex } from 'components/Styled/SFlex';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, screenHeight, screenWidth } from 'utils/styles';
import SendIcon from '@assets/icons/arrow-up.svg';
import { Header } from 'components/UI/Header';
import { RouteProp } from '@react-navigation/native';
import BTCIcon from '@assets/icons/bitcoin.svg';
import { TransactionsItem } from 'components/TransactionsItem';
import { CoinPriceGraphic } from 'components/CoinPriceGraphic';
import { HomeButton } from 'components/UI/HomeButton';
import TradeIcon from '@assets/icons/trade.svg';
import { BlurContainer } from 'components/Styled/BlurContainer';
import { HomeBalance } from 'components/HomeBalance';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from 'navigation/rootStack';
import { SView } from 'components/Styled/SView';
import { BottomSheetModal } from 'components/bottomSheetModal';
import { SText } from 'components/Styled/SText';
import { SButton } from 'components/Styled/SButton';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';

interface CoinType {
  date: {
    time: string;
    date: string;
  };
  coin: string;
  transactionType: 'send' | 'receive' | 'swap';
  amount: number;
}

const DATA: CoinType[] = [
  {
    date: { time: '9:41', date: '26.12.2024' },
    coin: 'BTC',
    transactionType: 'send',
    amount: 0.5,
  },
];

const RANGE_BUTTONS = ['1 H', '1 D', '1 W', '1 M', '1 Y', 'All'];

const chartData = {
  labels: [],
  datasets: [
    {
      data: [34, 12, 55, 22, 12, 2, 80],
    },
  ],
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0,
  color: () => Colors.Green,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '0',
    strokeWidth: '0',
  },
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 0,
};

interface Props {
  navigation: RootStackNavigationProp<'Coin'>;
  route: RouteProp<RootStackParamList, 'Coin'>;
}

export const Coin: FunctionComponent<Props> = ({ route, navigation }) => {
  const data = route?.params;
  const [graphRange, setGraphRange] = useState('1 H');

  const { t } = useTranslation();

  const [showChart, setShowChart] = useState(false);

  const handleOpenChart = useCallback(() => {
    setShowChart(true);
  }, []);

  const handleCloseChart = useCallback(() => {
    setShowChart(false);
  }, []);

  const renderItem = (item: CoinType) => (
    <TransactionsItem
      coin={item.coin}
      amount={item.amount}
      date={item.date.date}
      type={item.transactionType}
    />
  );

  return (
    <AppLayout>
      <View style={styles.container}>
        <Header
          type={'coin'}
          title={data?.coinTitle}
          coinFullName={data?.coinFullTitle}
          coinIcon={<BTCIcon />}
        />
        <SView marginBottom={10} />
        <HomeBalance amount={data ? data.balance : 0} />
        <BlurContainer padding={4} marginTop={10} radius={24}>
          <SFlex gap={4}>
            <HomeButton
              title={'Send'}
              icon={<SendIcon />}
              onPress={() =>
                navigation.navigate('SendCrypto', { currency: data.coinTitle })
              }
            />
            <HomeButton
              title={'Receive'}
              icon={<SendIcon transform={'rotate(180)'} />}
              onPress={() =>
                navigation.navigate('ReceiveAddress', {
                  currency: data.coinTitle,
                })
              }
            />
            <HomeButton
              title={'Convert'}
              icon={<TradeIcon />}
              onPress={() => navigation.navigate('Swap')}
            />
          </SFlex>
        </BlurContainer>
        <View style={styles.blockWrapper}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => renderItem(item)}
            style={styles.list}
          />
        </View>
        <CoinPriceGraphic
          isOpened={false}
          onPress={handleOpenChart}
          graphRange={graphRange}
          setGraphRange={setGraphRange}
        />

        <BottomSheetModal
          isShown={showChart}
          onClose={handleCloseChart}
          title={t('screens.coin.coinPrice', { currency: 'BTC' })}
          content={
            <View style={styles.chart}>
              <SFlex gap={8} marginTop={20} alignItems={'flex-end'}>
                <SText type={'h2'} color={Colors.White}>
                  {'100 000$'}
                </SText>
                <SText type={'b1Bold'} color={Colors.Green}>
                  {'+10%'}
                </SText>
              </SFlex>
              <View style={styles.chartBigWrapper}>
                <LineChart
                  data={chartData}
                  width={screenWidth * 1.05}
                  height={screenHeight * 0.4}
                  chartConfig={chartConfig}
                  withVerticalLabels={false}
                  withHorizontalLabels={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  style={styles.chartBig}
                />
              </View>
              <SFlex flexWrap={'wrap'} gap={16}>
                {RANGE_BUTTONS.map((item) => (
                  <SButton
                    onPress={() => setGraphRange(item)}
                    key={item}
                    styleBtn={
                      graphRange === item
                        ? styles.rangeButtonActive
                        : styles.rangeButton
                    }
                  >
                    <SText type={'b2'} color={Colors.White}>
                      {item}
                    </SText>
                  </SButton>
                ))}
              </SFlex>
            </View>
          }
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginTop: 0,
    flex: 1,
  },
  blockWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    borderRadius: 24,
    padding: 16,
    marginTop: 10,
    flex: 1,
  },
  list: {
    marginBottom: 16,
  },
  chart: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  chartBig: {
    top: 25,
  },
  chartBigWrapper: {},
  rangeButton: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  rangeButtonActive: {
    backgroundColor: Colors.PrimaryOpacity,
    borderColor: Colors.PrimaryLight,
    borderWidth: 1,
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
