import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>      
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLKFXdMP2HPyyt5qnG1prVBH_FXDQyavRMTg&s' }}
          style={styles.logo}
        />
        <Text style={styles.title}>WELCOME TO WATER POOL</Text>
      </View>

      <Text style={styles.description}>
        Book your water tanker anytime, anywhere. Reliable and affordable service at your doorstep. Please login or sign up to get started. Your convenience, our priority!
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Powered by ACJA Tech</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 7, // Added border radius here
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  loginButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#eee',
    fontSize: 12,
  },
});