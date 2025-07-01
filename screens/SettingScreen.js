import React, { useState } from 'react';
import {
  View, Text, Switch, TouchableOpacity,
  StyleSheet, ScrollView, Image, TextInput
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Sara',
    phone: '+91 9876543210',
    email: 'sara@example.com',
  });

  return (
    <View style={styles.screen}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0077b6" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
        <View style={{ width: 24 }} /> {/* Placeholder to balance layout */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          {editProfile ? (
            <View style={styles.editFields}>
              <TextInput style={styles.input} value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />
              <TextInput style={styles.input} value={userData.phone} onChangeText={(text) => setUserData({ ...userData, phone: text })} keyboardType="phone-pad" />
              <TextInput style={styles.input} value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} keyboardType="email-address" />
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userDetail}>{userData.phone}</Text>
              <Text style={styles.userDetail}>{userData.email}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.editButton} onPress={() => setEditProfile(!editProfile)}>
            <Text style={styles.editButtonText}>{editProfile ? 'Save' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionHeader}>WATER SERVICE</Text>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <FontAwesome5 name="truck" size={20} color="#0077b6" />
              <Text style={styles.optionText}>My Tanker Orders</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="calendar" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Delivery Schedule</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="location" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Saved Addresses</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionHeader}>APP PREFERENCES</Text>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="notifications" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Notifications</Text>
            </View>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: '#ccc', true: '#0077b6' }} />
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="moon" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Dark Mode</Text>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#ccc', true: '#0077b6' }} />
          </View>
        </View>

        {/* Support */}
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionHeader}>HELP & SUPPORT</Text>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Help Center</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="shield-checkmark" size={22} color="#0077b6" />
              <Text style={styles.optionText}>Privacy Policy</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* Bottom Arrow */}
        <View style={styles.bottomArrowContainer}>
          <MaterialIcons name="keyboard-arrow-down" size={30} color="#0077b6" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0077b6',
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#0077b6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editFields: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  settingsGroup: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 5,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  sectionHeader: {
    padding: 15,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0077b6',
    backgroundColor: '#f0f8ff',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomArrowContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default SettingsScreen;
