
const apiURL = "https://fakestoreapi.com/products";
let allProducts=[];

const productContainer = document.getElementById("productContainer");
const cartBtn = document.getElementById("cartBtn");

let cart = [];

// 1. Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

       allProducts=await response.json();
       displayProducts(allProducts);
    } catch (error) {
        productContainer.textContent = "Unable to load products.";
        console.log(error);
    }
}

// 2. Display products
function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p>⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
            <button class="add-btn">Add to Cart 🛒</button>
        `;

        productContainer.appendChild(productCard);

        productCard.querySelector(".add-btn").addEventListener("click", () => {
            addToCart(product);
        });
    });
}

// 3. Add product to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// 4. Update cart count
function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBtn.textContent = `🛒 Cart (${totalItems})`;

    displayCart();
}

// 5. Display cart products
function displayCart() {
    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty!";
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">

            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>

                <div class="quantity-controls">
                    <button class="decrease-btn">−</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn">+</button>
                </div>
            </div>

            <button class="remove-btn">Remove</button>
        `;

        cartItems.appendChild(cartItem);

        cartItem.querySelector(".increase-btn").addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        cartItem.querySelector(".decrease-btn").addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        cartItem.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromCart(item.id);
        });
    });

    calculateTotal();
}

// 6. Increase or decrease quantity
function changeQuantity(productId, amount) {
    const product = cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// 7. Remove product
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// 8. Calculate subtotal, tax and shipping
function calculateTotal() {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const tax = subtotal * 0.05;
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + tax + shipping;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

// 9. Open and close cart drawer
const cartDrawer = document.getElementById("cartDrawer");

cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
});

document.getElementById("closeCart").addEventListener("click", () => {
    cartDrawer.classList.remove("active");
});

// 10. Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("🎉 Order placed successfully!");

    cart = [];
    updateCart();

    cartDrawer.classList.remove("active");
});

// Start application
fetchProducts();
updateCart();



// Search products
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);
});

// Filter products by category
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const category = button.dataset.category;

        let filteredProducts;

        if (category === "all") {
            filteredProducts = allProducts;
        } else {
            filteredProducts = allProducts.filter(product =>
                product.category === category
            );
        }

        displayProducts(filteredProducts);
    });
});
