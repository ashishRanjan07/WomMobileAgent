import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Colors from '../Assets/Colors';
import {responsiveFontSize, responsivePadding} from '../Component/Responsive';

export default function Text_Input({
  entered_data,
  children,
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  numberOfLines,
  multiline,
  textAlignVertical,
  maxLength,
}) {
  const handleChange = text => {
    entered_data(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.InputStyle}
        onChangeText={handleChange}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        numberOfLines={numberOfLines}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        maxLength={maxLength}
        placeholderTextColor={Colors.grey}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
  },
  InputStyle: {
    borderColor: Colors.border_grey,
    height: responsivePadding(50),
    borderWidth: responsivePadding(1),
    paddingLeft: responsivePadding(10),
    borderRadius: responsivePadding(5),
    backgroundColor: Colors.input_BackGround_Grey,
    fontSize:responsiveFontSize(20),
    fontWeight:'bold',
    color:Colors.black
  },
});
