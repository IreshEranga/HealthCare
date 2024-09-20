import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function GoalsScreen() {
  const [dailyGoal, setDailyGoal] = useState('');

  const handleSetGoal = () => {
    console.log(`Daily Calorie Goal: ${dailyGoal}`);
    // API integration will come here later
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Set Your Daily Calorie Goal</Text>
      <TextInput
        placeholder="Calorie Goal"
        keyboardType="numeric"
        value={dailyGoal}
        onChangeText={setDailyGoal}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Set Goal" onPress={handleSetGoal} />
    </View>
  );
}
