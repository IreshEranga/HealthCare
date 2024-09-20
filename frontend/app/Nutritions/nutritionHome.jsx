import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function NutritionHome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Nutrition Tracker</Text>
      <Button title="Log Food" onPress={() => router.push('/Nutritions/addFood')} />
      <Button title="View Recipes" onPress={() => router.push('/Nutritions/recipes')} style={{ marginTop: 10 }} />
      <Button title="Set Nutrition Goals" onPress={() => router.push('/Nutritions/nutritionGoals')} style={{ marginTop: 10 }} />
    </View>
  );
}
