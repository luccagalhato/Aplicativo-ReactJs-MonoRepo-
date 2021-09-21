import React, { ReactChild } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface TagProps {
  children: ReactChild;
  isRounded?: boolean;
  prefixIcon?: ReactChild;
  suffixIcon?: ReactChild;
  style?: ViewStyle;
}

const Tag = (props: TagProps) => {
  const {
    children,
    isRounded,
    prefixIcon,
    suffixIcon,
    style,
  } = props;
  const roundedStyles = { borderRadius: 26 }
  return (
    <View style={[
      styles.container,
      isRounded && roundedStyles,
      style,
    ]}>
      {prefixIcon ?? null}
      <Text style={[
        styles.tagText,
        prefixIcon !== undefined && { marginLeft: 2 },
        suffixIcon !== undefined && { marginRight: 2 },
      ]}>
        {children}
      </Text>
      {suffixIcon ?? null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EDF9ED',
    borderRadius: 2,
    height: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  tagText: {
    color: '#252725',
    fontFamily: 'Sora',
    fontSize: 12,
  }
});

export default Tag;