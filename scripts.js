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



// Function to toggle project details (show or hide)
// Function to toggle project details (show or hide)
function toggleDetails(projectId) {
    const project = document.getElementById(projectId);
    if (!project) {
        console.error(`Project with ID ${projectId} not found!`);
        return;
    }

    const details = project.querySelector(".project-details");
    const button = project.querySelector(".project-link");
    const backdrop = document.querySelector(".project-details-backdrop");
    const headerHeight = document.querySelector("header").offsetHeight || 0; // Get header height
    const footerHeight = document.querySelector("footer")?.offsetHeight || 0; // Get footer height
    const viewportHeight = window.innerHeight;

    // If the details are currently hidden, show them
    if (details.style.display === "none" || !details.style.display) {
        // Show details
        details.style.display = "block";
        details.style.position = "fixed";
        details.style.top = `${headerHeight}px`; // Position immediately below the header
        details.style.left = "50%"; // Center horizontally
        details.style.transform = "translateX(-50%)"; // True center horizontally
        details.style.width = "80%"; // Occupy 80% of the viewport width
        details.style.maxHeight = `${viewportHeight - headerHeight - footerHeight}px`; // Limit height to fit between header and footer
        details.style.overflowY = "auto"; // Scroll if content exceeds available height
        details.style.backgroundColor = "#fff"; // Background color
        details.style.padding = "20px"; // Padding for content
        details.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)"; // Shadow for focus
        details.style.zIndex = "1000"; // Above other elements

        // Show backdrop
        backdrop.classList.add("active");

        // Change button text to "Hide Project"
        button.textContent = "Hide Project";
    } else {
        // If details are already shown, hide them
        details.style.display = "none";

        // Hide backdrop
        backdrop.classList.remove("active");

        // Change button text back to "View Project"
        button.textContent = "View Project";
    }
}

// Function to close details when clicking on the backdrop
function closeDetails() {
    const details = document.querySelectorAll(".project-details");
    const backdrop = document.querySelector(".project-details-backdrop");

    details.forEach(detail => (detail.style.display = "none"));
    backdrop.classList.remove("active");
}

// Add event listeners for "View Project" links in Portfolio section
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor link behavior

        // Get the target project ID from the link's href (this will match the project section's ID)
        const targetId = this.getAttribute('href').substring(1); // Remove the '#' character

        // Log the targetId for debugging
        console.log(`Attempting to scroll to project with ID: ${targetId}`);

        // Ensure the target element exists
        const targetElement = document.querySelector(`#${targetId}`);
        if (!targetElement) {
            console.error(`No element found with ID "${targetId}"`);
            return; // Exit if the target project doesn't exist
        }

        // Scroll to the project section (smooth scroll)
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Wait a moment for the scroll to finish before showing the project details
        setTimeout(() => {
            toggleDetails(targetId);
        }, 600); // Adjust timing if needed based on smooth scroll duration
    });
});

// Add event listener to close project details when clicking on the backdrop
document.querySelector('.project-details-backdrop').addEventListener('click', closeDetails);

// Ensure the backdrop div is rendered once in the body (only 1 instance should exist).
if (document.querySelectorAll('.project-details-backdrop').length === 0) {
    const backdrop = document.createElement('div');
    backdrop.classList.add('project-details-backdrop');
    document.body.appendChild(backdrop);
}








