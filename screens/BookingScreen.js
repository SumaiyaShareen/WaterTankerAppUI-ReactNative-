
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tanker, driver } = route.params; // Destructure both tanker and driver

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleProceedToPayment = () => {
    if (!address || !phone) {
      Alert.alert('Missing Information', 'Please fill all required fields.');
      return;
    }
    
    const bookingData = {
      tanker: {
        type: tanker.type,
        size: tanker.size,
        price: tanker.price,
        image: tanker.image
      },
      delivery: {
        address,
        phone,
        date: date.toDateString()
      },
      driver: {
        name: driver.name,
        phone: driver.phone,
        rating: driver.rating,
        image: driver.image
      }
    };

    navigation.navigate('Payment', { bookingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Tanker</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Tanker Summary */}
        <View style={styles.summaryCard}>
          <Image source={{ uri: tanker.image }} style={styles.tankerImage} />
          <View style={styles.tankerInfo}>
            <Text style={styles.tankerType}>{tanker.type}</Text>
            <Text style={styles.tankerPrice}>{tanker.price}</Text>
          </View>
        </View>

        {/* Booking Form */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Delivery Date</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateInput}
          >
            <Ionicons name="calendar" size={20} color="#3498db" style={{ marginRight: 10 }} />
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Delivery Address*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Block 5, Gulshan-e-Iqbal, Karachi"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <Text style={styles.label}>Contact Number*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 0301-1234567"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </ScrollView>

      {/* Fixed Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.paymentButton} 
          onPress={handleProceedToPayment}
        >
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          <Text style={styles.paymentButtonSubtext}>Total: {tanker.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  headerRight: {
    width: 30,
  },
  container: {
    backgroundColor: '#f5f7f9',
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 80, // Space for fixed footer button
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  tankerImage: {
    width: '100%',
    height: 180,
  },
  tankerInfo: {
    padding: 15,
  },
  tankerType: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  tankerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 5,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 15,
    color: '#2c3e50',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    elevation: 5,
  },
  paymentButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  paymentButtonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 3,
  },
});

export default BookingScreen;