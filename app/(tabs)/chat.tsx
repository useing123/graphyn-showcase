import { Button, Input, ScrollView, Text, XStack, YStack } from 'tamagui';

export default function ChatScreen() {
  const MOCK_MESSAGES = [
    { id: 1, sender: 'user', text: 'Привет!' },
    { id: 2, sender: 'bot', text: 'Здравствуй 👋' },
    { id: 3, sender: 'user', text: 'Как дела?' },
    { id: 4, sender: 'bot', text: 'Все отлично, спасибо!' },
  ];

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Messages Area */}
      <ScrollView flex={1} padding="$4">
        <YStack space="$4">
          {MOCK_MESSAGES.map((message) => (
            <YStack
              key={message.id}
              alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              backgroundColor={message.sender === 'user' ? '$blue5' : '$gray8'}
              borderRadius="$4"
              padding="$3"
              maxWidth="80%"
            >
              <Text color={message.sender === 'user' ? 'white' : 'black'}>
                {message.text}
              </Text>
            </YStack>
          ))}
        </YStack>
      </ScrollView>

      {/* Input Area */}
      <XStack
        padding="$4"
        space="$3"
        alignItems="center"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <Input flex={1} placeholder="Type your message..." />
        <Button>Send</Button>
      </XStack>
    </YStack>
  );
}
