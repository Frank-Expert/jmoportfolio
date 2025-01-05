function navigateTo(target) {
    // Hide all sections first
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Hide all sections
    });

    // Show the clicked section
    const targetSection = document.getElementById(target);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block'; // Display the target section
    }

    // Handle visibility of About Me, Contact, and Portfolio sections
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    const portfolioSection = document.getElementById('portfolio');
    
    if (target === 'home') {
        if (aboutSection) {
            aboutSection.style.display = 'flex'; // Show About when Home is active
        }
        if (contactSection) {
            contactSection.style.display = 'block'; // Show Contact when Home is active
        }
        if (portfolioSection) {
            portfolioSection.style.display = 'block'; // Show Portfolio when Home is active
        }
    } else {
        if (aboutSection) {
            aboutSection.style.display = 'none'; // Hide About for other sections
        }
        if (contactSection) {
            contactSection.style.display = 'none'; // Hide Contact for other sections
        }
        if (portfolioSection) {
            portfolioSection.style.display = 'none'; // Hide Portfolio for other sections
        }
    }
}

// Initialize Home section (with About, Contact, and Portfolio) as visible by default
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home'); // Ensure Home (with About, Contact, and Portfolio) is the first section shown
});

//POP UP MESSAGE ON CONTACT FORM SECTION
document.addEventListener('DOMContentLoaded', function() {
    // Get message and status from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const message = params.get('message');
    const status = params.get('status');
    
    if (message) {
        // Set the popup message
        const popupMessage = document.getElementById("popup-message");
        popupMessage.textContent = message;

        // Add appropriate class (success or error)
        const popup = document.getElementById("popup");
        popup.classList.add(status);
        
        // Display the popup
        popup.style.display = "flex";
        
        // Close the popup on button click
        const closeButton = document.getElementById("close-popup");
        closeButton.addEventListener('click', function() {
            popup.style.display = "none";
            window.history.replaceState({}, document.title, window.location.pathname); // Clear URL params
        });
    }
});

