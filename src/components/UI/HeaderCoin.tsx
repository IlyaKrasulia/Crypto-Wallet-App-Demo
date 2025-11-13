import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';

interface IProps {
  icon: ReactNode;
  currency: string;
  title: string;
}

export const HeaderCoin = ({ icon, currency, title }: IProps) => (
  <View>
    <SFlex gap={8}>
      <View style={styles.iconWrapper}>{icon}</View>
      <SText color={Colors.White} textAlign={'center'} type={'h3'}>
        {currency}
      </SText>
    </SFlex>
    <SText color={Colors.Gray} textAlign={'center'} marginTop={5}>
      {title}
    </SText>
  </View>
);

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: Colors.InputBg,
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
