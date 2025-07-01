import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const bookingData = route.params?.bookingData; // ✅ Safe access

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Alert and redirect if bookingData is missing
  useEffect(() => {
    if (!bookingData) {
      Alert.alert(
        'Missing Booking Data',
        'Please book a tanker first to continue to payment.',
        [
          {
            text: 'Go to Home',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    }
  }, [bookingData]);

  // Prevent hardware back button during processing
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return isProcessing;
    });
    return () => backHandler.remove();
  }, [isProcessing]);

  const handlePayment = async () => {
    if (paymentMethod !== 'cash') {
      if (!mobileNumber || !transactionId) {
        Alert.alert('Missing Information', 'Please enter all payment details');
        return;
      }
      if (!/^03\d{9}$/.test(mobileNumber)) {
        Alert.alert('Invalid Number', 'Please enter a valid 11-digit mobile number starting with 03');
        return;
      }
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      );

      setTimeout(() => {
        Alert.alert(
          'Payment Successful',
          paymentMethod === 'cash'
            ? `Your order has been placed. Please prepare ${bookingData?.tanker?.price} for delivery.`
            : `Your payment via ${paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} has been processed.`
        );
      }, 500);
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment');
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Stop rendering if no bookingData
  if (!bookingData) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => !isProcessing && navigation.goBack()}
          style={styles.backButton}
          disabled={isProcessing}
        >
          <Icon name="arrow-back" size={24} color={isProcessing ? '#ccc' : '#2196F3'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Complete Payment</Text>
      </View>

      {/* Order Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Icon name="local-shipping" size={20} color="#555" />
          <Text style={styles.summaryText}>
            {bookingData.tanker.type} ({bookingData.tanker.size})
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Icon name="location-on" size={20} color="#555" />
          <Text style={styles.summaryText}>{bookingData.delivery.address}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Icon name="schedule" size={20} color="#555" />
          <Text style={styles.summaryText}>{bookingData.delivery.date}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Icon name="person" size={20} color="#555" />
          <Text style={styles.summaryText}>Driver: {bookingData.driver.name}</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 10 }]}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>{bookingData.tanker.price}</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      <View style={styles.paymentMethods}>
        {['cash', 'jazzcash', 'easypaisa'].map(method => (
          <TouchableOpacity
            key={method}
            style={[
              styles.methodCard,
              paymentMethod === method && styles.selectedMethod
            ]}
            onPress={() => !isProcessing && setPaymentMethod(method)}
            disabled={isProcessing}
          >
            <View style={styles.methodIcon}>
              {method === 'cash' ? (
                <Icon name="money" size={24} color="#4CAF50" />
              ) : (
                <Image
                  source={{
                    uri:
                      method === 'jazzcash'
                        ? 'https://i.pinimg.com/474x/e4/90/10/e4901000c715027d613a1f05d8636b03.jpg'
                        : 'https://easypaisa.com.pk/wp-content/uploads/2021/10/Asset-1631.png'
                  }}
                  style={styles.walletIcon}
                />
              )}
            </View>
            <Text style={styles.methodText}>
              {method === 'cash' ? 'Cash on Delivery' : method === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}
            </Text>
            {paymentMethod === method && <View style={styles.radioSelected} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Wallet Form */}
      {paymentMethod !== 'cash' && (
        <View style={styles.paymentForm}>
          <Text style={styles.formTitle}>
            {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Details
          </Text>

          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="03XXXXXXXXX"
            keyboardType="phone-pad"
            maxLength={11}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            editable={!isProcessing}
          />

          <Text style={styles.inputLabel}>Transaction ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter transaction ID"
            value={transactionId}
            onChangeText={setTransactionId}
            editable={!isProcessing}
          />

          <Text style={styles.note}>
            <Icon name="info" size={14} color="#FF9800" /> Please complete payment in your{' '}
            {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} app first.
          </Text>
        </View>
      )}

      {/* Pay Button */}
      <TouchableOpacity
        style={[styles.payButton, isProcessing && styles.disabledButton]}
        onPress={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.payButtonText}>
            {paymentMethod === 'cash' ? 'Confirm Order' : 'Complete Payment'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Security Note */}
      <View style={styles.securityBadge}>
        <Icon name="security" size={16} color="#4CAF50" />
        <Text style={styles.securityText}>Secure Payment • Encrypted Connection</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    paddingBottom: 40
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444'
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  summaryText: {
    marginLeft: 10,
    color: '#555'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12
  },
  paymentMethods: {
    marginBottom: 20
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  selectedMethod: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD'
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  walletIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  methodText: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3'
  },
  paymentForm: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16
  },
  note: {
    fontSize: 13,
    color: '#FF9800',
    marginTop: 8
  },
  payButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  disabledButton: {
    backgroundColor: '#cccccc'
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6
  }
});

export default PaymentScreen;
