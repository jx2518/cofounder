import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

interface FilterOptions {
  skills: string[];
  roles: string[];
  experience: string;
  location: string;
  remoteOnly: boolean;
  availableForMeetings: boolean;
}

export const FilterModal = ({ isVisible, onClose, onApplyFilters }: FilterModalProps) => {
  const colorScheme = useColorScheme();
  const accentColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  
  const [filters, setFilters] = useState<FilterOptions>({
    skills: [],
    roles: [],
    experience: 'any',
    location: '',
    remoteOnly: false,
    availableForMeetings: false,
  });
  
  const allSkills = [
    'Software Development', 'Design', 'Marketing', 'Sales', 'Finance',
    'Product Management', 'Data Science', 'Operations', 'Business Development'
  ];
  
  const allRoles = [
    'Technical Cofounder', 'Business Cofounder', 'Design Cofounder', 'Operations Cofounder'
  ];
  
  const experienceOptions = [
    { value: 'any', label: 'Any Experience' },
    { value: 'entry', label: '0-2 Years' },
    { value: 'mid', label: '3-5 Years' },
    { value: 'senior', label: '5+ Years' },
    { value: 'founder', label: 'Previous Founder' },
  ];
  
  const toggleSkill = (skill: string) => {
    if (filters.skills.includes(skill)) {
      setFilters({ 
        ...filters, 
        skills: filters.skills.filter(s => s !== skill) 
      });
    } else {
      setFilters({ ...filters, skills: [...filters.skills, skill] });
    }
  };
  
  const toggleRole = (role: string) => {
    if (filters.roles.includes(role)) {
      setFilters({ 
        ...filters, 
        roles: filters.roles.filter(r => r !== role) 
      });
    } else {
      setFilters({ ...filters, roles: [...filters.roles, role] });
    }
  };
  
  const setExperience = (exp: string) => {
    setFilters({ ...filters, experience: exp });
  };
  
  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };
  
  const resetFilters = () => {
    setFilters({
      skills: [],
      roles: [],
      experience: 'any',
      location: '',
      remoteOnly: false,
      availableForMeetings: false,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView
          intensity={90}
          style={StyleSheet.absoluteFill}
          tint={colorScheme}
        />
        
        <ThemedView style={[styles.modalContent, { backgroundColor }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark" size={20} />
            </TouchableOpacity>
            <ThemedText type="subtitle">Filter Cofounders</ThemedText>
            <TouchableOpacity onPress={resetFilters}>
              <ThemedText style={{ color: accentColor }}>Reset</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filtersScroll}>
            {/* Skills Section */}
            <View style={styles.sectionContainer}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Skills
              </ThemedText>
              <View style={styles.optionsGrid}>
                {allSkills.map(skill => (
                  <TouchableOpacity
                    key={skill}
                    style={[
                      styles.filterChip,
                      filters.skills.includes(skill) && { backgroundColor: accentColor },
                    ]}
                    onPress={() => toggleSkill(skill)}
                  >
                    <ThemedText 
                      style={[
                        styles.chipText,
                        filters.skills.includes(skill) && styles.selectedChipText,
                      ]}
                    >
                      {skill}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Roles Section */}
            <View style={styles.sectionContainer}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Looking For
              </ThemedText>
              <View style={styles.optionsGrid}>
                {allRoles.map(role => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.filterChip,
                      filters.roles.includes(role) && { backgroundColor: accentColor },
                    ]}
                    onPress={() => toggleRole(role)}
                  >
                    <ThemedText
                      style={[
                        styles.chipText,
                        filters.roles.includes(role) && styles.selectedChipText,
                      ]}
                    >
                      {role}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Experience Section */}
            <View style={styles.sectionContainer}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Experience Level
              </ThemedText>
              <View style={styles.radioButtons}>
                {experienceOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.radioOption}
                    onPress={() => setExperience(option.value)}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        filters.experience === option.value && styles.radioSelected,
                      ]}
                    >
                      {filters.experience === option.value && (
                        <View style={[styles.radioInner, { backgroundColor: accentColor }]} />
                      )}
                    </View>
                    <ThemedText>{option.label}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Toggles Section */}
            <View style={styles.sectionContainer}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Preferences
              </ThemedText>
              
              <View style={styles.toggleOption}>
                <ThemedText>Remote Only</ThemedText>
                <Switch
                  value={filters.remoteOnly}
                  onValueChange={(value) => setFilters({ ...filters, remoteOnly: value })}
                  trackColor={{ false: '#767577', true: accentColor }}
                  thumbColor={colorScheme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.toggleOption}>
                <ThemedText>Available for Meetings</ThemedText>
                <Switch
                  value={filters.availableForMeetings}
                  onValueChange={(value) => setFilters({ ...filters, availableForMeetings: value })}
                  trackColor={{ false: '#767577', true: accentColor }}
                  thumbColor={colorScheme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>
            </View>
          </ScrollView>
          
          <ThemedView style={styles.applyButtonContainer}>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: accentColor }]}
              onPress={handleApply}
            >
              <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  closeButton: {
    padding: 5,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
  },
  chipText: {
    fontSize: 14,
  },
  selectedChipText: {
    color: 'white',
  },
  radioButtons: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    borderColor: '#0a7ea4',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  toggleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  applyButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  applyButton: {
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 