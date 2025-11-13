import { SButton } from 'components/Styled/SButton';
import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'utils/styles';

interface IProps {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}

export const HomeButton = ({ title, icon, onPress }: IProps) => (
  <SButton onPress={onPress} styleBtn={styles.actionButton}>
    <SFlex alignItems={'center'} gap={4}>
      {icon}
      <SText type={'b2'} color={Colors.White}>
        {title}
      </SText>
    </SFlex>
  </SButton>
);

const styles = StyleSheet.create({
  actionButton: {
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    backgroundColor: Colors.InputBg,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
  },
});
