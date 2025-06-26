import { Image } from 'expo-image';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock data for conversations
const CONVERSATIONS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'I would love to hear more about your startup idea!',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'When are you free for a video call to discuss the project?',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Alex Rivera',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    lastMessage: 'I have worked on something similar before. Let me show you.',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '4',
    name: 'Jessica Kim',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    lastMessage: 'Thanks for connecting! I am looking forward to collaborating.',
    time: 'Mon',
    unread: 0,
  },
  {
    id: '5',
    name: 'David Wilson',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    lastMessage: 'I sent you some mockups for the landing page. What do you think?',
    time: 'Sun',
    unread: 1,
  },
];

function ConversationItem({ conversation }) {
  const borderColor = useThemeColor({ light: '#EFEFEF', dark: '#333333' }, 'background');
  const unreadBackground = useThemeColor({ light: '#0a7ea4', dark: '#0a7ea4' }, 'tint');
  const timeColor = useThemeColor({ light: '#888888', dark: '#888888' }, 'text');
  
  return (
    <TouchableOpacity style={[styles.conversationItem, { borderBottomColor: borderColor }]}>
      <View style={styles.conversationContent}>
        <Image source={{ uri: conversation.image }} style={styles.avatar} />
        
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <ThemedText type="defaultSemiBold">{conversation.name}</ThemedText>
            <ThemedText style={[styles.timeText, { color: timeColor }]}>{conversation.time}</ThemedText>
          </View>
          
          <View style={styles.messagePreview}>
            <ThemedText 
              numberOfLines={1} 
              ellipsizeMode="tail" 
              style={styles.previewText}
            >
              {conversation.lastMessage}
            </ThemedText>
            
            {conversation.unread > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: unreadBackground }]}>
                <ThemedText style={styles.unreadText}>{conversation.unread}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Messages</ThemedText>
        <TouchableOpacity style={styles.composeButton}>
          <IconSymbol name="square.and.pencil" size={24} />
        </TouchableOpacity>
      </ThemedView>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={16} style={styles.searchIcon} />
          <ThemedText style={styles.searchPlaceholder}>Search messages</ThemedText>
        </View>
      </View>
      
      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  composeButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
    opacity: 0.5,
  },
  searchPlaceholder: {
    color: '#888888',
  },
  list: {
    flex: 1,
  },
  conversationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  conversationContent: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewText: {
    flex: 1,
    fontSize: 15,
    color: '#666666',
  },
  unreadBadge: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
}); 