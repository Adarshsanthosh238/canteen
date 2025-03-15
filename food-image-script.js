// Script to replace placeholder images with food-specific images
document.addEventListener('DOMContentLoaded', function() {
    // Define image URLs for each menu item
    const foodImages = {
        'Breakfast Sandwich': 'https://source.unsplash.com/random/300x200/?breakfast,sandwich',
        'Veggie Omelette': 'https://source.unsplash.com/random/300x200/?omelette,vegetable',
        'Chicken Biryani': 'https://source.unsplash.com/random/300x200/?biryani,chicken',
        'Veg Thali': 'https://source.unsplash.com/random/300x200/?thali,indian',
        'Paneer Butter Masala': 'https://source.unsplash.com/random/300x200/?paneer,curry',
        'Samosa Plate': 'https://source.unsplash.com/random/300x200/?samosa,indian',
        'Vada Pav': 'https://source.unsplash.com/random/300x200/?vada,indian',
        'Masala Chai': 'https://source.unsplash.com/random/300x200/?chai,tea',
        'Mango Lassi': 'https://source.unsplash.com/random/300x200/?lassi,mango'
    };
    
    // Function to replace placeholder images with food-specific images
    function replacePlaceholderImages() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent;
            const imgElement = item.querySelector('img');
            
            // If we have a specific image for this food item
            if (foodImages[itemName] && imgElement) {
                imgElement.src = foodImages[itemName];
                imgElement.alt = itemName;
            }
        });
    }
    
    // Call the function to replace images
    replacePlaceholderImages();
});
