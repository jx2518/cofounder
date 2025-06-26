import { Image } from 'expo-image';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock data for cofounder profiles
const COFOUNDERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    skills: ['React Native', 'Node.js', 'UI/UX'],
    bio: 'Ex-Google engineer with 5+ years experience in mobile development. Looking to join a fintech or health startup.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'San Francisco, CA',
    lookingFor: 'Business Cofounder',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    skills: ['Market Research', 'Product Strategy', 'Agile'],
    bio: 'Product leader with experience at early-stage startups. Passionate about solving problems in education technology.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'New York, NY',
    lookingFor: 'Technical Cofounder',
  },
  {
    id: '3',
    name: 'Alex Rivera',
    role: 'Business Development',
    skills: ['Sales', 'Fundraising', 'Strategy'],
    bio: 'MBA with background in venture capital. Looking to join a startup with strong technical foundation and product-market fit.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    location: 'Austin, TX',
    lookingFor: 'Technical Cofounder',
  },
  {
    id: '4',
    name: 'Jessica Kim',
    role: 'UX Designer',
    skills: ['Design Systems', 'User Research', 'Figma'],
    bio: 'Creative designer who loves building user-centric products. Previously worked at Airbnb and Uber.',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    location: 'Seattle, WA',
    lookingFor: 'Technical & Business Cofounders',
  },
  {
    id: '5',
    name: 'David Wilson',
    role: 'Full-stack Engineer',
    skills: ['React', 'Python', 'AWS'],
    bio: 'Full-stack developer with experience building SaaS products from the ground up. Interested in AI and machine learning applications.',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    location: 'Boston, MA',
    lookingFor: 'Business & Marketing Cofounders',
  },
];

// Cofounder card component
function CofounderCard({ item }) {
  const cardBackground = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E1E1E1', dark: '#333333' }, 'border');
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: cardBackground, borderColor: borderColor }
      ]}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <View style={styles.headerInfo}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <ThemedText>{item.role}</ThemedText>
          <ThemedText style={styles.location}>
            <IconSymbol name="mappin" size={14} /> {item.location}
          </ThemedText>
        </View>
      </View>
      
      <ThemedText style={styles.bio}>{item.bio}</ThemedText>
      
      <View style={styles.divider} />
      
      <View style={styles.lookingFor}>
        <ThemedText type="defaultSemiBold">Looking for: </ThemedText>
        <ThemedText>{item.lookingFor}</ThemedText>
      </View>
      
      <View style={styles.skillsContainer}>
        {item.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <ThemedText style={styles.skillText}>{skill}</ThemedText>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Discover Cofounders</ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <IconSymbol name="slider.horizontal.3" size={20} />
        </TouchableOpacity>
      </ThemedView>
      
      <FlatList
        data={COFOUNDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CofounderCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
  filterButton: {
    padding: 8,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  headerInfo: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  bio: {
    marginBottom: 12,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginVertical: 12,
  },
  lookingFor: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
}); 