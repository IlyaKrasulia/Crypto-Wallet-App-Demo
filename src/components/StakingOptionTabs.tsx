import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'utils/styles';
import i18n from 'utils/i18n.config';
import { SText } from './Styled/SText';
import { SButton } from './Styled/SButton';

interface TabProps {
  profit: number;
  deadline: number;
  isActive: boolean;
  onPress: () => void;
}

const Tab = ({ profit, deadline, isActive, onPress }: TabProps) => {
  const { t } = i18n;

  return (
    <SButton
      onPress={onPress}
      styleBtn={isActive ? styles.tabActive : styles.tabBtn}
    >
      <SText color={Colors.White} type={'h4Bold'}>
        {profit}
        {t('symbols.procent')}
      </SText>
      <SText color={Colors.White} type={'b2'} opacity={0.7} marginTop={5}>
        {deadline}{t('symbols.space')}{t('screens.staking.days')}
      </SText>
    </SButton>
  );
};

interface IProps {
  data: { profit: number; deadline: number }[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

export const StakingOptionTabs = ({
  data,
  activeTab,
  setActiveTab,
}: IProps) => (
  <ScrollView style={styles.wrapper} horizontal>
    {data.map((item, index) => (
      <Tab
        profit={item.profit}
        deadline={item.deadline}
        key={Math.random()}
        isActive={activeTab === index && true}
        onPress={() => setActiveTab(index)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 20,
    flexGrow: 0,
  },
  tabBtn: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    flex: 1,
    height: 60,
    width: 111,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.PrimaryLight,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    flex: 1,
    height: 60,
    width: 111,
    marginRight: 10,
  },
});
