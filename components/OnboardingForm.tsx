import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

type OnboardingStep = 'personal' | 'professional' | 'preferences' | 'complete';

export const OnboardingForm = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('personal');
  const colorScheme = useColorScheme();
  const accentColor = useThemeColor({}, 'tint');
  const inputBackground = useThemeColor({ light: '#F5F5F5', dark: '#333333' }, 'background');
  const borderColor = useThemeColor({ light: '#EEEEEE', dark: '#444444' }, 'background');

  // Form state
  const [formData, setFormData] = useState({
    // Personal info
    name: '',
    title: '',
    location: '',
    bio: '',
    // Professional info
    skills: '',
    education: '',
    experience: '',
    achievements: '',
    // Preferences
    lookingFor: '',
    interests: '',
    remoteOnly: false,
    openToInvestment: false,
  });

  const updateFormField = (field: keyof typeof formData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('professional');
        break;
      case 'professional':
        setCurrentStep('preferences');
        break;
      case 'preferences':
        setCurrentStep('complete');
        break;
      case 'complete':
        onComplete();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'professional':
        setCurrentStep('personal');
        break;
      case 'preferences':
        setCurrentStep('professional');
        break;
      case 'complete':
        setCurrentStep('preferences');
        break;
    }
  };

  const renderPersonalInfoStep = () => {
    return (
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Personal Information</ThemedText>
        <ThemedText style={styles.stepDescription}>
          Tell us about yourself so potential cofounders can get to know you.
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText>Full Name</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.name}
            onChangeText={(text) => updateFormField('name', text)}
            placeholder="Your full name"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Professional Title</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.title}
            onChangeText={(text) => updateFormField('title', text)}
            placeholder="e.g. Software Engineer, Product Manager"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Location</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.location}
            onChangeText={(text) => updateFormField('location', text)}
            placeholder="City, State or Country"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Bio</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: inputBackground, borderColor },
            ]}
            value={formData.bio}
            onChangeText={(text) => updateFormField('bio', text)}
            placeholder="Tell potential cofounders about yourself..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ThemedView>
    );
  };

  const renderProfessionalInfoStep = () => {
    return (
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Professional Background</ThemedText>
        <ThemedText style={styles.stepDescription}>
          Share your professional experience and skills with potential cofounders.
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText>Skills (comma separated)</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.skills}
            onChangeText={(text) => updateFormField('skills', text)}
            placeholder="e.g. React Native, UX Design, Sales"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Education</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.education}
            onChangeText={(text) => updateFormField('education', text)}
            placeholder="University, Degree, Year"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Work Experience</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: inputBackground, borderColor },
            ]}
            value={formData.experience}
            onChangeText={(text) => updateFormField('experience', text)}
            placeholder="List your past positions and companies..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Notable Achievements</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: inputBackground, borderColor },
            ]}
            value={formData.achievements}
            onChangeText={(text) => updateFormField('achievements', text)}
            placeholder="Any notable projects or achievements..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </ThemedView>
    );
  };

  const renderPreferencesStep = () => {
    return (
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Cofounder Preferences</ThemedText>
        <ThemedText style={styles.stepDescription}>
          Tell us what you're looking for in a cofounder and your startup interests.
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText>Looking For</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: inputBackground, borderColor },
            ]}
            value={formData.lookingFor}
            onChangeText={(text) => updateFormField('lookingFor', text)}
            placeholder="Describe what skills/experience you want in a cofounder..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Industry Interests (comma separated)</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: inputBackground, borderColor }]}
            value={formData.interests}
            onChangeText={(text) => updateFormField('interests', text)}
            placeholder="e.g. FinTech, Healthcare, SaaS"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.switchContainer}>
          <ThemedText>Remote Only</ThemedText>
          <Switch
            value={formData.remoteOnly as boolean}
            onValueChange={(value) => updateFormField('remoteOnly', value)}
            trackColor={{ false: '#767577', true: accentColor }}
            thumbColor={colorScheme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.switchContainer}>
          <ThemedText>Open to Investment</ThemedText>
          <Switch
            value={formData.openToInvestment as boolean}
            onValueChange={(value) => updateFormField('openToInvestment', value)}
            trackColor={{ false: '#767577', true: accentColor }}
            thumbColor={colorScheme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </ThemedView>
    );
  };

  const renderCompleteStep = () => {
    return (
      <ThemedView style={[styles.formContainer, styles.completeContainer]}>
        <IconSymbol name="checkmark.circle.fill" size={80} color={accentColor} style={styles.completeIcon} />
        <ThemedText type="title">All Set!</ThemedText>
        <ThemedText style={styles.completeText}>
          Your profile is ready. You'll now be matched with potential cofounders based on your skills and preferences.
        </ThemedText>
      </ThemedView>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalInfoStep();
      case 'professional':
        return renderProfessionalInfoStep();
      case 'preferences':
        return renderPreferencesStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderPersonalInfoStep();
    }
  };

  const renderStepIndicator = () => {
    const steps = ['personal', 'professional', 'preferences', 'complete'];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <View style={styles.stepIndicatorContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor: index <= currentIndex ? accentColor : '#CCCCCC',
                },
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor: index < currentIndex ? accentColor : '#CCCCCC',
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderStepIndicator()}
      {renderCurrentStep()}

      <View style={styles.buttonContainer}>
        {currentStep !== 'personal' && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handleBack}
          >
            <ThemedText>Back</ThemedText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.nextButton, { backgroundColor: accentColor }]}
          onPress={handleNext}
        >
          <ThemedText style={{ color: 'white' }}>
            {currentStep === 'complete' ? 'Finish' : 'Next'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  stepDescription: {
    marginTop: 8,
    marginBottom: 16,
    opacity: 0.8,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stepLine: {
    height: 2,
    width: 30,
    marginHorizontal: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    marginHorizontal: 8,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  nextButton: {
    flex: 2,
  },
  completeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  completeIcon: {
    marginBottom: 16,
  },
  completeText: {
    marginTop: 16,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
  },
}); 