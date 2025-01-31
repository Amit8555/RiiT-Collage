// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const authSection = document.querySelector('.auth-section');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authSection.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 300;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset <= sectionTop + sectionHeight) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Add animation class to sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authSection = document.querySelector('.auth-section');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authSection.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Handle dropdown toggles on mobile
    if (window.innerWidth <= 992) {
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.nav-tab');
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }

    // Set active nav tab based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        const tabHref = tab.getAttribute('href');
        if (tabHref === currentPage || (currentPage === 'index.html' && tabHref === '/')) {
            tab.classList.add('active');
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 992) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Course Modal Functionality
    const courseModal = document.getElementById('courseModal');
    const coursesLink = document.querySelector('a[href="#courses"]');
    const closeModal = document.querySelector('.close-modal');

    // Open modal when clicking "Our Courses"
    coursesLink.addEventListener('click', function(e) {
        e.preventDefault();
        courseModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal when clicking the X button
    closeModal.addEventListener('click', function() {
        courseModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === courseModal) {
            courseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && courseModal.style.display === 'block') {
            courseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Course card hover effect
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Registration Modal
    const registrationModal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('registrationForm');
    const registrationSuccessModal = document.getElementById('registrationSuccessModal');

    // Show registration modal when "Register Now" is clicked
    document.querySelector('.register-btn').addEventListener('click', (e) => {
        e.preventDefault();
        registrationModal.style.display = 'block';
    });

    // Toggle password visibility
    document.querySelector('.toggle-password').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            this.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    // Generate registration number
    function generateRegistrationNumber(course) {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${course}${year}${random}`;
    }

    // Send registration email
    async function sendRegistrationEmail(data, registrationNumber) {
        // In a real application, you would make an API call to your backend
        // For demonstration, we'll simulate the email sending
        console.log('Sending registration email to:', data.email);
        console.log('Registration details:', {
            registrationNumber,
            name: data.fullName,
            course: data.course,
            email: data.email
        });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return true;
    }

    // Handle form submission
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());
        
        // Generate registration number
        const registrationNumber = generateRegistrationNumber(data.course);
        
        try {
            // Show loading state
            const submitBtn = registrationForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Send registration email
            await sendRegistrationEmail(data, registrationNumber);
            
            // Store registration data (in a real app, this would be sent to a backend)
            const registrationData = {
                ...data,
                registrationNumber,
                registrationDate: new Date().toISOString(),
                status: 'pending'
            };
            localStorage.setItem(`registration_${registrationNumber}`, JSON.stringify(registrationData));
            
            // Hide registration modal and show success modal
            registrationModal.style.display = 'none';
            document.getElementById('registrationNumber').textContent = registrationNumber;
            registrationSuccessModal.style.display = 'block';
            
            // Reset form
            registrationForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === registrationModal) {
            registrationModal.style.display = 'none';
        } else if (e.target === registrationSuccessModal) {
            registrationSuccessModal.style.display = 'none';
        }
    });

    // Close modals when clicking close button
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            registrationModal.style.display = 'none';
            registrationSuccessModal.style.display = 'none';
        });
    });

    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            registrationModal.style.display = 'none';
            registrationSuccessModal.style.display = 'none';
        }
    });

    // Course batch timings data
    const courseBatches = {
        BCA: [
            {
                id: 'BCA1',
                timing: 'Morning Batch (8:30 AM - 1:30 PM)',
                startDate: '2025-07-15',
                seats: 40,
                available: 25,
                days: 'Monday to Friday'
            },
            {
                id: 'BCA2',
                timing: 'Afternoon Batch (2:00 PM - 7:00 PM)',
                startDate: '2025-07-15',
                seats: 40,
                available: 15,
                days: 'Monday to Friday'
            }
        ],
        MCA: [
            {
                id: 'MCA1',
                timing: 'Morning Batch (9:00 AM - 2:00 PM)',
                startDate: '2025-07-20',
                seats: 30,
                available: 20,
                days: 'Monday to Friday'
            },
            {
                id: 'MCA2',
                timing: 'Evening Batch (3:00 PM - 8:00 PM)',
                startDate: '2025-07-20',
                seats: 30,
                available: 10,
                days: 'Monday to Friday'
            }
        ],
        BBA: [
            {
                id: 'BBA1',
                timing: 'Morning Batch (9:30 AM - 2:30 PM)',
                startDate: '2025-07-10',
                seats: 45,
                available: 30,
                days: 'Monday to Friday'
            },
            {
                id: 'BBA2',
                timing: 'Afternoon Batch (3:00 PM - 8:00 PM)',
                startDate: '2025-07-10',
                seats: 45,
                available: 25,
                days: 'Monday to Friday'
            }
        ],
        MBA: [
            {
                id: 'MBA1',
                timing: 'Morning Batch (10:00 AM - 3:00 PM)',
                startDate: '2025-07-25',
                seats: 35,
                available: 15,
                days: 'Monday to Friday'
            },
            {
                id: 'MBA2',
                timing: 'Evening Batch (4:00 PM - 9:00 PM)',
                startDate: '2025-07-25',
                seats: 35,
                available: 20,
                days: 'Monday to Friday'
            }
        ]
    };

    // Format date to readable string
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Update batch timing options based on selected course
    function updateBatchTimings(course) {
        const batchTimingGroup = document.getElementById('batchTimingGroup');
        const batchTimingSelect = document.getElementById('batchTiming');
        const batchStartDate = document.getElementById('batchStartDate');
        const batchClassTiming = document.getElementById('batchClassTiming');
        const batchSeats = document.getElementById('batchSeats');

        if (!course) {
            batchTimingGroup.style.display = 'none';
            return;
        }

        // Clear previous options
        batchTimingSelect.innerHTML = '<option value="">Select Batch Timing</option>';
        
        // Get batches for selected course
        const batches = courseBatches[course];
        
        // Add batch options
        batches.forEach(batch => {
            const option = document.createElement('option');
            option.value = batch.id;
            option.textContent = batch.timing;
            if (batch.available === 0) {
                option.disabled = true;
                option.textContent += ' (Full)';
            }
            batchTimingSelect.appendChild(option);
        });

        // Show batch timing group with animation
        batchTimingGroup.style.display = 'block';
        setTimeout(() => batchTimingGroup.classList.add('show'), 50);
    }

    // Update batch details when a batch is selected
    function updateBatchDetails(batchId) {
        const batchStartDate = document.getElementById('batchStartDate');
        const batchClassTiming = document.getElementById('batchClassTiming');
        const batchSeats = document.getElementById('batchSeats');

        if (!batchId) {
            batchStartDate.textContent = '';
            batchClassTiming.textContent = '';
            batchSeats.textContent = '';
            return;
        }

        // Find selected batch
        const course = batchId.slice(0, -1);
        const batches = courseBatches[course];
        const selectedBatch = batches.find(batch => batch.id === batchId);

        if (selectedBatch) {
            batchStartDate.textContent = formatDate(selectedBatch.startDate);
            batchClassTiming.textContent = `${selectedBatch.timing} (${selectedBatch.days})`;
            
            const seatsText = `${selectedBatch.available}/${selectedBatch.seats}`;
            batchSeats.textContent = seatsText;
            batchSeats.className = selectedBatch.available > 0 ? 'batch-available' : 'batch-full';
        }
    }

    // Add event listeners
    const courseSelect = document.getElementById('course');
    const batchTimingSelect = document.getElementById('batchTiming');

    // Course selection change
    courseSelect.addEventListener('change', function() {
        updateBatchTimings(this.value);
        // Reset batch details
        updateBatchDetails('');
    });

    // Batch timing selection change
    batchTimingSelect.addEventListener('change', function() {
        updateBatchDetails(this.value);
    });

    // Handle form submission
    registrationForm.addEventListener('submit', function(e) {
        const batchTiming = document.getElementById('batchTiming').value;
        if (!batchTiming) {
            e.preventDefault();
            alert('Please select a batch timing');
            return;
        }
    });

    // State and City Data
    const statesCities = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
        "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
        "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Mandi"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
        "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
        "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"]
    };

    // Initialize state dropdown
    function initializeStateDropdown() {
        const stateSelect = document.getElementById('state');
        const states = Object.keys(statesCities).sort();
        
        // Clear existing options
        stateSelect.innerHTML = '<option value="">Select State</option>';
        
        // Add state options
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    // Update city dropdown based on selected state
    function updateCityDropdown(state) {
        const citySelect = document.getElementById('city');
        
        // Clear existing options
        citySelect.innerHTML = '<option value="">Select City</option>';
        
        if (!state) {
            citySelect.disabled = true;
            return;
        }
        
        // Get cities for selected state
        const cities = statesCities[state].sort();
        
        // Add city options
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        
        // Enable city dropdown
        citySelect.disabled = false;
    }

    // Add event listeners for dropdowns
    document.addEventListener('DOMContentLoaded', function() {
        const stateSelect = document.getElementById('state');
        const citySelect = document.getElementById('city');
        
        // Initialize state dropdown
        initializeStateDropdown();
        
        // State selection change
        stateSelect.addEventListener('change', function() {
            updateCityDropdown(this.value);
        });
        
        // City selection change
        citySelect.addEventListener('change', function() {
            if (this.value) {
                // You can add additional functionality here if needed
                console.log('Selected city:', this.value);
            }
        });

        // Add pincode validation
        const pincodeInput = document.getElementById('pincode');
        pincodeInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 6);
        });

        pincodeInput.addEventListener('blur', function() {
            if (this.value.length < 6) {
                this.setCustomValidity('Pincode must be 6 digits');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    // Store selected location data in registration
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', function(e) {
        const locationData = {
            state: document.getElementById('state').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value
        };
        
        // Add location data to form data
        const formData = new FormData(this);
        formData.append('locationData', JSON.stringify(locationData));
    });

    // OTP Verification
    let otpVerified = false;
    let currentOTP = '';
    let resendTimer = null;
    let currentVerificationMethod = 'phone'; // 'phone' or 'email'

    // Generate random 6-digit OTP
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Start resend timer
    function startResendTimer() {
        let timeLeft = 30;
        const timerDisplay = document.getElementById('otpTimer');
        const resendBtn = document.getElementById('resendOtpBtn');
        
        resendBtn.disabled = true;
        
        if (resendTimer) clearInterval(resendTimer);
        
        resendTimer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(resendTimer);
                timerDisplay.textContent = '';
                resendBtn.disabled = false;
            } else {
                timerDisplay.textContent = `Resend in ${timeLeft}s`;
                timeLeft--;
            }
        }, 1000);
    }

    // Send OTP via Email
    function sendEmailOTP() {
        const email = document.getElementById('email').value;
        const otpSection = document.getElementById('otpVerificationSection');
        const sendEmailOtpBtn = document.getElementById('sendEmailOtpBtn');
        const otpMessage = document.getElementById('otpMessage');
        
        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            otpMessage.textContent = 'Please enter a valid email address';
            otpMessage.className = 'otp-message error';
            return;
        }
        
        // Generate new OTP
        currentOTP = generateOTP();
        
        // Show loading state
        sendEmailOtpBtn.disabled = true;
        sendEmailOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate email sending (In production, make an API call to your backend)
        console.log('Sending OTP:', currentOTP, 'to email:', email);
        
        // Simulate API call
        setTimeout(() => {
            // Show OTP section
            otpSection.style.display = 'block';
            
            // Reset OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
                input.classList.remove('filled');
            });
            
            // Update button state
            sendEmailOtpBtn.innerHTML = '<i class="fas fa-check-circle"></i> OTP Sent';
            
            // Start resend timer
            startResendTimer();
            
            // Show success message
            otpMessage.textContent = 'OTP sent to your email!';
            otpMessage.className = 'otp-message success';
            
            // Focus first input
            document.querySelector('.otp-input[data-index="1"]').focus();
        }, 1500);
    }

    // Send OTP via Phone
    function sendPhoneOTP() {
        const phone = document.getElementById('phone').value;
        const otpSection = document.getElementById('otpVerificationSection');
        const sendPhoneOtpBtn = document.getElementById('sendPhoneOtpBtn');
        const otpMessage = document.getElementById('otpMessage');
        
        // Validate phone number
        if (!/^\d{10}$/.test(phone)) {
            otpMessage.textContent = 'Please enter a valid 10-digit phone number';
            otpMessage.className = 'otp-message error';
            return;
        }
        
        // Generate new OTP
        currentOTP = generateOTP();
        
        // Show loading state
        sendPhoneOtpBtn.disabled = true;
        sendPhoneOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate SMS sending
        console.log('Sending OTP:', currentOTP, 'to phone:', phone);
        
        setTimeout(() => {
            // Show OTP section
            otpSection.style.display = 'block';
            
            // Reset OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
                input.classList.remove('filled');
            });
            
            // Update button state
            sendPhoneOtpBtn.innerHTML = '<i class="fas fa-check-circle"></i> OTP Sent';
            
            // Start resend timer
            startResendTimer();
            
            // Show success message
            otpMessage.textContent = 'OTP sent to your phone!';
            otpMessage.className = 'otp-message success';
            
            // Focus first input
            document.querySelector('.otp-input[data-index="1"]').focus();
        }, 1500);
    }

    // Switch verification method
    function switchVerificationMethod(method) {
        currentVerificationMethod = method;
        const phoneSection = document.getElementById('phoneOtpSection');
        const emailSection = document.querySelector('.email-input-group');
        const verifyPhoneBtn = document.getElementById('verifyPhoneBtn');
        const verifyEmailBtn = document.getElementById('verifyEmailBtn');
        const otpSection = document.getElementById('otpVerificationSection');
        
        if (method === 'phone') {
            phoneSection.style.display = 'block';
            emailSection.style.display = 'none';
            verifyPhoneBtn.classList.add('active');
            verifyEmailBtn.classList.remove('active');
        } else {
            phoneSection.style.display = 'none';
            emailSection.style.display = 'block';
            verifyPhoneBtn.classList.remove('active');
            verifyEmailBtn.classList.add('active');
        }
        
        // Reset OTP section
        otpSection.style.display = 'none';
        document.getElementById('otpMessage').textContent = '';
        if (resendTimer) clearInterval(resendTimer);
    }

    // Initialize OTP functionality
    document.addEventListener('DOMContentLoaded', function() {
        const sendPhoneOtpBtn = document.getElementById('sendPhoneOtpBtn');
        const sendEmailOtpBtn = document.getElementById('sendEmailOtpBtn');
        const verifyOtpBtn = document.getElementById('verifyOtpBtn');
        const resendOtpBtn = document.getElementById('resendOtpBtn');
        const verifyPhoneBtn = document.getElementById('verifyPhoneBtn');
        const verifyEmailBtn = document.getElementById('verifyEmailBtn');
        
        // Setup OTP inputs
        setupOTPInputs();
        
        // Phone number validation
        document.getElementById('phone').addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
            sendPhoneOtpBtn.disabled = this.value.length !== 10;
        });
        
        // Email validation
        document.getElementById('email').addEventListener('input', function() {
            sendEmailOtpBtn.disabled = !this.checkValidity();
        });
        
        // Send OTP button clicks
        sendPhoneOtpBtn.addEventListener('click', sendPhoneOTP);
        sendEmailOtpBtn.addEventListener('click', sendEmailOTP);
        
        // Verify OTP button click
        verifyOtpBtn.addEventListener('click', verifyOTP);
        
        // Resend OTP button click
        resendOtpBtn.addEventListener('click', function() {
            this.disabled = true;
            if (currentVerificationMethod === 'phone') {
                sendPhoneOTP();
            } else {
                sendEmailOTP();
            }
        });
        
        // Method selection buttons
        verifyPhoneBtn.addEventListener('click', () => switchVerificationMethod('phone'));
        verifyEmailBtn.addEventListener('click', () => switchVerificationMethod('email'));
        
        // Initial setup
        switchVerificationMethod('phone');
        
        // Prevent form submission if OTP is not verified
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            if (!otpVerified) {
                e.preventDefault();
                const otpMessage = document.getElementById('otpMessage');
                otpMessage.textContent = `Please verify your ${currentVerificationMethod}`;
                otpMessage.className = 'otp-message error';
                document.getElementById('otpVerificationSection').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Keep existing OTP input handling and verification functions
    function setupOTPInputs() {
        const inputs = document.querySelectorAll('.otp-input');
        const verifyBtn = document.getElementById('verifyOtpBtn');
        
        inputs.forEach((input, index) => {
            // Handle input
            input.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '');
                
                if (this.value) {
                    this.classList.add('filled');
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else {
                    this.classList.remove('filled');
                }
                
                // Check if all inputs are filled
                const allFilled = Array.from(inputs).every(input => input.value);
                verifyBtn.disabled = !allFilled;
            });
            
            // Handle backspace
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && !this.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
            
            // Handle paste
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').slice(0, inputs.length - index);
                
                if (/^\d+$/.test(pasteData)) {
                    Array.from(pasteData).forEach((digit, i) => {
                        if (index + i < inputs.length) {
                            inputs[index + i].value = digit;
                            inputs[index + i].classList.add('filled');
                            if (index + i < inputs.length - 1) {
                                inputs[index + i + 1].focus();
                            }
                        }
                    });
                    
                    // Check if all inputs are filled
                    const allFilled = Array.from(inputs).every(input => input.value);
                    verifyBtn.disabled = !allFilled;
                }
            });
        });
    }

    // Verify OTP
    function verifyOTP() {
        const inputs = document.querySelectorAll('.otp-input');
        const enteredOTP = Array.from(inputs).map(input => input.value).join('');
        const otpMessage = document.getElementById('otpMessage');
        const verifyBtn = document.getElementById('verifyOtpBtn');
        
        // Show loading state
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        
        // Simulate API verification
        setTimeout(() => {
            if (enteredOTP === currentOTP) {
                otpVerified = true;
                otpMessage.textContent = 'OTP verified successfully!';
                otpMessage.className = 'otp-message success';
                
                // Update UI
                verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                document.getElementById('phone').readOnly = true;
                document.getElementById('sendOtpBtn').style.display = 'none';
                
                // Enable form submission
                document.querySelector('button[type="submit"]').disabled = false;
            } else {
                otpVerified = false;
                otpMessage.textContent = 'Invalid OTP. Please try again.';
                otpMessage.className = 'otp-message error';
                
                // Reset inputs
                inputs.forEach(input => {
                    input.value = '';
                    input.classList.remove('filled');
                });
                inputs[0].focus();
                
                // Update button state
                verifyBtn.disabled = true;
                verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP';
            }
        }, 1500);
    }

    // Teacher Management System
    document.addEventListener('DOMContentLoaded', function() {
        // Tab Switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update active states
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(tabId + 'Tab').classList.add('active');
            });
        });
        
        // Modal Handling
        const attendanceModal = document.getElementById('attendanceModal');
        const payrollModal = document.getElementById('payrollModal');
        const markAttendanceBtn = document.getElementById('markAttendanceBtn');
        const generatePayrollBtn = document.getElementById('generatePayrollBtn');
        const closeBtns = document.querySelectorAll('.close');
        
        // Open modals
        markAttendanceBtn.addEventListener('click', () => {
            attendanceModal.style.display = 'block';
            document.getElementById('attendanceDate').valueAsDate = new Date();
        });
        
        generatePayrollBtn.addEventListener('click', () => {
            payrollModal.style.display = 'block';
        });
        
        // Close modals
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                attendanceModal.style.display = 'none';
                payrollModal.style.display = 'none';
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === attendanceModal) attendanceModal.style.display = 'none';
            if (e.target === payrollModal) payrollModal.style.display = 'none';
        });
        
        // Attendance Form Handling
        const attendanceForm = document.getElementById('attendanceForm');
        const attendanceTableBody = document.getElementById('attendanceTableBody');
        
        attendanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teacherId = document.getElementById('teacherId').value;
            const date = document.getElementById('attendanceDate').value;
            const status = document.getElementById('attendanceStatus').value;
            const checkIn = document.getElementById('checkInTime').value;
            const checkOut = document.getElementById('checkOutTime').value;
            
            // Add attendance record
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${teacherId}</td>
                <td>Teacher Name</td>
                <td>Department</td>
                <td>${date}</td>
                <td class="status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</td>
                <td>${checkIn || '-'}</td>
                <td>${checkOut || '-'}</td>
                <td>
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            attendanceTableBody.appendChild(row);
            attendanceModal.style.display = 'none';
            attendanceForm.reset();
        });
        
        // Payroll Form Handling
        const payrollForm = document.getElementById('payrollForm');
        const payrollTableBody = document.getElementById('payrollTableBody');
        
        // Add/Remove Allowance
        document.querySelector('.add-allowance-btn').addEventListener('click', function() {
            const allowanceItems = document.querySelector('.allowance-items');
            const newItem = document.createElement('div');
            newItem.className = 'allowance-item';
            newItem.innerHTML = `
                <input type="text" placeholder="Allowance Name">
                <input type="number" placeholder="Amount">
                <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
            `;
            allowanceItems.appendChild(newItem);
        });
        
        // Add/Remove Deduction
        document.querySelector('.add-deduction-btn').addEventListener('click', function() {
            const deductionItems = document.querySelector('.deduction-items');
            const newItem = document.createElement('div');
            newItem.className = 'deduction-item';
            newItem.innerHTML = `
                <input type="text" placeholder="Deduction Name">
                <input type="number" placeholder="Amount">
                <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
            `;
            deductionItems.appendChild(newItem);
        });
        
        // Remove Allowance/Deduction Item
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-btn')) {
                e.target.closest('.allowance-item, .deduction-item').remove();
            }
        });
        
        // Generate Payroll
        payrollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teacherId = document.getElementById('payrollTeacherId').value;
            const basicSalary = parseFloat(document.getElementById('basicSalary').value);
            
            // Calculate allowances
            let totalAllowances = 0;
            document.querySelectorAll('.allowance-item input[type="number"]').forEach(input => {
                totalAllowances += parseFloat(input.value || 0);
            });
            
            // Calculate deductions
            let totalDeductions = 0;
            document.querySelectorAll('.deduction-item input[type="number"]').forEach(input => {
                totalDeductions += parseFloat(input.value || 0);
            });
            
            // Calculate net salary
            const netSalary = basicSalary + totalAllowances - totalDeductions;
            
            // Add payroll record
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${teacherId}</td>
                <td>Teacher Name</td>
                <td>Department</td>
                <td>₹${basicSalary.toFixed(2)}</td>
                <td>₹${totalAllowances.toFixed(2)}</td>
                <td>₹${totalDeductions.toFixed(2)}</td>
                <td>₹${netSalary.toFixed(2)}</td>
                <td><span class="status-present">Paid</span></td>
                <td>
                    <button class="print-btn"><i class="fas fa-print"></i></button>
                    <button class="download-btn"><i class="fas fa-download"></i></button>
                    <button class="view-salary-slip" data-teacher-id="${teacherId}"><i class="fas fa-file-alt"></i></button>
                </td>
            `;
            
            payrollTableBody.appendChild(row);
            payrollModal.style.display = 'none';
            payrollForm.reset();
        });
        
        // Month Filter Handling
        const attendanceMonth = document.getElementById('attendanceMonth');
        const payrollMonth = document.getElementById('payrollMonth');
        
        // Set current month as default
        const currentDate = new Date();
        const currentMonth = currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0');
        attendanceMonth.value = currentMonth;
        payrollMonth.value = currentMonth;
        
        // Filter functionality can be added here
        attendanceMonth.addEventListener('change', function() {
            // Filter attendance records based on selected month
            console.log('Filter attendance for:', this.value);
        });
        
        payrollMonth.addEventListener('change', function() {
            // Filter payroll records based on selected month
            console.log('Filter payroll for:', this.value);
        });
    });

    // Function to convert number to words (Indian currency format)
    function numberToWords(num) {
        const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const formatTens = (num) => {
            if (num < 10) return single[num];
            if (num < 20) return double[num - 10];
            return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + single[num % 10] : '');
        };
        
        if (num === 0) return 'Zero';
        
        const convert = (num) => {
            if (num < 100) return formatTens(num);
            if (num < 1000) return single[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + formatTens(num % 100) : '');
            if (num < 100000) return convert(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convert(num % 1000) : '');
            if (num < 10000000) return convert(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convert(num % 100000) : '');
            return convert(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convert(num % 10000000) : '');
        };
        
        return convert(Math.floor(num)) + ' Rupees Only';
    }

    // Function to format currency
    function formatCurrency(amount) {
        return '₹' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Function to show salary slip
    function showSalarySlip(teacherId) {
        const salarySlipModal = document.getElementById('salarySlipModal');
        const closeBtn = salarySlipModal.querySelector('.close');
        const date = new Date();
        
        // Get teacher data (this should be fetched from your database)
        const teacherData = {
            id: teacherId,
            name: 'John Doe', // Replace with actual teacher name
            department: 'Computer Science',
            designation: 'Assistant Professor',
            basicSalary: 50000,
            allowances: [
                { name: 'House Rent Allowance', amount: 15000 },
                { name: 'Transport Allowance', amount: 5000 }
            ],
            deductions: [
                { name: 'Professional Tax', amount: 200 },
                { name: 'Income Tax', amount: 5000 }
            ]
        };

        // Update salary slip content
        document.getElementById('salaryMonth').textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        document.getElementById('slipEmployeeId').textContent = teacherData.id;
        document.getElementById('slipEmployeeName').textContent = teacherData.name;
        document.getElementById('slipDepartment').textContent = teacherData.department;
        document.getElementById('slipDesignation').textContent = teacherData.designation;
        document.getElementById('slipBasicSalary').textContent = formatCurrency(teacherData.basicSalary);
        document.getElementById('slipGenerationDate').textContent = date.toLocaleDateString();

        // Calculate and display allowances
        const allowancesContainer = document.getElementById('slipAllowances');
        allowancesContainer.innerHTML = '';
        let totalAllowances = 0;
        teacherData.allowances.forEach(allowance => {
            totalAllowances += allowance.amount;
            allowancesContainer.innerHTML += `
                <div class="salary-component">
                    <label>${allowance.name}:</label>
                    <span>${formatCurrency(allowance.amount)}</span>
                </div>
            `;
        });

        // Calculate and display deductions
        const deductionsContainer = document.getElementById('slipDeductions');
        deductionsContainer.innerHTML = '';
        let totalDeductions = 0;
        teacherData.deductions.forEach(deduction => {
            totalDeductions += deduction.amount;
            deductionsContainer.innerHTML += `
                <div class="salary-component">
                    <label>${deduction.name}:</label>
                    <span>${formatCurrency(deduction.amount)}</span>
                </div>
            `;
        });

        // Update totals
        const totalEarnings = teacherData.basicSalary + totalAllowances;
        document.getElementById('slipTotalEarnings').textContent = formatCurrency(totalEarnings);
        document.getElementById('slipTotalDeductions').textContent = formatCurrency(totalDeductions);
        
        const netSalary = totalEarnings - totalDeductions;
        document.getElementById('slipNetSalary').textContent = formatCurrency(netSalary);
        document.getElementById('slipSalaryInWords').textContent = numberToWords(netSalary);

        // Show modal
        salarySlipModal.style.display = 'block';

        // Close modal when clicking the close button
        closeBtn.onclick = function() {
            salarySlipModal.style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == salarySlipModal) {
                salarySlipModal.style.display = 'none';
            }
        }

        // Handle PDF download
        document.getElementById('downloadSlipBtn').onclick = function() {
            // You can implement PDF generation here using a library like jsPDF
            alert('PDF download functionality will be implemented soon!');
        }
    }

    // Add click handler to view salary slip button in the payroll table
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('view-salary-slip')) {
            const teacherId = e.target.getAttribute('data-teacher-id');
            showSalarySlip(teacherId);
        }
    });

    // Sample student data (replace with actual database data)
    const students = [
        {
            id: 'STU001',
            name: 'John Doe',
            course: 'Computer Science',
            photo: 'default-avatar.png',
            validTill: '2025-12-31'
        },
        {
            id: 'STU002',
            name: 'Jane Smith',
            course: 'Electronics',
            photo: 'default-avatar.png',
            validTill: '2025-12-31'
        }
    ];

    // Function to populate student table
    function populateStudentTable(students) {
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>
                    <button class="view-id-card" onclick="showIdCard('${student.id}')">
                        <i class="fas fa-id-card"></i> View ID Card
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to search students
    function searchStudent() {
        const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
        const filteredStudents = students.filter(student => 
            student.id.toLowerCase().includes(searchTerm) ||
            student.name.toLowerCase().includes(searchTerm)
        );
        populateStudentTable(filteredStudents);
    }

    // Function to show ID card
    function showIdCard(studentId) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        const modal = document.getElementById('idCardModal');
        
        // Update ID card details
        document.getElementById('idCardStudentId').textContent = student.id;
        document.getElementById('idCardName').textContent = student.name;
        document.getElementById('idCardCourse').textContent = student.course;
        document.getElementById('idCardValidity').textContent = new Date(student.validTill).toLocaleDateString();
        document.getElementById('studentPhoto').src = student.photo;

        // Generate barcode (you can use a barcode library like JsBarcode)
        // For now, we'll just show the student ID
        const barcode = document.querySelector('.barcode');
        barcode.textContent = student.id;

        // Show modal
        modal.style.display = 'block';

        // Close modal when clicking the close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Function to print ID card
    function printIdCard() {
        window.print();
    }

    // Function to download ID card
    function downloadIdCard() {
        // You can implement PDF generation here using a library like html2canvas + jsPDF
        alert('Download functionality will be implemented soon!');
    }

    // Initialize student table when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        populateStudentTable(students);

        // Add search input event listener
        document.getElementById('studentSearch').addEventListener('input', searchStudent);
    });

    // Current user's data (this should come from your authentication system)
    const currentUser = {
        id: 'STU001',
        name: 'John Doe',
        course: 'Computer Science',
        photo: 'default-avatar.png',
        validTill: '2025-12-31'
    };

    // Handle photo upload
    document.getElementById('photoInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('currentPhoto').src = e.target.result;
            currentUser.photo = e.target.result; // Update user's photo
        };
        reader.readAsDataURL(file);
    });

    // Function to show current user's ID card
    function showMyIdCard() {
        const modal = document.getElementById('idCardModal');
        
        // Update ID card details with current user's data
        document.getElementById('idCardStudentId').textContent = currentUser.id;
        document.getElementById('idCardName').textContent = currentUser.name;
        document.getElementById('idCardCourse').textContent = currentUser.course;
        document.getElementById('idCardValidity').textContent = new Date(currentUser.validTill).toLocaleDateString();
        document.getElementById('studentPhoto').src = currentUser.photo;

        // Generate barcode (you can use a barcode library like JsBarcode)
        const barcode = document.querySelector('.barcode');
        barcode.textContent = currentUser.id;

        // Show modal
        modal.style.display = 'block';

        // Close modal when clicking the close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Initialize current user's photo
    document.addEventListener('DOMContentLoaded', function() {
        // Set current user's photo
        document.getElementById('currentPhoto').src = currentUser.photo;
    });

    // Teacher Registration and Dashboard Functionality
    let currentTeacher = null;

    // Show teacher registration modal
    function showTeacherRegistration() {
        const modal = document.getElementById('teacherRegistrationModal');
        modal.style.display = 'block';
    }

    // Handle teacher registration
    document.getElementById('teacherRegistrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate passwords match
        const password = document.getElementById('teacherPassword').value;
        const confirmPassword = document.getElementById('teacherConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Create teacher object
        const teacher = {
            id: 'T' + Date.now(),
            name: document.getElementById('teacherName').value,
            email: document.getElementById('teacherEmail').value,
            phone: document.getElementById('teacherPhone').value,
            qualification: document.getElementById('teacherQualification').value,
            subjects: document.getElementById('teacherSubjects').value.split(',').map(s => s.trim()),
            experience: document.getElementById('teacherExperience').value,
            password: password,
            photo: 'default-avatar.png'
        };

        // In a real application, you would send this data to your server
        // For now, we'll just simulate a successful registration
        currentTeacher = teacher;
        
        // Hide registration modal and show dashboard
        document.getElementById('teacherRegistrationModal').style.display = 'none';
        showTeacherDashboard();
    });

    // Show teacher dashboard
    function showTeacherDashboard() {
        if (!currentTeacher) return;

        // Hide other sections and show dashboard
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('teacherDashboard').style.display = 'block';

        // Update dashboard header
        document.getElementById('teacherWelcome').textContent = `Welcome, ${currentTeacher.name}`;
        document.getElementById('teacherAvatar').src = currentTeacher.photo;

        // Update dashboard stats (in a real app, these would come from your backend)
        document.getElementById('totalClasses').textContent = '5';
        document.getElementById('hoursWorked').textContent = '25';
        document.getElementById('attendanceRate').textContent = '95%';
        document.getElementById('subjectCount').textContent = currentTeacher.subjects.length;

        // Load initial tab
        showDashboardTab('schedule');
    }

    // Handle dashboard tab switching
    function showDashboardTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        // Hide all tab content
        document.querySelectorAll('.dashboard-tab-content').forEach(content => {
            content.style.display = 'none';
        });

        // Show selected tab
        document.getElementById(tabName + 'Tab').style.display = 'block';

        // Load tab-specific content
        switch(tabName) {
            case 'schedule':
                loadSchedule();
                break;
            case 'attendance':
                loadAttendance();
                break;
            case 'students':
                loadStudents();
                break;
            case 'profile':
                loadProfile();
                break;
        }
    }

    // Load schedule data
    function loadSchedule() {
        const scheduleList = document.getElementById('todaySchedule');
        // In a real app, this would fetch from your backend
        const schedule = [
            { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', class: 'Class 10-A' },
            { time: '11:00 AM - 12:30 PM', subject: 'Physics', class: 'Class 11-B' },
            { time: '2:00 PM - 3:30 PM', subject: 'Chemistry', class: 'Class 12-A' }
        ];

        scheduleList.innerHTML = schedule.map(item => `
            <div class="schedule-item">
                <div>
                    <h4>${item.subject}</h4>
                    <p>${item.class}</p>
                </div>
                <div class="schedule-time">${item.time}</div>
            </div>
        `).join('');
    }

    // Load attendance data
    function loadAttendance() {
        // In a real app, this would fetch attendance data from your backend
        const attendanceCalendar = document.getElementById('attendanceCalendar');
        attendanceCalendar.innerHTML = '<p>Attendance calendar will be implemented here</p>';
    }

    // Load students data
    function loadStudents() {
        // In a real app, this would fetch student data from your backend
        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = '<p>Student list will be implemented here</p>';
    }

    // Load profile data
    function loadProfile() {
        if (!currentTeacher) return;

        document.getElementById('profileName').value = currentTeacher.name;
        document.getElementById('profileEmail').value = currentTeacher.email;
        document.getElementById('profilePhone').value = currentTeacher.phone;
        document.getElementById('profileQualification').value = currentTeacher.qualification;
        document.getElementById('profileSubjects').value = currentTeacher.subjects.join(', ');
        document.getElementById('profilePhoto').src = currentTeacher.photo;
    }

    // Handle profile photo upload
    document.getElementById('profilePhotoInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePhoto').src = e.target.result;
            document.getElementById('teacherAvatar').src = e.target.result;
            currentTeacher.photo = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Handle profile update
    document.getElementById('profileUpdateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update teacher data
        currentTeacher.name = document.getElementById('profileName').value;
        currentTeacher.email = document.getElementById('profileEmail').value;
        currentTeacher.phone = document.getElementById('profilePhone').value;
        currentTeacher.qualification = document.getElementById('profileQualification').value;
        currentTeacher.subjects = document.getElementById('profileSubjects').value.split(',').map(s => s.trim());

        // Update dashboard header
        document.getElementById('teacherWelcome').textContent = `Welcome, ${currentTeacher.name}`;
        
        // Update stats
        document.getElementById('subjectCount').textContent = currentTeacher.subjects.length;

        alert('Profile updated successfully!');
    });

    // Handle teacher logout
    function logoutTeacher() {
        currentTeacher = null;
        document.getElementById('teacherDashboard').style.display = 'none';
        document.querySelector('.content-section').style.display = 'block';
    }
