const Product = require('../models/product');

/**
 * *********************************************************** 
 * Admin dashboard section!
 */
exports.getDashboard = (request, response, next) => {
    response.render('admin/dashboard', {
        pageTitle: 'Dashboard',
        path: '/admin/dashboard'
    });
};

/**
 * *********************************************************** 
 * Display list of all existing product!
 */
exports.getProducts = (request, response, next) => {
    Product.find()
        //.populate('userId')
        .then(products => {
            //console.log(products);
            response.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err)
        });
};

/**
 * *********************************************************** 
 * Fetch single existing product!
 */
exports.getAddProduct = (request, response, next) => {
    response.render('admin/edit_product', {
        pageTitle: 'Add Product',
        path: '/admin/add_product',
        editing: false
    });
};

/**
 * *********************************************************** 
 * Add a new product!
 */
exports.postAddProduct = (request, response, next) => {
    const title = request.body.title;
    const price = request.body.price;
    const description = request.body.description;
    const imageUrl = request.body.imageUrl;
    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: request.user
    });
    product.save()
        .then(result => {
            console.log('Created Product');
            response.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
};

/**
 * *********************************************************** 
 * Edit data of existing product!
 */
exports.getEditProduct = (request, response, next) => {
    const editMode = request.query.edit;
    if (!editMode) {
        return response.redirect('/admin/products');
    }
    const prodId = request.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return response.redirect('/admin/products');
            }
            response.render('admin/edit_product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit_product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err)
        });
};

/**
 * *********************************************************** 
 * Update data of existing product!
 */
exports.postEditProduct = (request, response, next) => {
    const prodId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedPrice = request.body.price;
    const updatedDesc = request.body.description;
    const updatedImageUrl = request.body.imageUrl;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            response.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
};

/**
 * *********************************************************** 
 * Delete an existing product!
 */
exports.postDeleteProduct = (request, response, next) => {
    const prodId = request.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('Destroyed Product');
            response.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
};