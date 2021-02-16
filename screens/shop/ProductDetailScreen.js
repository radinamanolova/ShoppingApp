import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={ styles.image } source={ { uri: selectedProduct.imageUrl } } />
      <View style={ styles.priceContainer }>
        <Text style={ styles.price }>${ selectedProduct.price.toFixed(2) }</Text>
        <Button
          style={ styles.btn }
          title='Add to Cart '
          color={ Colors.btn1 }
          onPress={ () => {
            dispatch(cartActions.addToCart(selectedProduct));
          } } />
      </View>
      <Text style={ styles.description }>{ selectedProduct.description }</Text>
    </ScrollView>
  );
};

export const productDetailScreenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  btn: {
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 16,
    textAlign: 'left',
    marginHorizontal: 20,
    marginVertical: 20
  }
});

export default ProductDetailScreen;