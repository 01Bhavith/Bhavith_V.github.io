// Wait for DOM to load
$(document).ready(function() {
    
    // Mobile Navigation Toggle
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
        
        // Animate hamburger icon
        if($(this).hasClass('active')) {
            $(this).find('span:nth-child(1)').css('transform', 'rotate(45deg) translate(5px, 5px)');
            $(this).find('span:nth-child(2)').css('opacity', '0');
            $(this).find('span:nth-child(3)').css('transform', 'rotate(-45deg) translate(7px, -6px)');
        } else {
            $(this).find('span').css({'transform': 'none', 'opacity': '1'});
        }
    });
    
    // Close mobile menu when clicking a link
    $('.nav-links a').click(function() {
        $('.nav-links').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.hamburger span').css({'transform': 'none', 'opacity': '1'});
    });
    
    // Smooth Scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Tab Functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all tabs and buttons
        $('.tab-btn').removeClass('active');
        $('.tab-pane').removeClass('active');
        
        // Add active class to clicked button and corresponding tab
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
    });
    
    // Scroll Animation for Elements
    function checkScroll() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    $(window).on('scroll', checkScroll);
    checkScroll(); // Check on page load
    
    // Navbar Background on Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('background', 'rgba(26, 26, 46, 0.95)');
        } else {
            $('.navbar').css('background', 'var(--dark-bg)');
        }
    });
    
    // Contact Form Submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Basic validation
        if(name && email && subject && message) {
            // Show success message
            $('#formMessage')
                .removeClass('error')
                .addClass('success')
                .text('Thank you for your message! I will get back to you soon.')
                .fadeIn();
            
            // Reset form
            this.reset();
            
            // Hide message after 5 seconds
            setTimeout(function() {
                $('#formMessage').fadeOut();
            }, 5000);
            
            // Here you would typically send the data to a server
            // For now, we'll just log it to console
            console.log('Form submitted:', { name, email, subject, message });
        } else {
            // Show error message
            $('#formMessage')
                .removeClass('success')
                .addClass('error')
                .text('Please fill in all fields.')
                .fadeIn();
        }
    });
    
    // Project Cards Hover Effect
    $('.project-card').hover(
        function() {
            $(this).find('.project-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.project-overlay').css('opacity', '0');
        }
    );
    
    // Dynamic Text Typing Effect (Optional)
    if($('.subtitle').length) {
        const text = $('.subtitle').text();
        $('.subtitle').text('');
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                $('.subtitle').append(text.charAt(i));
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Add scroll progress indicator
    $('body').append('<div class="scroll-progress"></div>');
    $('head').append('<style>.scroll-progress{position:fixed;top:0;left:0;height:4px;background:var(--secondary-color);z-index:9999;transition:width 0.3s;}</style>');
    
    $(window).scroll(function() {
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        $('.scroll-progress').css('width', scrollPercent + '%');
    });
    
});

// Vanilla JavaScript for additional functionality

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if(hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
    }
});

// Add current year to footer dynamically
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if(footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}
