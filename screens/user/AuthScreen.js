import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView
      style={ styles.screen }
      behavior={ (Platform.OS === 'ios') ? "padding" : null }
      keyboardVerticalOffset={ Platform.select({ ios: 0, android: 50 }) }
    >
      <LinearGradient colors={ [Colors.primary, Colors.btn1] } style={ styles.gradient }>
        <Ionicons
          name={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
          size={ 150 }
          color={ Colors.title }
        />
        <View style={ styles.textContainer }>
          <Text style={ styles.mainText }>Start exploring the shop and adding new products!</Text>
        </View>
        <Card style={ styles.authContainer }>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={ inputChangeHandler }
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={ 6 }
              autoCapitalize='none'
              errorText='Please enter a valid password.'
              onInputChange={ inputChangeHandler }
              initialValue=''
            />
            <View style={ styles.btns }>
              { isLoading ? (
                <ActivityIndicator size='small' color={ Colors.accent } />
              ) : (
                  <Button
                    title={ isSignup ? "Sign Up " : "Login " }
                    color={ Colors.accent }
                    onPress={ authHandler }
                  />
                )
              }
            </View>
            <View style={ styles.btns }>
              <Button
                title={ `Switch to ${isSignup ? 'Login ' : 'Sign Up '}` }
                color={ Colors.btn2 }
                onPress={ () => {
                  setIsSignup(prevState => !prevState);
                } }
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const authScreenOptions = {
  headerTitle: 'Welcome to the Shopping App!'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  mainText: {
    fontSize: 18,
    color: Colors.title,
    textAlign: 'center',
    margin: 10
  },
  authContainer: {
    width: '80%',
    height: '80%',
    maxWidth: 400,
    maxHeight: 370,
    padding: 20
  },
  btns: {
    marginTop: 20,
  }
});

export default AuthScreen;