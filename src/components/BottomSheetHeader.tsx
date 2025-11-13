import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { SText } from './Styled/SText';
import { SearchInput } from './UI/SearchInput';

interface IProps {
  isOpened: boolean;
  walletName: string;
  onPress: () => void;
  onChangeSearchValue?(value: string): void;
  searchValue?: string;
}

export const BottomSheetHeader = ({
  isOpened,
  walletName,
  onPress,
  onChangeSearchValue,
  searchValue,
}: IProps) => (
  <View style={styles.header}>
    <View style={styles.wrapper}>
      <SText color={Colors.White} type={'h3'}>
        {isOpened && walletName}
      </SText>
    </View>

    <View style={styles.modalLine} />

    <View style={styles.wrapper}>
      {onChangeSearchValue ? (
        <SearchInput
          onPress={onPress}
          defaultValue={searchValue || ''}
          onChangeText={onChangeSearchValue}
        />
      ) : null}
    </View>
  </View>
);

export const BottomSheetHeaderWrapper =
  (props: IProps) => (handleProps: BottomSheetHandleProps) =>
    (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <BottomSheetHeader {...props} {...handleProps} />
    );

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalLine: {
    width: 45,
    height: 5,
    borderRadius: 20,
    backgroundColor: Colors.White,
  },
});
