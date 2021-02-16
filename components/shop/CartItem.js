import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={ styles.cartItem }>
      <View style={ styles.itemData }>
        <Text style={ styles.quantity }>{ props.quantity } x</Text>
        <Image style={ styles.imageSmall } source={ { uri: props.imageUrl } } />
        <Text style={ styles.mainText } numberOfLines={ 1 }>{ props.title }</Text>
      </View>
      <View style={ styles.itemData }>
        <Text style={ styles.mainText }>${ props.amount.toFixed(2) }</Text>
        { props.deletable && (
          <TouchableComponent onPress={ props.onRemove } style={ styles.deleteBtn }>
            <Ionicons
              name={ Platform.OS === 'android' ? 'md-trash' : 'ios-trash' }
              size={ 23 }
              color={ 'red' }
            />
          </TouchableComponent>
        ) }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  imageSmall: {
    padding: 40,
    width: '20%',
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10
  },
  mainText: {
    fontFamily: 'open-sans',
    fontSize: 16,
    maxWidth: 120
  },
  deleteBtn: {
    marginLeft: 30
  }
});

export default CartItem;