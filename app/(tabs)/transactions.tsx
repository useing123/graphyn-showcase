import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Spinner, H1 } from 'tamagui';
import { TransactionContext } from '../../context/TransactionContext';
import TransactionCard from '../../components/TransactionCard';

const TransactionsScreen = () => {
  const { transactions, loading } = useContext(TransactionContext);

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack p="$3" space="$3">
        <H1>Transaction History</H1>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Text>No transactions yet.</Text>
        )}
      </YStack>
    </ScrollView>
  );
};

export default TransactionsScreen;