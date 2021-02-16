import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={ styles.productContainer }>
      <View style={ styles.touchable }>
        <TouchableComponent onPress={ props.onSelect } useForeground>
          <View>
            <View style={ styles.imageContainer }>
              <Image style={ styles.image } source={ { uri: props.imageUrl } } />
            </View>
            <View style={ styles.detailsContainer }>
              <Text style={ styles.title }>{ props.title }</Text>
              <Text style={ styles.price }>${ props.price.toFixed(2) }</Text>
            </View>
            <View style={ styles.buttonsContainer }>
              { props.children }
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    height: 300,
    margin: 20,
    overflow: 'hidden'
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  detailsContainer: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;