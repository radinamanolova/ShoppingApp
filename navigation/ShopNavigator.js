import React from 'react';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import ProductDetailScreen, { productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? Colors.title : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={ defaultNavOptions }>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ ProductsOverviewScreen }
        options={ productOverviewScreenOptions }
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ ProductDetailScreen }
        options={ productDetailScreenOptions }
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={ CartScreen }
        options={ cartScreenOptions }
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrderStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={ defaultNavOptions }>
      <OrderStackNavigator.Screen
        name="Orders"
        component={ OrdersScreen }
        options={ ordersScreenOptions }
      />
    </OrderStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={ defaultNavOptions }>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={ UserProductsScreen }
        options={ userProductsScreenOptions }
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={ EditProductScreen }
        options={ editProductScreenOptions }
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={ props => {
        return (
          <View style={ { flex: 1, paddingTop: 50 } }>
            <SafeAreaView forceInset={ { top: 'always', horizontal: 'never' } }>
              <DrawerItemList { ...props } />
              <View style={ { width: '80%', marginHorizontal: 22, marginVertical: 10 } }>
                <Button
                  title="Logout "
                  color={ Colors.accent }
                  onPress={ () => {
                    dispatch(authActions.logout());
                  } }
                />
              </View>
            </SafeAreaView>
          </View>
        );
      } }
      drawerContentOptions={ {
        activeTintColor: Colors.accent
      } }
    >
      <ShopDrawerNavigator.Screen
        name="Products "
        component={ ProductsNavigator }
        options={ {
          drawerIcon: props => (
            <Ionicons
              name={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
              size={ 23 }
              color={ props.color }
            />
          )
        } }
      />
      <ShopDrawerNavigator.Screen
        name="Orders "
        component={ OrdersNavigator }
        options={ {
          drawerIcon: props => (
            <Ionicons
              name={ Platform.OS === 'android' ? 'md-list' : 'ios-list' }
              size={ 23 }
              color={ props.color }
            />
          )
        } }
      />
      <ShopDrawerNavigator.Screen
        name="Admin "
        component={ AdminNavigator }
        options={ {
          drawerIcon: props => (
            <Ionicons
              name={ Platform.OS === 'android' ? 'md-create' : 'ios-create' }
              size={ 23 }
              color={ props.color }
            />
          )
        } }
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={ defaultNavOptions }>
      <AuthStackNavigator.Screen
        name="Auth"
        component={ AuthScreen }
        options={ authScreenOptions }
      />
    </AuthStackNavigator.Navigator>
  );
};
