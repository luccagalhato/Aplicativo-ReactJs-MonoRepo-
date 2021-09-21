import React, { useCallback, useEffect, useRef } from 'react'
import {
  TextInputProps,
  TextInput,
  StyleSheet,
  Image,
  View
} from 'react-native'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
  name: string
  placeholder?: string
}
interface InputValueReference {
  value: string
}

const InputSearch = ({
  name,
  onChangeText,
  placeholder,
  ...rest
}: InputProps): JSX.Element => {
  const inputElementRef = useRef<any>(null)

  const { registerField, fieldName, defaultValue = '' } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      }
    })
  }, [registerField, fieldName])

  const handleChangeText = useCallback(
    text => {
      if (inputValueRef.current) inputValueRef.current.value = text
      if (onChangeText) onChangeText(text)
    },
    [onChangeText]
  )

  return (
    <View style={style.container}>
      <View style={style.SectionStyle}>
        <TextInput
          ref={inputElementRef}
          onChangeText={handleChangeText}
          placeholderTextColor="#899089"
          placeholder={placeholder}
          style={style.input}
          {...rest}
        />
        <Image source={require('assets/Search.png')} style={style.ImageStyle} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: { width: '100%' },
  SectionStyle: {
    width: '100%',
    height: 45,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D8DAD8',
    borderRadius: 2
  },
  input: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    height: 'auto'
  },
  ImageStyle: {
    padding: 10,
    marginLeft: 12,
    marginRight: 5,
    height: 15,
    width: 15
  }
})

export default InputSearch
