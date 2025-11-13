import { SButton } from 'components/Styled/SButton';
import { SText } from 'components/Styled/SText';
import React, { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'utils/styles';

interface ButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const Button = ({ title, isActive, onPress }: ButtonProps) => (
  <SButton
    onPress={onPress}
    styleBtn={isActive ? styles.buttonActive : styles.button}
  >
    <SText color={Colors.White} type={'t1'} textAlign={'center'}>
      {title}
    </SText>
  </SButton>
);

interface IProps {
  data: string[];
  activeItem: string;
  setActiveItem: Dispatch<React.SetStateAction<string>>;
}

export const CustomTabs = ({ data, activeItem, setActiveItem }: IProps) => (
  <View style={styles.wrapper}>
    {data.map((item) => (
      <Button
        key={Math.random()}
        title={item}
        isActive={Boolean(activeItem === item)}
        onPress={() => setActiveItem(item)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 28,
    padding: 4,
  },
  button: {
    borderColor: Colors.transparent,
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    flex: 1,
  },
  buttonActive: {
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    flex: 1,
    borderWidth: 1,
  },
});
