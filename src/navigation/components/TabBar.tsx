import React, {FunctionComponent} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Colors, screenWidth} from 'utils/styles';
import {MainTabsParamList} from 'navigation/MainTabs';
import {SText} from 'components/Styled/SText';
import TabBarIcon from './TabBarIcon';

const TabBar: FunctionComponent<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
    <View style={styles.mainContainer}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as keyof MainTabsParamList)
              : options.title !== undefined
              ? (options.title as keyof MainTabsParamList)
              : (route.name as keyof MainTabsParamList);

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={Math.random()} style={styles.mainItemContainer}>
              <Pressable onPress={onPress} style={styles.tab}>
                <View style={styles.tabContent}>
                  <TabBarIcon route={label} />

                  {isFocused && (
                    <SText color={Colors.White} type={"b1Medium"}>
                      {route.name}
                    </SText>
                  )}
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
    width: screenWidth,
  },

  tabContainer: {
    flexDirection: 'row',
    elevation: 0,
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    borderWidth: 1,
    borderRadius: 32,
    gap: 8,
    padding: 4,
  },
  mainItemContainer: {
    borderRadius: 100,
    backgroundColor: Colors.InputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  tabContent: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default TabBar;
