import { SText } from 'components/Styled/SText';
import React, { useState, useCallback, FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { CustomButton } from 'components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Trans } from 'react-i18next';
import i18n from 'utils/i18n.config';
import { SButton } from 'components/Styled/SButton';
import { Colors, Fonts, screenWidth } from 'utils/styles';
import { BlurView } from '@react-native-community/blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animation from '@assets/animations/anim1.json';
import BG from '@assets/images/bg.png';

const { height: screenHeight } = Dimensions.get('window');

export const Onboarding: FunctionComponent = () => {
  const { t } = i18n;
  const { navigate } = useNavigation();
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const flatlistOpacity = useSharedValue(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const { top, bottom } = useSafeAreaInsets();
  const opacityTitleContainer = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const flatListStyle = useAnimatedStyle(() => ({
    opacity: flatlistOpacity.value,
  }));

  const animatedTitleContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacityTitleContainer.value, { duration: 300 }),
  }));

  const handleIndexChange = (index: number) => {
    opacityTitleContainer.value = 0;
    translateY.value = withTiming(-10, { duration: 250 });
    opacity.value = withTiming(0, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(setActiveIndex)(index);
        translateY.value = 20;
        translateY.value = withTiming(0, { duration: 250 });
        opacity.value = withTiming(1, { duration: 250 });
        opacityTitleContainer.value = 1;
      }
    });
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const index = Math.floor(contentOffsetY / screenHeight);

    const offsetInCurrentPage = contentOffsetY % screenHeight;

    if (
      offsetInCurrentPage >= screenHeight * 0.5 ||
      offsetInCurrentPage === 0
    ) {
      handleIndexChange(index);
    }
  };

  const handleScrollBeginDrag = () => {
    flatlistOpacity.value = withTiming(0.5, { duration: 200 });
  };

  const handleScrollEndDrag = () => {
    flatlistOpacity.value = withTiming(1, { duration: 200 });
  };

  const renderItem = useCallback(
    () => (
      <View style={styles.slide}>
        <LottieView source={Animation} autoPlay loop style={styles.animation} />
      </View>
    ),
    [],
  );

  const getTextContent = (index: number) => {
    switch (index) {
      case 0:
        return {
          title: t('screens.onBoarding.step1.title'),
          description: t('screens.onBoarding.step1.description'),
        };
      case 1:
        return {
          title: t('screens.onBoarding.step2.title'),
          description: t('screens.onBoarding.step2.description'),
        };
      case 2:
        return {
          title: t('screens.onBoarding.step3.title'),
          description: t('screens.onBoarding.step3.description'),
        };
      case 3:
        return {
          title: t('screens.onBoarding.step4.title'),
          description: t('screens.onBoarding.step4.description'),
        };
      default:
        return {
          title: '',
          description: '',
        };
    }
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <View
          key={i}
          style={[styles.dot, activeIndex === i && styles.activeDot]}
        />,
      );
    }
    return <View style={styles.dotsContainer}>{dots}</View>;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BG} style={StyleSheet.absoluteFill} />
      {activeIndex === 3 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { top: top + 16 },
            animatedTitleContainerStyle,
            styles.titleContainer,
          ]}
        >
          <SText color={Colors.White} type={'h2'}>
            <Trans
              i18nKey={'screens.onBoarding.step4.title'}
              components={{ highlight: <Text style={styles.titleMedium} /> }}
            />
          </SText>
        </Animated.View>
      )}

      <Animated.FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        pagingEnabled
        initialNumToRender={50}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        keyExtractor={(item) => item.toString()}
        style={flatListStyle}
      />

      <View style={[styles.textWrapperContainer, { bottom: bottom + 16 }]}>
        {activeIndex !== 3 ? (
          <Animated.View style={[styles.textWrapper, animatedStyle]}>
            <BlurView
              blurAmount={14}
              blurType={'ultraThinMaterialDark'}
              style={[StyleSheet.absoluteFill, styles.blur]}
            />

            <SText type={'h1'} textAlign={'center'} color={Colors.White}>
              {getTextContent(activeIndex).title}
            </SText>

            <SText type={'b1'} textAlign={'center'} color={Colors.White}>
              {getTextContent(activeIndex).description}
            </SText>
          </Animated.View>
        ) : (
          <Animated.View style={animatedStyle}>
            <CustomButton
              onPress={() => navigate('CreateSecrets')}
              text={t('buttons.signUp')}
              background={Colors.White}
              textColor={Colors.Black}
              marginBottom={30}
            />

            <SText
              color={Colors.LightGray}
              type={'b1'}
              textAlign={'center'}
              lineHeight={20}
            >
              {t('screens.onBoarding.step4.alreadyHaveAccount')}
            </SText>

            <SButton onPress={() => navigate('SignIn')} marginTop={2}>
              <SText
                type={'b1Medium'}
                color={Colors.White}
                textDecoration={'underline'}
                textAlign={'center'}
                lineHeight={20}
              >
                {t('buttons.signIn')}
              </SText>
            </SButton>
          </Animated.View>
        )}
      </View>

      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    paddingHorizontal: 22,
  },

  titleMedium: {
    fontSize: 28,
    lineHeight: 40,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
    position: 'absolute',
  },

  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },
  textWrapperContainer: {
    position: 'absolute',
    left: 22,
    right: 22,
    zIndex: 0,
  },
  textWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 50,
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.White,
    borderRadius: 5,
    margin: 5,
    opacity: 0.3,
  },
  activeDot: {
    opacity: 1,
  },

  blur: {
    backgroundColor: '#fff',
    opacity: 0.3,
  },
});
