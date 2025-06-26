import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface ChatScreenProps {
  contact: {
    id: string;
    name: string;
    image: string;
    role: string;
  };
  onBack: () => void;
}

export const ChatScreen = ({ contact, onBack }: ChatScreenProps) => {
  const [messageText, setMessageText] = useState('');
  const accentColor = useThemeColor({}, 'tint');
  const userBubbleColor = accentColor;
  const otherBubbleColor = useThemeColor({ light: '#F0F0F0', dark: '#333333' }, 'background');
  const inputBackground = useThemeColor({ light: '#F5F5F5', dark: '#222222' }, 'background');
  
  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I saw your profile and I think we would make a great founding team. I have experience in product and design, and I see you're strong on the technical side.',
      sender: 'other',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: 'Hey! Thanks for reaching out. I'd love to hear more about your background and what kind of startup you're looking to build.',
      sender: 'user',
      timestamp: '10:35 AM',
    },
    {
      id: '3',
      text: 'I've been working in the fintech space for about 5 years. Recently I spotted an opportunity in the small business lending market that I think is really promising.',
      sender: 'other',
      timestamp: '10:38 AM',
    },
    {
      id: '4',
      text: 'That sounds interesting! I've actually built some payment processing systems before. Would you be free to jump on a video call sometime this week to discuss?',
      sender: 'user',
      timestamp: '10:40 AM',
    },
    {
      id: '5',
      text: 'Absolutely! How about Thursday at 3pm?',
      sender: 'other',
      timestamp: '10:42 AM',
    },
  ]);

  const sendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: messageText.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // Simulate response after delay
    setTimeout(() => {
      const responses = [
        "That sounds great! Looking forward to discussing more.",
        "Interesting point. Let me think about that approach.",
        "I agree, that market opportunity is really promising.",
        "Can we schedule a video call to discuss this further?",
        "I've worked on something similar before. Let me share my experience.",
      ];
      
      const responseMessage: Message = {
        id: (messages.length + 2).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 1500);
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.otherMessageRow]}>
        {!isUser && (
          <Image source={{ uri: contact.image }} style={styles.messageBubbleAvatar} />
        )}
        
        <View
          style={[
            styles.messageBubble,
            isUser ? [styles.userBubble, { backgroundColor: userBubbleColor }] : [styles.otherBubble, { backgroundColor: otherBubbleColor }],
          ]}
        >
          <ThemedText style={isUser ? styles.userMessageText : undefined}>
            {item.text}
          </ThemedText>
          <ThemedText style={[styles.timestamp, isUser && styles.userTimestamp]}>
            {item.timestamp}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Image source={{ uri: contact.image }} style={styles.headerAvatar} />
          <View>
            <ThemedText type="defaultSemiBold">{contact.name}</ThemedText>
            <ThemedText style={styles.subText}>{contact.role}</ThemedText>
          </View>
        </View>
        
        <TouchableOpacity style={styles.videoButton}>
          <IconSymbol name="video.fill" size={22} />
        </TouchableOpacity>
      </ThemedView>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />
      
      <ThemedView style={styles.inputContainer}>
        <View style={[styles.inputRow, { backgroundColor: inputBackground }]}>
          <TextInput
            style={styles.textInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor="#888888"
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={[styles.sendButton, { backgroundColor: accentColor }]}>
            <IconSymbol name="paperplane.fill" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 5,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  subText: {
    fontSize: 12,
    color: '#888888',
  },
  videoButton: {
    padding: 10,
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageRow: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubbleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  userMessageText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 3,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 4,
  },
  textInput: {
    flex: 1,
    padding: 10,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 