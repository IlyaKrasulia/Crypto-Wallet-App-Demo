import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SText } from 'components/Styled/SText';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'utils/styles';
import { SFlex } from 'components/Styled/SFlex';
import { CustomButton } from 'components/UI/CustomButton';
import { typography } from 'utils/typography';
import i18n from 'utils/i18n.config';
import { InputProps } from './types';

export const StakeOptionInput = ({
  placeholder,
  defaultValue,
  keyboardType,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  onChangeText,
  stakingOptonData,
}: InputProps) => {
  const { t } = i18n;
  const marginStyles = { marginTop, marginBottom, marginLeft, marginRight };

  return (
    <View style={[styles.inputWrapper, marginStyles]}>
      <View>
        <SText color={Colors.White} type={'b2'} marginBottom={8}>
          {t('screens.staking.subscriptionAmount')}
        </SText>
        <View style={styles.stakeInputWrapper}>
          <TextInput
            onChangeText={(e) => {
              onChangeText(e);
            }}
            defaultValue={defaultValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            // onFocus={onFocusHandler}
            // onBlur={onBlurHandler}
            placeholderTextColor={Colors.LightGray}
            style={styles.stakeInput}
          />
          <SFlex alignItems={'center'} gap={8}>
            <SText color={Colors.Gray} type={'h4'}>
              {stakingOptonData?.currency}
            </SText>
            <CustomButton
              text={'Max'}
              textColor={Colors.PrimaryLight}
              background={Colors.transparent}
              onPress={
                stakingOptonData ? stakingOptonData?.onPressMax : () => {}
              }
            />
          </SFlex>
        </View>
        <SFlex gap={3} marginTop={8}>
          <SText color={Colors.Gray}>
            {t('screens.staking.availableBalance')}
          </SText>
          <SText color={Colors.White}>
            {stakingOptonData?.balance}
            {t('symbols.space')}
            {stakingOptonData?.currency}
          </SText>
        </SFlex>
        <SFlex gap={3} marginTop={8}>
          <SText color={Colors.Gray}>
            {t('screens.staking.approximateProfitability')}
          </SText>
          <SText color={Colors.White}>
            {stakingOptonData?.profit}
            {t('symbols.space')}
            {stakingOptonData?.currency}
          </SText>
        </SFlex>
        <SFlex gap={3} marginTop={8}>
          <SText color={Colors.Gray}>{t('screens.staking.maxAmount')}</SText>
          <SText color={Colors.White}>
            {stakingOptonData?.maxAmount}
            {t('symbols.space')}
            {stakingOptonData?.currency}
          </SText>
        </SFlex>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  stakeInputWrapper: {
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    color: Colors.White,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakeInput: {
    ...typography.b1,
    flex: 1,
    bottom: 5,
  },
});
