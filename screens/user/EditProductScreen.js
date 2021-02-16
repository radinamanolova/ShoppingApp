import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ScrollView, StyleSheet, View, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurre!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={ HeaderButton }>
          <Item
            title='Save'
            iconName={ Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark' }
            onPress={ submitHandler }
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  if (isLoading) {
    return (
      <View style={ styles.centered }>
        <ActivityIndicator size='large' color={ Colors.accent } />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={ { flex: 1 } }
      behavior={ (Platform.OS === 'ios') ? "padding" : null }
      keyboardVerticalOffset={ Platform.select({ ios: 0, android: 500 }) }
    >
      <ScrollView>
        <View style={ styles.form }>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={ inputChangeHandler }
            initialValue={ editedProduct ? editedProduct.title : '' }
            initiallyValid={ !!editedProduct }
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image URL!"
            keyboardType='default'
            returnKeyType='next'
            onInputChange={ inputChangeHandler }
            initialValue={ editedProduct ? editedProduct.imageUrl : '' }
            initiallyValid={ !!editedProduct }
            required
          />
          { editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={ inputChangeHandler }
              required
              min={ 0.1 }
            />
          ) }
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={ 5 }
            onInputChange={ inputChangeHandler }
            initialValue={ editedProduct ? editedProduct.description : '' }
            initiallyValid={ !!editedProduct }
            required
            minLength={ 5 }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const editProductScreenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId
      ? 'Edit Product'
      : 'Add Product'
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    margin: 20
  }
});

export default EditProductScreen;