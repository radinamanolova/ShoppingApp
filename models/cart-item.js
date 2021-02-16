class CartItem {
  constructor (quantity, productPrice, productImageUrl, productTitle, pushToken, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productImageUrl = productImageUrl;
    this.productTitle = productTitle;
    this.pushToken = pushToken;
    this.sum = sum;
  }
}

export default CartItem;