// script.js لموقع إبداع

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initProductInteractions();
    initCartSystem();
    initSearchFunctionality();
    initThemeSwitcher();
});

// تفعيل القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // تأثير تحويل الزر
            this.classList.toggle('active');
        });
    }
}

// تأثيرات التمرير
function initScrollEffects() {
    const navbar = document.querySelector('nav');
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar fixed top-0 left-0 z-50';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // تحديث شريط التقدم
        progressBar.style.width = scrollPercent + '%';
        
        // تأثير الظل لشريط التنقل
        if (scrollTop > 50) {
            navbar.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        }
        
        // تفعيل العناصر عند الظهور
        activateOnScrollElements();
    });
}

// تفعيل العناصر عند التمرير
function activateOnScrollElements() {
    const elements = document.querySelectorAll('.fade-in, .stagger-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// تفعيل الحركات والتحريكات
function initAnimations() {
    // تفعيل تأثيرات الكتابة
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.width = '0';
        
        setTimeout(() => {
            typeWriterEffect(el, text, 0);
        }, 1000);
    });
    
    // تأثيرات العائمة
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// تأثير الكتابة
function typeWriterEffect(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        element.style.width = `${(i + 1) * 10}%`;
        setTimeout(() => typeWriterEffect(element, text, i + 1), 100);
    } else {
        element.style.borderRight = 'none';
    }
}

// تفعيل نموذج الاتصال
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // محاكاة الإرسال
            simulateFormSubmission(data)
                .then(response => {
                    showNotification('شكرًا لك! تم استلام رسالتك بنجاح.', 'success');
                    this.reset();
                })
                .catch(error => {
                    showNotification('عذرًا، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.', 'error');
                });
        });
    }
}

// محاكاة إرسال النموذج
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // محاكاة نجاح الإرسال بنسبة 90%
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'تم الإرسال بنجاح' });
            } else {
                reject({ success: false, message: 'فشل الإرسال' });
            }
        }, 1500);
    });
}

// تفعيل تفاعلات المنتجات
function initProductInteractions() {
    // أزرار الإعجاب
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('text-red-500');
            this.classList.toggle('text-gray-400');
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
            } else {
                icon.classList.replace('fas', 'far');
            }
        });
    });
    
    // أزرار المشاركة
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // محاكاة مشاركة المنتج
            showNotification('تم نسخ رابط المشاركة', 'info');
        });
    });
}

// نظام السلة
function initCartSystem() {
    let cart = JSON.parse(localStorage.getItem('ibdaa-cart')) || [];
    
    // تحديث عداد السلة
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = cart.length;
            cartCounter.classList.toggle('hidden', cart.length === 0);
        }
    }
    
    // أزرار إضافة إلى السلة
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = this.dataset.productId;
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // إضافة المنتج إلى السلة
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            
            // التحقق من وجود المنتج مسبقًا
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }
            
            // حفظ السلة في localStorage
            localStorage.setItem('ibdaa-cart', JSON.stringify(cart));
            
            // تحديث العداد
            updateCartCounter();
            
            // عرض إشعار
            showNotification(`تم إضافة ${productName} إلى السلة`, 'success');
            
            // تأثير الزر
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check ml-2"></i> تمت الإضافة';
            this.classList.add('bg-green-600', 'hover:bg-green-700');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('bg-green-600', 'hover:bg-green-700');
            }, 2000);
        });
    });
    
    // تهيئة عداد السلة
    updateCartCounter();
}

// وظيفة البحث
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                // محاكاة نتائج البحث
                const results = simulateSearch(query);
                displaySearchResults(results);
                searchResults.classList.remove('hidden');
            } else {
                searchResults.classList.add('hidden');
            }
        }, 300));
        
        // إخفاء نتائج البحث عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
}

// محاكاة البحث
function simulateSearch(query) {
    const products = [
        'قوالب سوشيال ميديا',
        'بروشورات دعائية',
        'شعارات جاهزة',
        'قوالب مواقع إلكترونية',
        'بطاقات عمل',
        'تصاميم إنفوجرافيك',
        'هوية بصرية',
        'تصميم شعار',
        'طباعة مستندات',
        'تصميم غلاف كتاب'
    ];
    
    return products.filter(product => 
        product.toLowerCase().includes(query.toLowerCase())
    );
}

// عرض نتائج البحث
function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => 
            `<div class="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">${result}</div>`
        ).join('');
    } else {
        searchResults.innerHTML = '<div class="p-3 text-gray-500 text-center">لا توجد نتائج</div>';
    }
}

// مفاتيح تبديل السمة
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        // التحقق من التفضيل المحفوظ
        const savedTheme = localStorage.getItem('ibdaa-theme');
        if (savedTheme === 'dark') {
            html.classList.add('dark');
        }
        
        themeToggle.addEventListener('click', function() {
            html.classList.toggle('dark');
            
            // حفظ التفضيل
            if (html.classList.contains('dark')) {
                localStorage.setItem('ibdaa-theme', 'dark');
            } else {
                localStorage.setItem('ibdaa-theme', 'light');
            }
        });
    }
}

// وظيفة المساعدة: إضافة تأخير
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300`;
    notification.textContent = message;
    
    // إضافة زر الإغلاق
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.className = 'absolute top-2 left-2 text-white hover:text-gray-200';
    closeButton.onclick = () => removeNotification(notification);
    notification.appendChild(closeButton);
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائيًا بعد 5 ثوان
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

// إزالة الإشعار
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// تهيئة كل التأثيرات عند التحميل
window.addEventListener('load', function() {
    // إضافة فئة تحميل الصفحة
    document.body.classList.add('page-loaded');
    
    // إخفاء شاشة التحميل إذا كانت موجودة
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

// تفعيل تأثيرات الصور
function initImageEffects() {
    const images = document.querySelectorAll('.image-zoom');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// تفعيل تأثيرات الأيقونات
function initIconEffects() {
    const icons = document.querySelectorAll('.service-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

  
        // تفعيل تصفية المشاريع
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة التفعيل من جميع الأزرار
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-blue-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // تفعيل الزر المحدد
                this.classList.remove('bg-gray-200', 'text-gray-800');
                this.classList.add('active', 'bg-blue-600', 'text-white');
                
                // تصفية العناصر
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // تفعيل أزرار عرض التفاصيل
        const viewProjectButtons = document.querySelectorAll('.view-project');
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectTitle = this.closest('.portfolio-overlay').querySelector('h3').textContent;
                alert(`سيتم عرض تفاصيل المشروع: ${projectTitle}`);
                // في التطبيق الحقيقي، هنا سيتم فتح نافذة منبثقة أو توجيه إلى صفحة تفاصيل المشروع
            });
        });
 // تفعيل أزرار إضافة إلى السلة
        const addToCartButtons = document.querySelectorAll('.bg-blue-600');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check ml-2"></i> تمت الإضافة!';
                this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                this.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('bg-green-600', 'hover:bg-green-700');
                    this.classList.add('bg-blue-600', 'hover:bg-blue-700');
                }, 2000);
            });
        });
  
   // تفعيل نموذج الاتصال
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // جمع بيانات النموذج
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // محاكاة إرسال النموذج
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'جاري الإرسال...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    // محاكاة نجاح الإرسال
                    alert('شكرًا لك! تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.');
                    contactForm.reset();
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }        
// تفعيل كل التأثيرات
initImageEffects();
initIconEffects();