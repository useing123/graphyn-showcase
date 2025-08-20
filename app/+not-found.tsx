import { Link, Stack } from 'expo-router';
import { Text, YStack } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <YStack flex={1} alignItems="center" justifyContent="center" padding={20}>
        <Text fontSize={20} fontWeight="bold">
          This screen does not exist.
        </Text>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Text color="$blue10">Go to home screen!</Text>
        </Link>
      </YStack>
    </>
  );
}
