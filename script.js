const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');
const productGrid = document.querySelector('.product-grid');
const noResultsMessageId = 'no-results-message';

const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();
    let productsFound = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-card__name').textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            card.style.display = 'flex';
            productsFound = true;
        } else {
            card.style.display = 'none';
        }
    });

    const existingMessage = document.getElementById(noResultsMessageId);
    if (!productsFound && !existingMessage) {
        const noResultsEl = document.createElement('p');
        noResultsEl.id = noResultsMessageId;
        noResultsEl.textContent = 'No products found matching your search.';
        noResultsEl.style.gridColumn = '1 / -1';
        noResultsEl.style.textAlign = 'center';
        productGrid.appendChild(noResultsEl);
    } else if (productsFound && existingMessage) {
        existingMessage.remove();
    }
};

if (searchForm && searchInput && productGrid) {
    searchInput.addEventListener('input', handleSearch);
    searchForm.addEventListener('submit', (event) => event.preventDefault());
}

// --- Cart Functionality ---
const addToCartButtons = document.querySelectorAll('.product-card .btn--secondary');
const cartLink = document.querySelector('.cart-link');
const cartCountSpan = document.getElementById('cart-count');

if (addToCartButtons.length > 0 && cartLink && cartCountSpan) {
    const initialCartText = cartCountSpan.textContent;
    const match = initialCartText.match(/\((\d+)\)/);
    let cartItemCount = match ? parseInt(match[1], 10) : 0;

    const handleAddToCartClick = () => {
        cartItemCount++;
        cartCountSpan.textContent = `Cart (${cartItemCount})`;
        cartLink.setAttribute('aria-label', `Shopping Cart with ${cartItemCount} items`);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
}


document.getElementById("year").textContent = new Date().getFullYear();