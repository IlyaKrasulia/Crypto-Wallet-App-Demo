import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { SFlex } from './Styled/SFlex';
import { SText } from './Styled/SText';

const data = [
  { title: 'Subscription time', date: '2025-01-06 13:05:05' },
  { title: 'Subscription time', date: '2025-01-07 13:05:05' },
  { title: 'Subscription time', date: '2025-01-08 13:05:05' },
  { title: 'Subscription time', date: '2025-01-09 13:05:05' },
];

export const StakingTimeline = () => {
  const { t } = i18n;

  return (
    <View>
      <SFlex justifyContent={'space-between'}>
        <SText color={Colors.White} type={'b2'}>
          {t('screens.staking.timeline')}
        </SText>
        <View style={styles.infoWrapper}>
          <SText color={Colors.PrimaryLight} type={'t1'} textAlign={'center'}>
          {t('screens.staking.interestAccruedHourly')}
          </SText>
        </View>
      </SFlex>
      <View style={styles.line} />
      <FlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.timelineContainer}>
              <View style={styles.circle} />
              {index !== data.length - 1 && (
                <View style={styles.itemLineBottom} />
              )}
            </View>
            <View>
              <SText color={Colors.White} type={'b2'}>
                {item.title}
              </SText>
              <SText color={Colors.Gray} type={'t1'}>
                {item.date}
              </SText>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    backgroundColor: Colors.PrimaryOpacity,
    width: 190,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  line: {
    borderColor: Colors.White,
    borderWidth: 0.5,
    opacity: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 10,
    width: 20,
    position: 'relative',
    top: 10,
  },
  itemLineBottom: {
    position: 'absolute',
    top: '30%',
    bottom: 0,
    left: 9,
    width: 1,
    backgroundColor: Colors.Gray,
    height: '140%',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.Gray,
    zIndex: 1,
  },
});
