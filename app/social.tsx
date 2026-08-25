import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { socialService } from './services/api';
import { useAuthStore } from './store/authStore';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

export default function SquadsScreen() {
  const { user } = useAuthStore();
  const [inviteCode, setInviteCode] = useState('');
  const [squads, setSquads] = useState([{ id: '1', name: 'Alpha Squad', members: 5 }]);

  const joinSquad = async () => {
    try {
      await socialService.joinGroup(user.id, inviteCode);
      alert('Joined squad!');
    } catch (e) {
      alert('Invalid code');
    }
  };

  return (
    <StyledView className='flex-1 bg-dark px-6 pt-12'>
      <StyledText className='text-accent text-3xl font-bold mb-8'>GYM SQUADS</StyledText>
      
      {/* Join Squad */}
      <StyledView className='bg-card p-4 rounded-2xl border border-gray-800 mb-8'>
        <StyledText className='text-textMain mb-3 font-bold'>JOIN A SQUAD</StyledText>
        <StyledView className='flex-row space-x-3'>
          <StyledTextInput 
            className='flex-1 bg-dark p-3 rounded-lg text-textMain' 
            placeholder='Enter invite code' 
            placeholderTextColor='#666'
            value={inviteCode}
            onChangeText={setInviteCode}
          />
          <StyledTouchableOpacity className='bg-accent px-4 rounded-lg' onPress={joinSquad}>
            <StyledText className='text-dark font-bold'>JOIN</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* My Squads */}
      <StyledText className='text-textDim mb-4 uppercase text-xs font-bold'>My Squads</StyledText>
      <FlatList 
        data={squads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className='bg-card p-4 rounded-xl border border-gray-800 mb-3 flex-row justify-between items-center'>
            <StyledView>
              <StyledText className='text-textMain text-lg font-bold'>{item.name}</StyledText>
              <StyledText className='text-textDim text-sm'>{item.members} members</StyledText>
            </StyledView>
            <StyledTouchableOpacity className='bg-accent px-4 py-2 rounded-lg'>
              <StyledText className='text-dark font-bold'>VIEW</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}
      />
    </StyledView>
  );
}
