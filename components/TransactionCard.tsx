import { Transaction } from '@/types/pennywise';
import { MOCK_CATEGORIES } from '@/constants/mock';
import { FontAwesome } from '@expo/vector-icons';
import { Card, CardProps, Text, XStack, YStack } from 'tamagui';

type TransactionCardProps = CardProps & {
  transaction: Transaction;
};

export default function TransactionCard({ transaction, ...rest }: TransactionCardProps) {
  const category = MOCK_CATEGORIES.find(cat => cat.name === transaction.category) || MOCK_CATEGORIES[6]; // Default to 'Other'
  
  return (
    <Card {...rest} p="$4" bg="$gray2" borderRadius="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" space="$3">
          <FontAwesome name={category.icon as any} size={24} />
          <YStack>
            <Text fontSize={16} fontWeight="bold">
              {category.name}
            </Text>
            <Text fontSize={12} color="$gray10">
              {transaction.description}
            </Text>
          </YStack>
        </XStack>
        <Text fontSize={16} fontWeight="bold">
          ${transaction.amount.toFixed(2)}
        </Text>
      </XStack>
    </Card>
  );
}