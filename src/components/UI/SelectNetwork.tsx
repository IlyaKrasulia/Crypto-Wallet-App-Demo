import { SFlex } from 'components/Styled/SFlex';
import { SText } from 'components/Styled/SText';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import ArrowDownIcon from 'assets/icons/arrow-down.svg';
import { SButton } from 'components/Styled/SButton';

interface IProps {
  value: string;
}
const networks = [
  'ERC20 (Ethereum)',
  'SOL (Solana)',
  'BEP20 (Binance Smart Chain)',
];

export const SelectNetwork = ({ value }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.wrapper}>
      <SButton onPress={() => setIsOpen(!isOpen)}>
        <SFlex justifyContent={'space-between'} alignItems={'center'}>
          <SText color={Colors.White} type={'b1'}>
            {value || 'TRC 20 (TRON)'}
          </SText>
          <ArrowDownIcon />
        </SFlex>
      </SButton>

      {isOpen && (
        <View>
          <View style={styles.line} />
          {networks.map((item) => (
            <SFlex gap={8} marginBottom={14} key={item}>
              <View style={styles.round} />
              <SText color={Colors.Gray} type={'b1'}>
                {item}
              </SText>
            </SFlex>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    paddingVertical: 23,
    marginBottom: 14,
  },
  line: {
    borderWidth: 0.7,
    borderColor: Colors.Gray,
    opacity: 0.25,
    marginTop: 20,
    marginBottom: 16,
  },
  round: {
    width: 5,
    height: 5,
    backgroundColor: Colors.Gray,
    borderRadius: 50,
  },
});
