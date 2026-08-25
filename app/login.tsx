import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { authService } from './services/api';
import { useAuthStore } from './store/authStore';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = useAuthStore();

  const handleLogin = async () => {
    try {
      const { data } = await authService.signIn(email, password);
      setUser(data.user);
    } catch (e) {
      alert('Login failed: ' + e.message);
    }
  };

  return (
    <StyledView className='flex-1 bg-dark justify-center px-6'>
      <StyledView className='mb-10 items-center'>
        <StyledText className='text-accent text-4xl font-bold mb-2'>GYM TRACKER</StyledText>
        <StyledText className='text-textDim text-lg'>Push your limits</StyledText>
      </StyledView>

      <StyledView className='space-y-4'>
        <StyledTextInput 
          className='bg-card text-textMain p-4 rounded-xl border border-gray-800'
          placeholder='Email'
          placeholderTextColor='#666'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
        <StyledTextInput 
          className='bg-card text-textMain p-4 rounded-xl border border-gray-800'
          placeholder='Password'
          placeholderTextColor='#666'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <StyledTouchableOpacity 
          className='bg-accent p-4 rounded-xl items-center mt-6'
          onPress={handleLogin}
        >
          <StyledText className='text-dark font-bold text-lg'>ENTER SYSTEM</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
