// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user state
    initUserState();
    
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }
    
    // Signup form validation
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateSignupForm();
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // User dropdown toggle
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function() {
            this.querySelector('.dropdown-content').classList.toggle('show');
        });
    }
});

// Initialize User State
function initUserState() {
    const currentUser = localStorage.getItem('currentUser');
    const userElement = document.getElementById('currentUser');
    
    if (currentUser && userElement) {
        userElement.textContent = JSON.parse(currentUser).username;
    }
    
    // Initialize cart count
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;
    }
}

// Login Form Validation
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');
    
    // Simple validation
    if (!username || !password) {
        errorMessage.textContent = "Please enter both username and password.";
        return false;
    }
    
    // Mock authentication (in a real app, this would be a server request)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        errorMessage.textContent = "Invalid username or password.";
        return false;
    }
    
    // Store user info in localStorage (in a real app, would use secure cookies or JWT)
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname
    }));
    
    // Redirect to main page
    window.location.href = "main.html";
    return true;
}

// Signup Form Validation
function validateSignupForm() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('signup-error');
    
    // Simple validation
    if (!fullname || !email || !username || !password || !confirmPassword) {
        errorMessage.textContent = "Please fill in all fields.";
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
        return false;
    }
    
    // Confirm password
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match. Please try again.";
        return false;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
        errorMessage.textContent = "Username already exists. Please choose another one.";
        return false;
    }
    
    // Add new user
    const newUser = {
        id: Date.now().toString(),
        fullname,
        email,
        username,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    errorMessage.textContent = "Account created successfully!";
    errorMessage.style.color = "#4CAF50";
    
    // Redirect to login page after a delay
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
    
    return true;
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.username')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Add to Cart Function (for menu page)
function addToCart(itemId, itemName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    
    if (existingItemIndex !== -1) {
        // Increase quantity if already in cart
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: itemId,
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification (optional)
    alert(`${itemName} added to cart!`);
}
