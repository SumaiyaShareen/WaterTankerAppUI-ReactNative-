import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tanker } = route.params;

  const driver = {
    name: 'Ahmed Khan',
    phone: '0301-1234567',
    location: 'Gulshan-e-Iqbal, Karachi',
    experience: '5 years',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    deliveries: 245,
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
      {/* Header with Gradient Background */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tanker Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Tanker Banner Image with Overlay */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: tanker.image }} style={styles.bannerImage} />
          <View style={styles.imageOverlay} />
          <Text style={styles.tankerType}>{tanker.type}</Text>
        </View>

        {/* Tanker Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-shipping" size={24} color="#3498db" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Tanker Size</Text>
              <Text style={styles.infoValue}>{tanker.size}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <MaterialIcons name="attach-money" size={24} color="#3498db" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={[styles.infoValue, styles.priceText]}>{tanker.price}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="location" size={24} color="#3498db" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Current Location</Text>
              <Text style={styles.infoValue}>Karachi Port Area</Text>
            </View>
          </View>
        </View>

        {/* Driver Information Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Information</Text>
          <View style={styles.driverCard}>
            <Image source={{ uri: driver.image }} style={styles.driverImage} />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="#f1c40f" />
                <Text style={styles.ratingText}>{driver.rating} ({driver.deliveries} deliveries)</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="call" size={20} color="#3498db" style={styles.detailIcon} />
            <Text style={styles.detailText}>{driver.phone}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color="#3498db" style={styles.detailIcon} />
            <Text style={styles.detailText}>{driver.location}</Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="work" size={20} color="#3498db" style={styles.detailIcon} />
            <Text style={styles.detailText}>{driver.experience} experience</Text>
          </View>
        </View>

        {/* Tanker Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanker Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>10,000</Text>
              <Text style={styles.specLabel}>Liters</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>Stainless</Text>
              <Text style={styles.specLabel}>Steel</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>GPS</Text>
              <Text style={styles.specLabel}>Tracked</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>24/7</Text>
              <Text style={styles.specLabel}>Support</Text>
            </View>
          </View>
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={18} color="#2ecc71" />
              <Text style={styles.featureText}>Regular maintenance</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={18} color="#2ecc71" />
              <Text style={styles.featureText}>Emergency shutoff valves</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={18} color="#2ecc71" />
              <Text style={styles.featureText}>Spill containment</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={18} color="#2ecc71" />
              <Text style={styles.featureText}>Fire extinguishers</Text>
            </View>
          </View>
        </View>
      </ScrollView>

   
      {/* Fixed Footer */}
      <View style={styles.footer}>
        // In DetailScreen.js, update the booking button:
<TouchableOpacity
  style={styles.bookButton}
  onPress={() => navigation.navigate('Booking', { 
    tanker,
    driver // Pass the driver object along with tanker
  })}
>
  <Text style={styles.bookButtonText}>Book This Tanker</Text>
  <Text style={styles.bookButtonSubtext}>Available now • Delivery in 45 mins</Text>
</TouchableOpacity>
      </View>
    </View>  
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#3498db',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    width: 30,
  },
  imageContainer: {
    height: 220,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  tankerType: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 15,
    marginTop: -30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 2,
  },
  priceText: {
    color: '#27ae60',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginVertical: 10,
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  driverInfo: {
    marginLeft: 15,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  detailIcon: {
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 15,
    color: '#34495e',
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  specItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 1,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
    marginBottom: 5,
  },
  specLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  featuresList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    elevation: 5,
  },
  bookButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bookButtonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 3,
  },
});

export default DetailScreen;