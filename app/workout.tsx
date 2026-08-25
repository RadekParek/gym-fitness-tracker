import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Card, ActionButton } from './components/UI';
import { useAuthStore } from './store/authStore';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function WorkoutLogger() {
  const { user } = useAuthStore();
  const [currentSet, setCurrentSet] = useState({ weight: '', reps: '' });

  return (
    <StyledView className='flex-1 bg-dark px-6 pt-12'>
      <StyledView className='flex-row justify-between items-center mb-8'>
        <StyledView>
          <StyledText className='text-textMain text-3xl font-bold'>Push Day</StyledText>
          <StyledText className='text-textDim'>Chest & Triceps</StyledText>
        </StyledView>
        <StyledView className='bg-card px-3 py-1 rounded-lg border border-gray-800'>
          <StyledText className='text-accent font-mono font-bold'>Vol: 12,400kg</StyledText>
        </StyledView>
      </StyledView>

      <Card className='mb-6'>
        <StyledText className='text-textMain text-xl font-bold mb-4'>Bench Press</StyledText>
        
        <StyledView className='flex-row space-x-4 mb-6'>
          <StyledView className='flex-1'>
            <StyledText className='text-textDim text-xs mb-1'>Weight (kg)</StyledText>
            <StyledView className='bg-dark p-3 rounded-xl border border-gray-800'>
              <StyledText className='text-textMain text-lg font-bold text-center'>100</StyledText>
            </StyledView>
          </StyledView>
          <StyledView className='flex-1'>
            <StyledText className='text-textDim text-xs mb-1'>Reps</StyledText>
            <StyledView className='bg-dark p-3 rounded-xl border border-gray-800'>
              <StyledText className='text-textMain text-lg font-bold text-center'>8</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        <ActionButton label='Log Set' onPress={() => {}} />
      </Card>

      <StyledText className='text-textDim text-xs font-bold uppercase mb-3'>Recent Sets</StyledText>
      <FlatList 
        data={[1,2,3]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <StyledView className='bg-card p-4 rounded-xl border border-gray-800 mb-3 flex-row justify-between items-center'>
            <StyledView className='flex-row items-center'>
              <StyledView className='w-5 h-5 rounded-full bg-accent mr-3' />
              <StyledText className='text-textMain font-bold'>Set {item}</StyledText>
            </StyledView>
            <StyledText className='text-textMain font-mono'>{100 - (item*5)}kg x {10 - item}</StyledText>
          </StyledView>
        )}
      />
    </StyledView>
  );
}
