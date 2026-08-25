import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const MOCK_FEED = [
  { id: '1', user: 'Alex', workout: 'Push Day', volume: '4,200kg', time: '2h ago' },
  { id: '2', user: 'Jordan', workout: 'Leg Day', volume: '8,500kg', time: '5h ago' },
  { id: '3', user: 'Sam', workout: 'Pull Day', volume: '3,100kg', time: '1d ago' },
];

export default function ActivityFeed() {
  return (
    <StyledView className='flex-1 bg-dark px-6 pt-12'>
      <StyledText className='text-accent text-3xl font-bold mb-8'>SQUAD FEED</StyledText>
      <FlatList 
        data={MOCK_FEED}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className='bg-card p-4 rounded-2xl border border-gray-800 mb-4'>
            <StyledView className='flex-row justify-between items-center mb-2'>
              <StyledText className='text-textMain font-bold text-lg'>{item.user}</StyledText>
              <StyledText className='text-textDim text-xs'>{item.time}</StyledText>
            </StyledView>
            <StyledText className='text-textMain mb-1'>Completed {item.workout}</StyledText>
            <StyledText className='text-accent font-bold'>Total Volume: {item.volume}</StyledText>
          </StyledView>
        )}
      />
    </StyledView>
  );
}
