import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';

type InputTextProps = {
  label: string;
  placeholder: string;
  changeFunction: (param:any) => void;
  variable: string;
};

const AlertIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='alert-circle-outline'
  />
);

export const InputPassword = (): React.ReactElement => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );


  return (
    <Input
      value={value}
      label='Password'
      placeholder='Place your Text'
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      style={styles.inputStyle}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

export const InputText = ({label, placeholder, changeFunction, variable}:InputTextProps): React.ReactElement => {
    return (
      <Input
        value={variable}
        label={label}
        placeholder={placeholder}
        style={styles.inputStyle}
        onChangeText={nextValue => changeFunction(nextValue)}
      />
    );
  };

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#242E49',
  },
  inputStyle: {
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 16,
  },
});