// ... all your imports
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'Settings') {
      navigation.navigate('Setting');
    } else if (tab === 'Payments') {
      navigation.navigate('Payment');
    }
  };

  const tankers = [
    {
      id: '1',
      size: '1000 liters',
      price: 'Rs: 1500',
      type: 'Small Tanker',
      image: 'https://images.picxy.com/cache/2019/9/5/81747bebc15478c8dc47cf544ff574fa.jpg',
    },
    {
      id: '2',
      size: '1500 liters',
      price: 'Rs: 1800',
      type: 'Medium Tanker',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-v_wd1EJDWhgAWLH1yarySWI9gdOq3ojmA&s',
    },
    {
      id: '3',
      size: '2000 liters',
      price: 'Rs: 2200',
      type: 'Large Tanker',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-v_wd1EJDWhgAWLH1yarySWI9gdOq3ojmA&s',
    },
  ];

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.tankerCard, { opacity: fadeAnim }]} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.tankerImage} resizeMode="cover" />
      <View style={styles.tankerInfo}>
        <Text style={styles.tankerType}>{item.type}</Text>
        <Text style={styles.tankerSize}>{item.size}</Text>
        <Text style={styles.tankerPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.detailButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Detail', { tanker: item })}
      >
        <Text style={styles.detailText}>Details</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.topHeader}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLKFXdMP2HPyyt5qnG1prVBH_FXDQyavRMTg&s',
              }}
              style={styles.logo}
            />
            <Text style={styles.appName}>Water Pool</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <MaterialIcons name="menu" size={28} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="location-sharp" size={20} color="#1a73e8" style={styles.leftIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter your location"
            placeholderTextColor="#888"
          />
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesome name="search" size={18} color="#1a73e8" style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-v_wd1EJDWhgAWLH1yarySWI9gdOq3ojmA&s',
          }}
          style={styles.mainImage}
        />

        <View style={styles.divider} />

        {/* Tanker List */}
        <Text style={styles.sectionTitle}>Available Tankers</Text>
        <FlatList
          data={tankers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {[
            { label: 'Home', icon: 'home-outline' },
          
            { label: 'Settings', icon: 'cog-outline' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.label}
              style={[styles.navItem, activeTab === tab.label && styles.activeNavItem]}
              onPress={() => handleTabPress(tab.label)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={activeTab === tab.label ? tab.icon.replace('-outline', '') : tab.icon}
                size={24}
                color={activeTab === tab.label ? '#1a73e8' : '#888'}
              />
              <Text style={[styles.navText, activeTab === tab.label && styles.activeNavText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 70 : 0,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    marginBottom: 15,
  },
  leftIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: Platform.OS === 'android' ? 8 : 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  mainImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  listContainer: {
    paddingBottom: Platform.OS === 'android' ? 80 : 20,
  },
  tankerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tankerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  tankerInfo: {
    flex: 1,
  },
  tankerType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tankerSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  tankerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  detailButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
   paddingBottom: Platform.OS === 'android' ? 0 : 4,
height: Platform.OS === 'android' ? 55 : 65,

  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
  activeNavText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  activeNavItem: {},
});

export default HomeScreen;
