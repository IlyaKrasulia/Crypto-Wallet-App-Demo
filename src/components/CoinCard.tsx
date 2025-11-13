import React, { ReactNode } from 'react';
import { Colors } from 'utils/styles';
import { StyleSheet, Text, View } from 'react-native';
import i18n from 'utils/i18n.config';
import ChechIcon from '@assets/icons/check-blue.svg';
import { SButton } from './Styled/SButton';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

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

export const CoinCard = ({
  currency,
  name,
  amount,
  changePercentage,
  coinPrice,
  icon,
  onPress,
  isActive,
}: CoinType) => {
  const { t } = i18n;
  function wrapInBrackets(num: number): string {
    return `(${num.toLocaleString('en')}$)`;
  }

  const getBalance = (num: number) => {
    if (typeof num !== 'number') {
      return { integerPart: '0', fractionalPart: '00' };
    }

    const [integerPart, fractionalPart] = num.toFixed(2).split('.');

    return { integerPart, fractionalPart };
  };

  return (
    <SButton styleBtn={styles.coinWrapper} onPress={onPress || (() => {})}>
      <SFlex gap={8}>
        <View style={styles.iconWrapper}>
          {isActive ? <ChechIcon width={30} height={30} /> : icon}
        </View>
        <View>
          <SText color={Colors.White} type={'b1Medium'}>
            {currency}
          </SText>
          <SText color={Colors.Gray} type={'b1Medium'}>
            {name}
          </SText>
        </View>
      </SFlex>
      <SFlex gap={12}>
        <SFlex flexDirection={'column'} alignItems={'flex-end'}>
          <SText color={Colors.White} type={'b1'} marginBottom={4}>
            {t('symbols.dollar')}
            {Number(getBalance(amount).integerPart).toLocaleString('en')}
            {Number(getBalance(amount).fractionalPart) !== 0 && (
              <>
                {t('symbols.dot')}
                <Text style={styles.span}>
                  {getBalance(amount).fractionalPart}
                </Text>
              </>
            )}
          </SText>
          <SFlex alignItems={'center'}>
            <SText
              color={changePercentage >= 0 ? Colors.Green : Colors.Red}
              type={'b2'}
            >
              {changePercentage > 0 && '+'}
              {changePercentage}
              {t('symbols.procent')}
              {t('symbols.space')}
            </SText>
            <SText color={Colors.Gray} type={'b2'}>
              {wrapInBrackets(coinPrice)}
            </SText>
          </SFlex>
        </SFlex>
      </SFlex>
    </SButton>
  );
};

const styles = StyleSheet.create({
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
});
