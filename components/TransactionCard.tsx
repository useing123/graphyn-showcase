import React, { useContext, useState } from 'react';
import { Transaction } from '@/types/pennywise';
import {
  Card,
  Text,
  XStack,
  YStack,
  Button,
  Form,
  Input,
  Label,
  Select,
  Sheet,
  Adapt,
  TextArea,
  H1,
} from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';
import { TransactionContext } from '@/context/TransactionContext';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { deleteTransaction, updateTransaction, categories } = useContext(TransactionContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [description, setDescription] = useState(transaction.description);

  const handleSubmit = async () => {
    if (!amount || !category) {
      return;
    }
    await updateTransaction(transaction.id, {
      amount: parseFloat(amount),
      category,
      description,
    });
    setModalOpen(false);
  };

  return (
    <>
      <Card p="$3" bg="$background" bordered>
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <Text fontSize={16} fontWeight="bold">
              {transaction.description}
            </Text>
            <Text fontSize={12} color="$color10">
              {transaction.category}
            </Text>
          </YStack>
          <YStack alignItems="flex-end">
            <Text fontSize={16} fontWeight="bold" color={transaction.amount > 0 ? '$green10' : '$red10'}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </Text>
            <Text fontSize={12} color="$color10">
              {new Date(transaction.timestamp).toLocaleDateString()}
            </Text>
          </YStack>
          <XStack>
            <FontAwesome.Button
              name="edit"
              backgroundColor="transparent"
              underlayColor="transparent"
              color="blue"
              onPress={() => setModalOpen(true)}
            />
            <FontAwesome.Button
              name="trash"
              backgroundColor="transparent"
              underlayColor="transparent"
              color="red"
              onPress={() => deleteTransaction(transaction.id)}
            />
          </XStack>
        </XStack>
      </Card>
      <Sheet open={modalOpen} onOpenChange={setModalOpen}>
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.Handle />
          <YStack p="$4" space="$4">
            <H1>Edit Transaction</H1>
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

              <Button marginTop="$6" theme="blue" onPress={handleSubmit}>
                Update Transaction
              </Button>
            </Form>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default TransactionCard;