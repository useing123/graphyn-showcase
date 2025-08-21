import { useState, useContext } from 'react';
import {
  Button,
  Form,
  Input,
  Label,
  Select,
  Sheet,
  Switch,
  TextArea,
  XStack,
  YStack,
  Adapt,
  H1,
} from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { TransactionContext } from '@/context/TransactionContext';
import { useRouter } from 'expo-router';

export default function AddScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const { addTransaction, categories } = useContext(TransactionContext);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!amount || !category) {
      return;
    }
    await addTransaction({
      amount: parseFloat(amount),
      category,
      description,
    });
    router.push('/(tabs)');
  };

  return (
    <YStack flex={1} padding="$4" space="$4">
      <H1>Add Transaction</H1>
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

            <Adapt when="sm" platform="touch">
              <Sheet
                native
                modal
                dismissOnSnapToBottom
                animationConfig={{
                  type: 'spring',
                  damping: 20,
                  mass: 1.2,
                  stiffness: 250,
                }}
              >
                <Sheet.Frame padding="$4" gap="$4">
                  <Adapt.Contents />
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton>
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Select.Group>
                  {categories.map((cat, index) => (
                    <Select.Item key={cat.id} value={cat.name} index={index}>
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