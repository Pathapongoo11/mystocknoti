function increment(products, id) {
    const updatedProducts = products.map(product => {
        if (product.id === id) {
            return {...product, quantity:  product.quantity < 10 ? product.quantity + 1 : product.quantity };
        }
        return product;
    });
    return updatedProducts;
}

function decrement(products, id) {
    const updatedProducts = products.map(product => {
        if (product.id === id && product.quantity > 1) {
            return {...product, quantity: product.quantity - 1};
        }
        return product;
    });
    return updatedProducts;
}

export { increment, decrement };
