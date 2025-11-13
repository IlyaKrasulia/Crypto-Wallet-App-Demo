import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import { StakingInfoItem } from './StakingInfoItem';

interface DataType {
  time: string;
  date: string;
  currency: string;
  amount: number;
}

interface IProps {
  data: DataType[];
}

export const StakingInfoList = ({ data }: IProps) => (
  <View style={styles.wrapper}>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <StakingInfoItem
          time={item.time}
          date={item.date}
          currency={item.currency}
          amount={item.amount}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginTop: 13,
    flex: 1,
  },
});
