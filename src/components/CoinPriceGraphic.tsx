import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ArrowIcon from '@assets/icons/show-arrow.svg';
import { Colors, screenHeight, screenWidth } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';
import { SButton } from './Styled/SButton';

const RANGE_BUTTONS = ['1 H', '1 D', '1 W', '1 M', '1 Y', 'All'];

interface IProps {
  isOpened: boolean;
  onPress(): void;
  setGraphRange: React.Dispatch<React.SetStateAction<string>>;
  graphRange: string;
  coin?: string;
  price?: string;
  profit?: string;
}

const data = {
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

const chartSmConfig = {
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
  strokeWidth: 7,
};

export const CoinPriceGraphic = ({
  isOpened,
  onPress,
  setGraphRange,
  graphRange,
  coin = 'BTC',
  price = '100 000$',
  profit = '+10%',
}: IProps) => {
  const { t } = i18n;

  return (
    <Pressable
      style={[
        styles.blockWrapper,
        isOpened ? styles.graphicOpened : styles.graphicClosed,
      ]}
    >
      {!isOpened && (
        <Pressable onPress={onPress}>
          <SFlex justifyContent={'space-between'} alignItems={'center'}>
            <View>
              <SText type={'b2Bold'} color={Colors.White} opacity={0.7}>
                {t('screens.coin.coinPrice', { currency: coin })}
              </SText>
              <SFlex gap={5} marginTop={5}>
                <SText type={'b1Bold'} color={Colors.White}>
                  {price}
                </SText>
                <SText type={'b1Bold'} color={Colors.Green}>
                  {profit}
                </SText>
                <View style={styles.chartWrapper}>
                  <LineChart
                    data={data}
                    width={200}
                    height={100}
                    chartConfig={chartSmConfig}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                    withOuterLines={false}
                  />
                </View>
              </SFlex>
            </View>
            <ArrowIcon />
          </SFlex>
        </Pressable>
      )}
      {isOpened && (
        <>
          <Pressable>
            <SFlex alignItems={'center'} justifyContent={'space-between'}>
              <View style={styles.emptySrape} />
              <SText type={'b1Bold'} color={Colors.White}>
                {t('screens.coin.coinPrice', { currency: 'BTC' })}
              </SText>
              <ArrowIcon transform={'rotate(180)'} />
            </SFlex>
          </Pressable>
          <SFlex gap={8} marginTop={20} alignItems={'flex-end'}>
            <SText type={'h2'} color={Colors.White}>
              {price}
            </SText>
            <SText type={'b1Bold'} color={Colors.Green}>
              {profit}
            </SText>
          </SFlex>
          <View style={styles.chartBigWrapper}>
            <LineChart
              data={data}
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
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    borderRadius: 24,
    padding: 16,
    marginTop: 10,
  },
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
  chartWrapper: {
    width: 30,
    height: 10,
    transform: [{ scaleX: 0.2 }, { scaleY: 0.2 }],
    bottom: 10,
    right: 20,
  },
  chartBig: {
    top: 25,
    left: '55%',
    right: '50%',
    transform: [{ translateX: '-50%' }],
  },
  chartBigWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySrape: {
    width: 13,
  },
  graphicOpened: {
    flex: 1,
  },
  graphicClosed: {
    flex: 0,
  },
});
