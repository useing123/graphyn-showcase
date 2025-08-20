import { useState, useContext } from 'react';
import {
  Button,
  Form,
  Input,
  Label,
  Select,
  Switch,
  Text,
  TextArea,
  XStack,
  YStack,
} from 'tamagui';
import { MOCK_CATEGORIES } from '@/constants/mock';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { TransactionContext } from '@/context/TransactionContext';
import { useRouter } from 'expo-router';

export default function AddScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const { addTransaction } = useContext(TransactionContext);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!amount || !category) {
      // Basic validation
      return;
    }
    await addTransaction({
      amount: parseFloat(amount),
      category,
      date: Date.now(),
      description,
    });
    router.push('/(tabs)');
  };

  return (
    <YStack flex={1} padding="$4" space="$4">
      <Text fontSize={24} fontWeight="bold" textAlign="center" marginBottom="$4">
        Add Transaction
      </Text>
      <Form>
        <YStack space="$2">
          <Label>Amount</Label>
          <Input
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </YStack>

        <YStack space="$2" marginTop="$4">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <Select.Trigger iconAfter={ChevronDown}>
              <Select.Value placeholder="Select a category" />
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton>
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Select.Group>
                  {MOCK_CATEGORIES.map((cat, index) => (
                    <Select.Item key={cat.id} index={index} value={cat.name}>
                      <Select.ItemText>{cat.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>

        <YStack space="$2" marginTop="$4">
          <Label>Description (Optional)</Label>
          <TextArea
            placeholder="Enter a description"
            value={description}
            onChangeText={setDescription}
          />
        </YStack>

        <XStack alignItems="center" justifyContent="space-between" marginTop="$4">
          <Label>Recurring Transaction</Label>
          <Switch checked={isRecurring} onCheckedChange={setIsRecurring}>
            <Switch.Thumb animation="bouncy" />
          </Switch>
        </XStack>

        <Button marginTop="$6" theme="blue" onPress={handleSubmit}>
          Add Transaction
        </Button>
      </Form>
    </YStack>
  );
}