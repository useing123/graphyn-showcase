import { ScrollView, Text, YStack } from 'tamagui';
import { useContext } from 'react';
import { TransactionContext } from '@/context/TransactionContext';
import TransactionCard from '@/components/TransactionCard';

export default function TransactionsScreen() {
  const { transactions, loading } = useContext(TransactionContext);

  return (
    <ScrollView>
      <YStack flex={1} padding="$4" space="$3">
        <Text fontSize={24} fontWeight="bold" textAlign="center" marginBottom="$4">
          All Transactions
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </YStack>
    </ScrollView>
  );
}