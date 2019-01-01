const Product = require('../../models/product')

// GET All products
exports.getDashboard = (request, response, next) => {
    response.render('admin/dashboard', {
        pageTitle: 'Dashboard',
        path: '/admin/dashboard'
    });
};

// GET All products
exports.getAddProduct = (request, response, next) => {
    response.render('admin/add_product', {
        pageTitle: 'Add Product',
        path: '/admin/add_product'
    });
};

// POST new product
exports.postAddProduct = (request, response, next) => {
    const title = request.body.title;
    const price = request.body.price;
    const description = request.body.description;
    const imageUrl = request.body.imageUrl;
    const product = new Product(title, price, description, imageUrl);
    product.save();
    response.redirect('/admin/products');
};

exports.getProducts = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};