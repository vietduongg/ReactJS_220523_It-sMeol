const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.playload;
  switch (action.type) {
    //Handling when a product is added
    case "ADDITEM":
      // Check the products that already exist in the cart
      const existWhenAdd = state.find((X) => X.id === product.id);
      if (existWhenAdd) {
        console.log("Da cong them 1 san pham");
        // If it already exists, the number of products will be increased by one
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
        //If the product does not exist, the product will be added to the cart with quantity 1
      } else {
        console.log("Da them moi 1 san pham");
        const product = action.playload;
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
      break;

    //Handling when a product is removed from the cart
    case "DELITEM":
      // Check the products that already exist in the cart
      const existWhenDel = state.find((x) => x.id === product.id);
      //When the quantity of the product in the cart is only 1, the item will be removed from the cart
      if (existWhenDel.qty === 1) {
        console.log("Da xa mot san pham ra khoi gio hang");
        return state.filter((x) => x.id !== existWhenDel.id);
      } else {
        console.log("Da xa mot san pham so luong san pham = 1");
        //If the quantity of products is more than 1 product, the quantity of products in the cart will be reduced by 1 product
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;
    default:
      return state;
      break;
  }
};

export default handleCart;
