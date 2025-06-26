import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const accentColor = useThemeColor({}, 'tint');
  const cardBorderColor = useThemeColor({ light: '#E1E1E1', dark: '#333333' }, 'background');
  
  // Mock data for notifications and matches
  const notifications = [
    {
      id: '1',
      text: 'Sarah Johnson viewed your profile',
      time: '2h ago',
    },
    {
      id: '2',
      text: 'New match: Michael Chen wants to connect',
      time: '1d ago',
    },
    {
      id: '3',
      text: 'Jessica Kim messaged you',
      time: '2d ago',
    },
  ];
  
  const suggestedMatches = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      matchPercentage: 95,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      matchPercentage: 88,
    },
    {
      id: '3',
      name: 'Jessica Kim',
      role: 'UX Designer',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      matchPercentage: 82,
    },
  ];
  
  const recentlyActive = [
    {
      id: '4',
      name: 'Alex Rivera',
      role: 'Business Development',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    {
      id: '5',
      name: 'David Wilson',
      role: 'Full-stack Engineer',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.welcomeSection}>
        <ThemedText type="title">Hello, Alex!</ThemedText>
        <ThemedText style={styles.subtitle}>Find your ideal cofounder today</ThemedText>
      </ThemedView>
      
      {/* Quick Stats Section */}
      <ThemedView style={styles.statsContainer}>
        <View style={[styles.statCard, { borderColor: cardBorderColor }]}>
          <ThemedText type="subtitle" style={styles.statNumber}>12</ThemedText>
          <ThemedText style={styles.statLabel}>Profile Views</ThemedText>
        </View>
        
        <View style={[styles.statCard, { borderColor: cardBorderColor }]}>
          <ThemedText type="subtitle" style={styles.statNumber}>5</ThemedText>
          <ThemedText style={styles.statLabel}>Matches</ThemedText>
        </View>
        
        <View style={[styles.statCard, { borderColor: cardBorderColor }]}>
          <ThemedText type="subtitle" style={styles.statNumber}>3</ThemedText>
          <ThemedText style={styles.statLabel}>Messages</ThemedText>
        </View>
      </ThemedView>
      
      {/* Notifications Section */}
      <ThemedView style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Notifications</ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: accentColor }}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        
        {notifications.map(notification => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationDot} />
            <View style={styles.notificationContent}>
              <ThemedText>{notification.text}</ThemedText>
              <ThemedText style={styles.timeText}>{notification.time}</ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>
      
      {/* Suggested Matches Section */}
      <ThemedView style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Top Matches For You</ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: accentColor }}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {suggestedMatches.map(match => (
            <TouchableOpacity key={match.id} style={[styles.matchCard, { borderColor: cardBorderColor }]}>
              <View style={styles.matchPercentageBadge}>
                <ThemedText style={styles.matchPercentageText}>{match.matchPercentage}%</ThemedText>
              </View>
              <Image source={{ uri: match.image }} style={styles.matchImage} />
              <ThemedText type="defaultSemiBold" style={styles.matchName}>{match.name}</ThemedText>
              <ThemedText style={styles.matchRole}>{match.role}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
      
      {/* Recently Active Section */}
      <ThemedView style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Recently Active</ThemedText>
          <TouchableOpacity>
            <ThemedText style={{ color: accentColor }}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {recentlyActive.map(person => (
            <TouchableOpacity key={person.id} style={[styles.matchCard, { borderColor: cardBorderColor }]}>
              <View style={styles.activeIndicator} />
              <Image source={{ uri: person.image }} style={styles.matchImage} />
              <ThemedText type="defaultSemiBold" style={styles.matchName}>{person.name}</ThemedText>
              <ThemedText style={styles.matchRole}>{person.role}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
      
      {/* Call to Action */}
      <ThemedView style={[styles.ctaContainer, { backgroundColor: accentColor }]}>
        <ThemedText style={styles.ctaText}>Complete your profile to get better matches!</ThemedText>
        <TouchableOpacity style={styles.ctaButton}>
          <ThemedText style={styles.ctaButtonText}>Complete Now</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  welcomeSection: {
    gap: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 14,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  horizontalScroll: {
    marginHorizontal: -10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0a7ea4',
    marginRight: 8,
  },
  notificationContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  matchCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    width: 140,
    position: 'relative',
    marginBottom: 5,
  },
  matchPercentageBadge: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },
  matchPercentageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  matchName: {
    textAlign: 'center',
    marginBottom: 2,
  },
  matchRole: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
  },
  activeIndicator: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#4CAF50',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
  ctaContainer: {
    marginTop: 25,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  ctaButtonText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
});
