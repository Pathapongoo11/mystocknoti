function increment(products, id) {
    const updatedProducts = products.map(product => {
        if (product.id === id) {
            console.log(`Incrementing product ${id}: current quantity ${product.quantity}`);
            return {...product, quantity: product.quantity + 1};
        }
        return product;
    });
    console.log("Products after increment:", updatedProducts);
    return updatedProducts;
}

function decrement(products, id) {
    const updatedProducts = products.map(product => {
        if (product.id === id && product.quantity > 1) {
            console.log(`Decrementing product ${id}: current quantity ${product.quantity}`);
            return {...product, quantity: product.quantity - 1};
        }
        return product;
    });
    console.log("Products after decrement:", updatedProducts);
    return updatedProducts;
}

export { increment, decrement };
