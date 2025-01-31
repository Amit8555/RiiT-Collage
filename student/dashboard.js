document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    const currentDate = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('en-US', options);

    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').slice(1);
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                // Show target section
                sections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            }
        });
    });

    // Mobile sidebar toggle
    const sidebar = document.querySelector('.dashboard-sidebar');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(menuBtn);

    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Notification handling
    const notificationBtn = document.querySelector('.notification-btn');
    const messageBtn = document.querySelector('.message-btn');

    function createPopup(title, items) {
        const popup = document.createElement('div');
        popup.className = 'notification-popup';
        
        const popupHeader = document.createElement('div');
        popupHeader.className = 'popup-header';
        popupHeader.innerHTML = `
            <h3>${title}</h3>
            <button class="close-popup"><i class="fas fa-times"></i></button>
        `;
        
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.innerHTML = items.map(item => `
            <div class="popup-item">
                <div class="popup-item-icon ${item.type}">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="popup-item-content">
                    <p class="popup-item-text">${item.text}</p>
                    <span class="popup-item-time">${item.time}</span>
                </div>
            </div>
        `).join('');

        popup.appendChild(popupHeader);
        popup.appendChild(popupContent);
        
        // Close popup when clicking the close button
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && !notificationBtn.contains(e.target) && !messageBtn.contains(e.target)) {
                popup.remove();
            }
        });

        return popup;
    }

    const notifications = [
        { type: 'warning', icon: 'fa-exclamation-circle', text: 'Mid-semester exam schedule released', time: '2 hours ago' },
        { type: 'info', icon: 'fa-info-circle', text: 'New assignment posted in Web Development', time: '3 hours ago' },
        { type: 'success', icon: 'fa-check-circle', text: 'Your assignment has been graded', time: '5 hours ago' }
    ];

    const messages = [
        { type: 'message', icon: 'fa-user', text: 'Mr. Sharma: Please submit your assignment by tomorrow', time: '1 hour ago' },
        { type: 'message', icon: 'fa-user', text: 'Mrs. Gupta: Class rescheduled to 2 PM', time: '3 hours ago' },
        { type: 'message', icon: 'fa-user', text: 'Admin: Fee payment reminder', time: '1 day ago' }
    ];

    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const existingPopup = document.querySelector('.notification-popup');
        if (existingPopup) {
            existingPopup.remove();
        } else {
            const popup = createPopup('Notifications', notifications);
            document.body.appendChild(popup);
            popup.style.position = 'absolute';
            const rect = notificationBtn.getBoundingClientRect();
            popup.style.top = `${rect.bottom + 10}px`;
            popup.style.right = '20px';
        }
    });

    messageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const existingPopup = document.querySelector('.notification-popup');
        if (existingPopup) {
            existingPopup.remove();
        } else {
            const popup = createPopup('Messages', messages);
            document.body.appendChild(popup);
            popup.style.position = 'absolute';
            const rect = messageBtn.getBoundingClientRect();
            popup.style.top = `${rect.bottom + 10}px`;
            popup.style.right = '20px';
        }
    });

    // Add some dynamic behavior to stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Update current class status
    function updateClassStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        const classItems = document.querySelectorAll('.class-item');
        classItems.forEach(item => {
            const timeText = item.querySelector('.class-time').textContent;
            const [hours, minutes] = timeText.match(/(\d+):(\d+)/).slice(1);
            const classTime = parseInt(hours) * 60 + parseInt(minutes);

            const status = item.querySelector('.class-status');
            if (Math.abs(currentTime - classTime) <= 60) { // Within 1 hour
                status.className = 'class-status ongoing';
                status.textContent = 'Ongoing';
            } else if (classTime > currentTime) {
                status.className = 'class-status upcoming';
                status.textContent = 'Upcoming';
            } else {
                status.className = 'class-status completed';
                status.textContent = 'Completed';
            }
        });
    }

    // Update class status every minute
    updateClassStatus();
    setInterval(updateClassStatus, 60000);
});
