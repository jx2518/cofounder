import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  const dividerColor = useThemeColor({ light: '#EFEFEF', dark: '#333333' }, 'background');
  const accentColor = useThemeColor({}, 'tint');
  
  // Mock user profile data
  const profile = {
    name: 'Alex Thompson',
    title: 'Technical Cofounder',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer with 7+ years experience. Previously founded a SaaS startup that was acquired. Looking to join forces with a business-minded cofounder to build something impactful.',
    skills: ['React Native', 'Node.js', 'AWS', 'UI/UX', 'Product Management'],
    interests: ['AI/ML', 'SaaS', 'FinTech', 'Health Tech'],
    lookingFor: 'Business Cofounder with marketing and sales experience',
    education: 'MS Computer Science, Stanford University',
    workExperience: [
      {
        id: '1',
        role: 'CTO & Co-founder',
        company: 'DataViz Tech',
        period: '2019 - 2022',
      },
      {
        id: '2', 
        role: 'Senior Software Engineer',
        company: 'Google',
        period: '2016 - 2019',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <ThemedText type="title">{profile.name}</ThemedText>
              <ThemedText>{profile.title}</ThemedText>
              <View style={styles.locationContainer}>
                <IconSymbol name="mappin" size={14} />
                <ThemedText style={styles.locationText}>{profile.location}</ThemedText>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.editButton, { borderColor: accentColor }]}>
            <ThemedText style={{ color: accentColor }}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </View>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">About</ThemedText>
          <ThemedText style={styles.bioText}>{profile.bio}</ThemedText>
        </ThemedView>
        
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Skills</ThemedText>
          <View style={styles.tagsContainer}>
            {profile.skills.map((skill, index) => (
              <View key={index} style={styles.tag}>
                <ThemedText style={styles.tagText}>{skill}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
        
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Interests</ThemedText>
          <View style={styles.tagsContainer}>
            {profile.interests.map((interest, index) => (
              <View key={index} style={[styles.tag, styles.interestTag]}>
                <ThemedText style={styles.tagText}>{interest}</ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
        
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Looking For</ThemedText>
          <ThemedText>{profile.lookingFor}</ThemedText>
        </ThemedView>
        
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Education</ThemedText>
          <ThemedText>{profile.education}</ThemedText>
        </ThemedView>
        
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Work Experience</ThemedText>
          {profile.workExperience.map((work, index) => (
            <View key={work.id} style={styles.workItem}>
              <View>
                <ThemedText type="defaultSemiBold">{work.role}</ThemedText>
                <ThemedText>{work.company}</ThemedText>
                <ThemedText style={styles.periodText}>{work.period}</ThemedText>
              </View>
              {index < profile.workExperience.length - 1 && (
                <View style={[styles.workDivider, { backgroundColor: dividerColor }]} />
              )}
            </View>
          ))}
        </ThemedView>
        
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsButton}>
            <IconSymbol name="gear" size={20} />
            <ThemedText style={styles.settingsText}>Settings</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  section: {
    padding: 16,
  },
  bioText: {
    marginTop: 8,
    lineHeight: 22,
  },
  divider: {
    height: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#E8F4F8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestTag: {
    backgroundColor: '#F0F0F0',
  },
  tagText: {
    fontSize: 14,
    color: '#0a7ea4',
  },
  workItem: {
    marginTop: 8,
  },
  workDivider: {
    height: 1,
    marginVertical: 12,
  },
  periodText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  settingsSection: {
    padding: 16,
    marginTop: 16,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingsText: {
    marginLeft: 8,
  },
}); 