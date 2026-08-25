import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const Card = ({ children, className = '' }) => (
  <StyledView className={\g-card border border-gray-800 rounded-2xl p-4 \\}>
    {children}
  </StyledView>
);

export const ActionButton = ({ onPress, label, variant = 'primary', className = '' }) => {
  const styles = variant === 'primary' 
    ? 'bg-accent text-dark' 
    : 'bg-dark border border-accent text-accent';
    
  return (
    <StyledTouchableOpacity 
      className={\p-4 rounded-xl items-center justify-center \ \\}
      onPress={onPress}
    >
      <StyledText className='font-bold text-lg'>{label}</StyledText>
    </StyledTouchableOpacity>
  );
};

export const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <StyledView className='mb-4'>
    {label && <StyledText className='text-textDim text-xs mb-1 ml-1'>{label}</StyledText>}
    <StyledTouchableOpacity className='bg-dark border border-gray-800 p-3 rounded-xl'>
      <StyledText className='text-textMain'>{value || placeholder}</StyledText>
    </StyledTouchableOpacity>
    <StyledTouchableOpacity 
      className='absolute right-3 top-8'
      onPress={() => {}}
    >
      <StyledText className='text-accent text-xs'>Edit</StyledText>
    </StyledTouchableOpacity>
  </StyledView>
);
