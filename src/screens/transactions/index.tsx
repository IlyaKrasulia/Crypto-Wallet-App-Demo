import { FlatList, StyleSheet, View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { AppLayout } from 'components/Layout/AppLayout';
import { Header } from 'components/UI/Header';
import { TransactionsItem } from 'components/TransactionsItem';

interface TransactionType {
  coin: string;
  amount: number;
  date: string;
  type: 'send' | 'receive' | 'swap';
  status?: 'pending' | undefined;
  swapAssets?: {
    coin: string;
    amount: number;
    fee: string;
  };
}

const DATA: TransactionType[] = [
  { coin: 'BTC', amount: 0.005, date: '25.12.2024', type: 'send' },
  { coin: 'BTC', amount: 0.005, date: '25.12.2024', type: 'receive' },
  {
    coin: 'BTC',
    amount: 1.01,
    date: '26.12.2024',
    type: 'swap',
    status: 'pending',
    swapAssets: {
      coin: 'USDT',
      amount: 100000,
      fee: '26.12.2024',
    },
  },
  {
    coin: 'BTC',
    amount: 1.01,
    date: '26.12.2024',
    type: 'swap',
    swapAssets: {
      coin: 'USDT',
      amount: 100000,
      fee: '26.12.2024',
    },
  },
];

const renderItem = (item: TransactionType) => (
  <TransactionsItem
    coin={item.coin}
    amount={item.amount}
    date={item.date}
    type={item.type}
    swapAssets={item.swapAssets}
    status={item.status}
  />
);

export const Transactions: FunctionComponent = () => (
  <AppLayout>
    <View style={styles.container}>
      <Header type={'back-big'} title={'Transactions'} />
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => renderItem(item)}
          style={styles.itemsWrapper}
          contentContainerStyle={styles.items}
        />
      </View>
    </View>
  </AppLayout>
);

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  items: {
    gap: 25,
    paddingBottom: 50,
  },
  itemsWrapper: {
    marginVertical: 16,
  },
});
