// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const modal = document.getElementById('orderModal');
const selectedPlanInput = document.getElementById('selectedPlan');

// WhatsApp Configuration
const WHATSAPP_NUMBER = '+962782686284';

// إنشاء رسالة WhatsApp للطلب
function orderViaWhatsApp(planType) {
    // إذا كان النوع "popular"، استخدم باقة 6 أشهر
    if (planType === 'popular') {
        planType = 'semiannual';
    }

    const plan = pricingPlans[planType];
    if (!plan) return;

    let message = `🌟 *طلب اشتراك يلا كورة IPTV* 🌟\n\n`;
    message += `📋 *الباقة المختارة:* ${plan.name}\n`;
    message += `💰 *السعر:* $${plan.price}`;

    if (plan.duration) {
        message += ` / ${plan.duration === 1 ? 'شهر' : plan.duration === 3 ? '3 أشهر' : plan.duration === 6 ? '6 أشهر' : plan.duration === 12 ? 'سنة' : 'سنتان'}\n`;
    } else {
        message += `\n`;
    }

    if (plan.savings) {
        message += `💸 *توفير:* $${plan.savings}\n`;
    }

    message += `\n✨ *المميزات:*\n`;
    plan.features.forEach(feature => {
        message += `• ${feature}\n`;
    });

    message += `\n📞 أود الاستفسار عن هذه الباقة وإتمام عملية الاشتراك.\n`;
    message += `شكراً لكم 🙏`;

    // تشفير الرسالة للـ URL
    const encodedMessage = encodeURIComponent(message);

    // إنشاء رابط WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, '')}?text=${encodedMessage}`;

    // فتح WhatsApp في نافذة جديدة
    window.open(whatsappUrl, '_blank');

    // عرض إشعار للمستخدم
    showNotification(
        'جاري توجيهك إلى WhatsApp',
        'سيتم فتح تطبيق WhatsApp لإتمام طلب الاشتراك',
        'success'
    );
}

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 35, 126, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(26, 35, 126, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll to section - محسن للWebView
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = element.offsetTop - headerHeight;

        // طريقة بديلة للتمرير إذا فشلت الطريقة الأولى
        try {
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        } catch (e) {
            // إذا فشل smooth scroll، استخدم الطريقة التقليدية
            window.scrollTo(0, elementPosition);
        }

        // طريقة إضافية للWebView
        if (element.scrollIntoView) {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100);
        }
    }
}

// Pricing plans data
const pricingPlans = {
    monthly: {
        name: 'باقة شهر واحد',
        price: 7,
        duration: 1,
        features: [
            '11,000+ قناة',
            'جودة HD و 4K',
            '1 جهاز متزامن',
            'دعم فني',
            'مكتبة الأفلام والمسلسلات'
        ]
    },
    quarterly: {
        name: 'باقة 3 أشهر',
        price: 15,
        duration: 3,
        originalPrice: 30,
        savings: 3,
        features: [
            '11,000+ قناة',
            'جودة HD و 4K',
            '1 جهاز متزامن',
            'دعم فني',
            'مكتبة الأفلام والمسلسلات'
        ]
    },
    semiannual: {
        name: 'باقة 6 أشهر',
        price: 25,
        duration: 6,
        originalPrice: 60,
        savings: 12,
        features: [
            '11,000+ قناة',
            'جودة HD و 4K',
            '1 أجهزة متزامنة',
            'دعم فني',
            'مكتبة الأفلام والمسلسلات'
        ]
    }, annual: {
        name: 'باقة سنة كاملة (الأكثر شعبية)',
        price: 35,
        duration: 12,
        originalPrice: 120,
        savings: 40,
        popular: true,
        features: [
            '11,000+ قناة',
            'جودة HD و 4K',
            '1 أجهزة متزامنة',
            'دعم فني',
            'مكتبة الأفلام والمسلسلات'
        ]
    },
    biannual: {
        name: 'باقة سنتان',
        price: 55,
        duration: 24,
        originalPrice: 240,
        savings: 100,
        features: [
            '11,000+ قناة',
            'جودة HD و 4K',
            '1 أجهزة متزامنة',
            'دعم فني',
            'مكتبة الأفلام والمسلسلات'
        ]
    }
};

// Open order modal
function openOrderModal(planType) {
    const plan = pricingPlans[planType];
    if (plan && selectedPlanInput) {
        selectedPlanInput.value = plan.name;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Create or update plan details display
        let planDetails = document.querySelector('.plan-details');
        if (!planDetails) {
            planDetails = document.createElement('div');
            planDetails.className = 'plan-details';
            selectedPlanInput.parentNode.insertAdjacentElement('afterend', planDetails);
        }

        let detailsHTML = `<div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem;">`;
        detailsHTML += `<h4 style="color: #1a237e; margin: 0 0 0.5rem 0;">تفاصيل الباقة:</h4>`;
        detailsHTML += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">`;
        detailsHTML += `<span>السعر:</span>`;

        if (plan.originalPrice && plan.savings) {
            detailsHTML += `<div>`;
            detailsHTML += `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">$${plan.originalPrice}</span>`;
            detailsHTML += `<span style="font-weight: 700; color: #1a237e; font-size: 1.2rem;">$${plan.price}</span>`;
            detailsHTML += `</div>`;
            detailsHTML += `</div>`;
            detailsHTML += `<div style="color: #28a745; font-weight: 600; text-align: center; margin-top: 0.5rem;">`;
            detailsHTML += `🎉 وفر $${plan.savings} مع هذه الباقة!`;
            detailsHTML += `</div>`;
        } else {
            detailsHTML += `<span style="font-weight: 700; color: #1a237e; font-size: 1.2rem;">$${plan.price}</span>`;
            detailsHTML += `</div>`;
        }

        detailsHTML += `<div style="margin-top: 1rem;">`;
        detailsHTML += `<strong>المدة:</strong> ${getPeriodText(plan.duration)}`;
        detailsHTML += `</div>`;
        detailsHTML += `</div>`;

        planDetails.innerHTML = detailsHTML;

        // Add animation class
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
}

// Helper function to get period text
function getPeriodText(duration) {
    switch (duration) {
        case 1: return 'شهر واحد';
        case 3: return '3 أشهر';
        case 6: return '6 أشهر';
        case 12: return 'سنة كاملة';
        case 24: return 'سنتان';
        default: return `${duration} شهر`;
    }
}

// Close order modal
function closeOrderModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('orderForm').reset();

    // Remove plan details if exists
    const planDetails = document.querySelector('.plan-details');
    if (planDetails) {
        planDetails.remove();
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeOrderModal();
    }
});

// Handle order form submission
function submitOrder(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Find the selected plan type
    let selectedPlanType = '';
    const selectedPlanName = selectedPlanInput.value;
    for (const [key, plan] of Object.entries(pricingPlans)) {
        if (plan.name === selectedPlanName) {
            selectedPlanType = key;
            break;
        }
    }

    const selectedPlan = pricingPlans[selectedPlanType];

    const orderData = {
        planType: selectedPlanType,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        duration: selectedPlan.duration,
        savings: selectedPlan.savings || 0,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        notes: formData.get('notes'),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
    submitBtn.disabled = true;

    // Simulate order processing
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        let successMessage = 'تم إرسال طلبك بنجاح!';
        let details = `باقة: ${selectedPlan.name} - السعر: $${selectedPlan.price}`;
        if (selectedPlan.savings) {
            details += ` (وفرت $${selectedPlan.savings})`;
        }

        showNotification(
            successMessage,
            `${details}\nسيتم التواصل معك قريباً لإتمام عملية الدفع.`,
            'success'
        );

        // Close modal and reset form
        closeOrderModal();

        // In a real application, you would send this data to your server
        console.log('Order submitted:', orderData);

    }, 2000);
}

// Handle contact form submission
function submitContactForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    // Simulate form processing
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification(
            'تم إرسال رسالتك بنجاح!',
            'سنرد عليك في أقرب وقت ممكن.',
            'success'
        );

        // Reset form
        event.target.reset();

        // In a real application, you would send this data to your server
        console.log('Contact form submitted:', contactData);

    }, 1500);
}

// Show notification
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 3000;
                max-width: 400px;
                transform: translateX(500px);
                transition: transform 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #28a745;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: 1rem;
                gap: 1rem;
            }
            
            .notification-icon {
                flex-shrink: 0;
            }
            
            .notification-success .notification-icon i {
                color: #28a745;
                font-size: 1.5rem;
            }
            
            .notification-text h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
                font-size: 1rem;
            }
            
            .notification-text p {
                margin: 0;
                color: #666;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                color: #666;
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

// Close notification
function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.transform = 'translateX(500px)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation to hero elements
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-image').style.opacity = '1';
    }, 100);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeOrderModal();
    }
});

// Form validation enhancements
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation to forms
document.addEventListener('input', (e) => {
    const input = e.target;

    if (input.type === 'email') {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#28a745';
        }
    }

    if (input.type === 'tel') {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#28a745';
        }
    }
});

// Add smooth animations to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// دالة للتواصل العام عبر WhatsApp
function contactViaWhatsApp() {
    const message = `مرحباً 👋\n\nأود الاستفسار عن خدمات يلا كورة IPTV.\n\nيرجى تزويدي بالمزيد من المعلومات.\n\nشكراً لكم 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, '')}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    showNotification(
        'جاري توجيهك إلى WhatsApp',
        'سيتم فتح تطبيق WhatsApp للتواصل معنا',
        'success'
    );
}

// Back to Top Button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    showNotification(
        'العودة إلى الأعلى',
        'تم الانتقال إلى أعلى الصفحة',
        'success'
    );
}

console.log('يلا كورة IPTV website loaded successfully! 🚀');
