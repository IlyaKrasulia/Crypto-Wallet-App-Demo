import { SButton } from 'components/Styled/SButton';
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import BackIcon from 'assets/icons/arrow-left.svg';
import { SText } from 'components/Styled/SText';
import { Colors } from 'utils/styles';
import BellIcon from 'assets/icons/bell.svg';
import { SFlex } from 'components/Styled/SFlex';
import { useNavigation } from '@react-navigation/native';
import SettingsIcon from 'assets/icons/settings.svg';
import HistoryIcon from 'assets/icons/bitcoin-convert.svg';
import ArrowDown from 'assets/icons/arrow-down.svg';
import { HeaderCoin } from './HeaderCoin';
import { HeaderUnstakeButton } from './HeaderUnstakeButton';

interface IProps {
  type: 'back' | 'back-big' | 'main' | 'home' | 'coin' | 'stake';
  title?: string;
  rightElem?: ReactNode;
  coinFullName?: string;
  coinIcon?: ReactNode;
  status?: string;
  staked?: boolean;
}

export const Header = ({
  type,
  title,
  rightElem,
  coinFullName,
  coinIcon,
  status,
  staked,
}: IProps) => {
  const { goBack, navigate } = useNavigation();

  return (
    <View style={styles.header}>
      <View>
        {type === 'back' && (
          <View style={styles.backHeader}>
            <SButton onPress={() => goBack()}>
              <BackIcon />
            </SButton>
            <SText
              color={Colors.White}
              textAlign={'center'}
              type={type === 'back' ? 'b1Medium' : 'h3'}
            >
              {title}
            </SText>
            <View>{rightElem && rightElem}</View>
          </View>
        )}
        {type === 'back-big' && (
          <View style={styles.backHeader}>
            <SButton onPress={() => goBack()} styleBtn={styles.headerBtn}>
              <BackIcon />
            </SButton>
            <SText color={Colors.White} textAlign={'center'} type={'h3'}>
              {title}
            </SText>
            <View style={styles.emptySpace} />
          </View>
        )}
      </View>
      <View>
        {type === 'main' && (
          <SButton
            onPress={() => {}}
            styleBtn={(styles.headerBtn, styles.headerBtnBig)}
          >
            <BellIcon />
          </SButton>
        )}
      </View>
      {type === 'home' && (
        <>
          <SButton onPress={() => {}} styleBtn={styles.headerBtn}>
            <SettingsIcon />
          </SButton>
          <SFlex flex={1} justifyContent={'center'}>
            <SButton onPress={() => navigate('Wallets')}>
              <SFlex alignItems={'center'} gap={10}>
                <SText color={Colors.White} type={'h3'}>
                  {title}
                </SText>
                <ArrowDown />
              </SFlex>
            </SButton>
          </SFlex>
          <SButton
            onPress={() => navigate('Transactions')}
            styleBtn={styles.headerBtn}
          >
            <HistoryIcon />
          </SButton>
        </>
      )}
      {type === 'coin' && (
        <View style={styles.backHeader}>
          <SButton onPress={() => goBack()} styleBtn={styles.headerBtn}>
            <BackIcon />
          </SButton>
          <HeaderCoin
            icon={coinIcon}
            title={coinFullName || 'Bitcoin'}
            currency={title || 'BTC'}
          />
          <View style={styles.emptySpace} />
        </View>
      )}
      {type === 'stake' && (
        <View style={styles.backHeader}>
          <SButton onPress={() => goBack()} styleBtn={styles.headerBtn}>
            <BackIcon />
          </SButton>
          <View>
            <SFlex gap={8}>
              <View style={styles.iconWrapper}>{coinIcon}</View>
              <SText color={Colors.White} textAlign={'center'} type={'h3'}>
                {title}
              </SText>
            </SFlex>
            <SText
              color={status === 'Staking' ? Colors.PrimaryLight : Colors.Green}
              textAlign={'center'}
              marginTop={5}
              opacity={0.7}
            >
              {status}
            </SText>
          </View>
          {staked ? (
            <HeaderUnstakeButton onPress={() => {}} />
          ) : (
            <View style={styles.emptySpace} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerBtn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderColor: Colors.LighterGray,
  },
  headerBtnBig: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  iconWrapper: {
    backgroundColor: Colors.InputBg,
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySpace: {
    width: 48,
  },
});
