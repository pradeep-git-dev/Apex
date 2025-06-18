document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
          id: 1,
          name: "iPhone 16 Pro",
          category: "Mobiles",
          price: 139900,
          image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg",
          description: "The latest Pro model with cutting-edge camera and A18 Bionic chip."
        },
        {
          id: 2,
          name: "iPhone 16 Plus",
          category: "Mobiles",
          price: 109900,
          image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg",
          description: "Larger display and enhanced battery life for everyday use."
        },
        {
          id: 3,
          name: "iPhone 15 Pro Max",
          category: "Mobiles",
          price: 129900,
          image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
          description: "Previous generation's top-tier phone, still a powerhouse."
        },
        {
          id: 4,
          name: "Mac Air Book",
          category: "Laptops",
          price: 99999,
          image: "./images/mac.jpeg",
          description: "Ultra-portable laptop with M3 chip for exceptional performance."
        },
        {
          id: 5,
          name: "Asus Vivobook",
          category: "Laptops",
          price: 65000,
          image: "images/pexels-beyzaa-yurtkuran-279977530-16245254.jpg",
          description: "Versatile and stylish laptop for productivity and entertainment."
        },
        {
          id: 6,
          name: "Lenovo ThinkBook",
          category: "Laptops",
          price: 72000,
          image: "./images/pexels-olenkabohovyk-3550483.jpg",
          description: "Business-ready laptop with robust security features and reliable performance."
        },
        {
          id: 7,
          name: "OnePlus Earbuds",
          category: "Gadgets",
          price: 4999,
          image: "./images/pexels-soulful-pizza-2080276-3780681.jpg",
          description: "Immersive audio experience with active noise cancellation."
        },
        {
          id: 8,
          name: "Smartwatch",
          category: "Gadgets",
          price: 8999,
          image: "./images/pexels-pixabay-267394.jpg",
          description: "Track your health, fitness, and stay connected on the go."
        },
        {
          id: 9,
          name: "Romeo and Juliet",
          category: "Books",
          price: 299,
          image: "./images/pexels-sema-nur-247860367-14413791.jpg",
          description: "William Shakespeare's timeless tragic romance."
        },
        {
          id: 10,
          name: "The Notebook",
          category: "Books",
          price: 349,
          image: "./images/the-notebook.jpeg",
          description: "Nicholas Sparks' classic tale of enduring love."
        },
        {
          id: 11,
          name: "Pride and Prejudice",
          category: "Books",
          price: 399,
          image: "./images/pexels-suzyhazelwood-1480335.jpg",
          description: "Jane Austen's beloved novel of manners and matrimony."
        },
        {
          id: 12,
          name: "Fast Charger (65W)",
          category: "Accessories",
          price: 1499,
          image: "./images/pexels-karolina-grabowska-5208832.jpg",
          description: "Quickly charge your devices with this high-power adapter."
        }
      ];
      
      

    const productListing = document.getElementById('productListing');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOrder = document.getElementById('sortOrder');
    const noProductsMessage = document.getElementById('noProductsMessage');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    let cart = [];

    function loadCart() {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        updateCartDisplay();
    }

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('cart-item');
                li.innerHTML = `
                    <div class="cart-item-info">
                        <span>${item.name}</span>
                        <span>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</span>
                    </div>
                    <div class="cart-item-actions">
                        <span class="quantity">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsList.appendChild(li);
            });
        }

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Total: ₹${totalAmount.toLocaleString('en-IN')}`;
    }

    function addToCart(productId) {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            const existingCartItem = cart.find(item => item.id === productId);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({ ...productToAdd, quantity: 1 });
            }
            saveCart();
        }
    }

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            saveCart();
        }
    }

    function populateCategories() {
        const categories = [...new Set(products.map(product => product.category))];
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function renderProducts(filteredProducts) {
        productListing.innerHTML = '';
        if (filteredProducts.length === 0) {
            noProductsMessage.classList.remove('hidden');
            return;
        } else {
            noProductsMessage.classList.add('hidden');
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x200/333333/FFFFFF?text=Image+Missing';">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                </div>
            `;
            productListing.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.currentTarget.dataset.productId);
                addToCart(productId);
            });
        });
    }

    function applyFiltersAndSort() {
        let filtered = [...products];

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        const currentSort = sortOrder.value;
        if (currentSort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderProducts(filtered);
    }

    searchInput.addEventListener('input', applyFiltersAndSort);
    categoryFilter.addEventListener('change', applyFiltersAndSort);
    sortOrder.addEventListener('change', applyFiltersAndSort);

    viewCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCartDisplay();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const productId = parseInt(event.target.dataset.productId);
            removeFromCart(productId);
        }
    });

    populateCategories();
    loadCart();
    applyFiltersAndSort();
});
