import TransactionCard from '@/components/TransactionCard';
import { useContext } from 'react';
import { TransactionContext } from '@/context/TransactionContext';
import { FontAwesome } from '@expo/vector-icons';
import { Button, H1, H4, Progress, Text, View, XStack, YStack } from 'tamagui';

export default function DashboardScreen() {
  const { transactions, loading } = useContext(TransactionContext);

  const todaySpending = transactions
    .filter((t) => new Date(t.date).toDateString() === new Date().toDateString())
    .reduce((acc, t) => acc + t.amount, 0);

  const weeklySpending = transactions.reduce((acc, t) => acc + t.amount, 0);
  const weeklyGoal = 200;

  return (
    <YStack flex={1} p="$4" space="$4" bg="$background">
      {/* Balance */}
      <YStack>
        <Text color="$gray10">Current Balance</Text>
        <H1>$1,234.56</H1>
      </YStack>

      {/* Today's Spending */}
      <XStack justifyContent="space-between">
        <YStack>
          <Text color="$gray10">Today&apos;s Spending</Text>
          <H4>${todaySpending.toFixed(2)}</H4>
        </YStack>
        <Button icon={<FontAwesome name="plus" />}>Quick Add</Button>
      </XStack>

      {/* Weekly Spending */}
      <YStack space="$2">
        <Text color="$gray10">Weekly Spending</Text>
        <Progress value={(weeklySpending / weeklyGoal) * 100} bg="$gray4">
          <Progress.Indicator animation="bouncy" bg="$blue10" />
        </Progress>
        <XStack justifyContent="space-between">
          <Text fontSize={12} color="$gray10">
            ${weeklySpending.toFixed(2)}
          </Text>
          <Text fontSize={12} color="$gray10">
            ${weeklyGoal}
          </Text>
        </XStack>
      </YStack>

      {/* AI Insight */}
      <View p="$4" bg="$blue2" borderRadius="$4">
        <Text>
          <Text fontWeight="bold">AI Insight:</Text> You&apos;ve spent $55 on shopping this week.
          Consider reducing impulse purchases.
        </Text>
      </View>

      {/* Recent Transactions */}
      <YStack space="$2" flex={1}>
        <Text color="$gray10" fontWeight="bold">
          Recent Transactions
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          transactions.slice(0, 5).map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </YStack>
    </YStack>
  );
}
