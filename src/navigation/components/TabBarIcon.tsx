import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeIcon from '@assets/icons/home.svg';
import StakingIcon from '@assets/icons/trade.svg';
import ShopingCartIcon from '@assets/icons/shopping-cart.svg';
import { MainTabsParamList } from 'navigation/MainTabs';

type NavigationIconProps = {
  route: keyof MainTabsParamList;
};

const TabBarIcon: FunctionComponent<NavigationIconProps> = ({ route }) => {
  const renderIcon = () => {
    switch (route) {
      case 'Home':
        return <HomeIcon width={24} height={24} />;
      case 'Staking':
        return <StakingIcon width={24} height={24} />;
      case 'Referal':
        return <ShopingCartIcon width={24} height={24} />;
      default:
        return null;
    }
  };

  return <View style={styles.iconContainer}>{renderIcon()}</View>;
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});

export default TabBarIcon;
