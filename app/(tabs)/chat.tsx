import { useEffect, useState } from 'react';
import { Button, Input, ScrollView, Spinner, Text, XStack, YStack, H1 } from 'tamagui';
import { sendChatMessage } from '@/services/api';
import { ChatMessage } from '@/types/pennywise';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: 'Привет! Я могу помочь вам с информацией о ваших финансовых транзакциях.',
        timestamp: new Date().toISOString(),
      },
    ]);
    setLoading(false);
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    try {
      const response = await sendChatMessage(newMessage, 'user-session-id');
      const botMessage: ChatMessage = {
        id: Date.now().toString() + '-bot',
        sender: 'bot',
        text: response.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background" paddingBottom="$10">
      <H1 p="$4">AI Chat</H1>
      <ScrollView flex={1} padding="$4">
        <YStack space="$4">
          {loading ? (
            <Spinner />
          ) : (
            messages.map((message) => (
              <YStack
                key={message.id}
                alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                backgroundColor={message.sender === 'user' ? '$blue9' : '$gray5'}
                borderRadius="$4"
                padding="$3"
                maxWidth="80%"
              >
                <Text color={message.sender === 'user' ? 'white' : '$gray12'}>
                  {message.text}
                </Text>
              </YStack>
            ))
          )}
        </YStack>
      </ScrollView>

      <XStack
        padding="$4"
        space="$3"
        alignItems="center"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <Input
          flex={1}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button onPress={handleSend}>Send</Button>
      </XStack>
    </YStack>
  );
}
