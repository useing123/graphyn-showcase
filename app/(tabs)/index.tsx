import TransactionCard from '@/components/TransactionCard';
import { useContext } from 'react';
import { TransactionContext } from '@/context/TransactionContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Card, H1, H4, Progress, ScrollView, Spinner, Text, XStack, YStack } from 'tamagui';
import { Settings } from '@tamagui/lucide-icons';

export default function DashboardScreen() {
  const router = useRouter();
  const { transactions, loading, balance } = useContext(TransactionContext);

  const todaySpending = transactions
    .filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString())
    .reduce((acc, t) => acc + t.amount, 0);

  const weeklySpending = transactions.reduce((acc, t) => acc + t.amount, 0);
  const weeklyGoal = 200;

  return (
    <ScrollView>
      <YStack flex={1} p="$4" space="$4" bg="$background">
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <H1>Dashboard</H1>
          <Button icon={<Settings />} theme="alt1" />
        </XStack>

        {/* Balance */}
        <Card p="$4" bg="$background" bordered>
          <YStack>
            <Text color="$color10">Current Balance</Text>
            <H1>${balance.toFixed(2)}</H1>
          </YStack>
        </Card>

        {/* Today's Spending */}
        <XStack justifyContent="space-between">
          <YStack>
            <Text color="$color10">Today's Spending</Text>
            <H4>${todaySpending.toFixed(2)}</H4>
          </YStack>
          <Button icon={<FontAwesome name="plus" />} onPress={() => router.push('/add')}>
            Quick Add
          </Button>
        </XStack>

        {/* Weekly Spending */}
        <Card p="$4" bg="$background" bordered>
          <YStack space="$2">
            <Text color="$color10">Weekly Spending</Text>
            <Progress value={(weeklySpending / weeklyGoal) * 100} bg="$color4">
              <Progress.Indicator animation="bouncy" bg="$blue10" />
            </Progress>
            <XStack justifyContent="space-between">
              <Text fontSize={12} color="$color10">
                ${weeklySpending.toFixed(2)}
              </Text>
              <Text fontSize={12} color="$color10">
                ${weeklyGoal}
              </Text>
            </XStack>
          </YStack>
        </Card>

        {/* Recent Transactions */}
        <YStack space="$2" flex={1}>
          <Text color="$color10" fontWeight="bold">
            Recent Transactions
          </Text>
          {loading ? (
            <Spinner />
          ) : (
            transactions
              .slice(0, 5)
              .map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
