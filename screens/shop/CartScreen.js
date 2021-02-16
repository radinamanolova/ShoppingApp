import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productImageUrl: state.cart.items[key].productImageUrl,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        productPushToken: state.cart.items[key].pushToken
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={ styles.screen }>
      <Card style={ styles.summary }>
        <Text style={ styles.summaryText }>
          Total: <Text style={ styles.amount }>
            ${ Math.round(cartTotalAmount.toFixed(2) * 100) / 100 }
          </Text>
        </Text>
        { isLoading ? (
          <ActivityIndicator size='small' color={ Colors.accent } />
        ) : (
            <Button
              color={ Colors.btn1 }
              title=' Order Now  '
              disabled={ cartItems.length === 0 }
              onPress={ sendOrderHandler }
            />
          ) }
      </Card>
      <FlatList
        data={ cartItems }
        keyExtractor={ item => item.productId }
        renderItem={ itemData => (
          <CartItem
            quantity={ itemData.item.quantity }
            imageUrl={ itemData.item.productImageUrl }
            title={ itemData.item.productTitle }
            amount={ itemData.item.sum }
            deletable
            onRemove={ () => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            } }
          />
        ) }
      />
    </View>
  );
};

export const cartScreenOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  }
});

export default CartScreen;