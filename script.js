// Hostel Management System - Central State and Logic

// 1. Initialize local storage tables if not exist
function seedDatabase() {
    // Rooms Database
    if (!localStorage.getItem('hms_rooms')) {
        const rooms = [];
        // Block A: Rooms 101-105 (Single Sharing), Rooms 106-110 (Double Sharing)
        for (let i = 101; i <= 105; i++) {
            rooms.push({ id: `A-${i}`, roomNumber: `${i}`, block: 'Block A', type: 'Single Sharing', capacity: 1, occupiedCount: 0, occupants: [], price: 500 });
        }
        for (let i = 106; i <= 110; i++) {
            rooms.push({ id: `A-${i}`, roomNumber: `${i}`, block: 'Block A', type: 'Double Sharing', capacity: 2, occupiedCount: 0, occupants: [], price: 350 });
        }
        // Block B: Rooms 201-205 (Single Sharing), Rooms 206-210 (Double Sharing)
        for (let i = 201; i <= 205; i++) {
            rooms.push({ id: `B-${i}`, roomNumber: `${i}`, block: 'Block B', type: 'Single Sharing', capacity: 1, occupiedCount: 0, occupants: [], price: 500 });
        }
        for (let i = 206; i <= 210; i++) {
            rooms.push({ id: `B-${i}`, roomNumber: `${i}`, block: 'Block B', type: 'Double Sharing', capacity: 2, occupiedCount: 0, occupants: [], price: 350 });
        }
        // Block C: Rooms 301-310 (Four Sharing)
        for (let i = 301; i <= 310; i++) {
            rooms.push({ id: `C-${i}`, roomNumber: `${i}`, block: 'Block C', type: 'Four Sharing', capacity: 4, occupiedCount: 0, occupants: [], price: 200 });
        }
        localStorage.setItem('hms_rooms', JSON.stringify(rooms));
    }

    // Users Database
    if (!localStorage.getItem('hms_users')) {
        const users = [
            {
                username: 'admin',
                password: 'AdminPassword@123',
                fullName: 'System Administrator',
                email: 'admin@example.com',
                phone: '9876543210',
                address: 'VNRVJIET Campus, Hyderabad',
                gender: 'Male',
                dob: '1990-01-01',
                role: 'admin',
                emgName: 'Main Office',
                emgPhone: '9876541230'
            },
            {
                username: 'student',
                password: 'StudentPassword@123',
                fullName: 'John Doe',
                email: 'student@example.com',
                phone: '9392868951',
                address: '123 Academic Row, Hyderabad',
                gender: 'Male',
                dob: '2004-11-18',
                role: 'student',
                emgName: 'Robert Doe',
                emgPhone: '9876542222'
            }
        ];
        localStorage.setItem('hms_users', JSON.stringify(users));
    }

    // Checkins History Database
    if (!localStorage.getItem('hms_checkins')) {
        const checkins = [
            {
                id: 'TXN-88123',
                username: 'student',
                fullName: 'John Doe',
                email: 'student@example.com',
                idType: 'Aadhar',
                idNumber: '1234-5678-9012',
                phone: '9392868951',
                nationality: 'Indian',
                checkInDate: '2026-05-01',
                checkOutDate: '2026-06-01',
                roomType: 'Single Sharing',
                roomNumber: '101',
                block: 'Block A',
                comments: 'Graduation semester stay.',
                status: 'Checked Out',
                feedback: 'Great facilities and clean room.',
                keysReturned: true
            }
        ];
        localStorage.setItem('hms_checkins', JSON.stringify(checkins));
    }

    // Seed Announcements
    if (!localStorage.getItem('hms_announcements')) {
        const notices = [
            { id: 1, date: '2026-06-10', title: 'Warden Notice: Curfew Hours', text: 'Please note that the main hostel gate closes strictly at 9:30 PM. Late entries will require prior warden permission.' },
            { id: 2, date: '2026-06-08', title: 'Wi-Fi Maintenance Schedule', text: 'Hostel Wi-Fi routers will undergo updates on Saturday from 2:00 PM to 4:00 PM. Expect brief internet disconnections.' },
            { id: 3, date: '2026-06-05', title: 'Mess Bill Clearance', text: 'All students are advised to clear outstanding mess and laundry dues before the 15th of this month to avoid fines.' }
        ];
        localStorage.setItem('hms_announcements', JSON.stringify(notices));
    }

    // Seed Mess Menus
    if (!localStorage.getItem('hms_mess_menus')) {
        const menus = {
            'Monday': { breakfast: 'Idli with Sambar', lunch: 'Veg Biryani & Raitha', dinner: 'Chapathi & Mixed Veg Curry' },
            'Tuesday': { breakfast: 'Puri Sagu', lunch: 'White Rice, Pappu, Rasam', dinner: 'Roti, Paneer Butter Masala' },
            'Wednesday': { breakfast: 'Dosa & Coconut Chutney', lunch: 'Egg Curry & Rice', dinner: 'Chapathi, Dal Fry & Curd' },
            'Thursday': { breakfast: 'Upma with Pickle', lunch: 'Tomato Pappu & Rice', dinner: 'Roti & Aloo Gobi Dry' },
            'Friday': { breakfast: 'Pesarattu & Ginger Chutney', lunch: 'Fried Rice & Manchuria', dinner: 'Roti, Kaju Curry & Curd' },
            'Saturday': { breakfast: 'Idli & Wada', lunch: 'Sambar Rice & Papad', dinner: 'Chapathi & Egg Bhurji' },
            'Sunday': { breakfast: 'Puri Curry', lunch: 'Special Chicken/Paneer Biryani', dinner: 'Light Khichdi & Curd' }
        };
        localStorage.setItem('hms_mess_menus', JSON.stringify(menus));
    }
}

// 2. Password Strength Utility
function checkPasswordStrength(password) {
    let score = 0;
    const feedback = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    if (feedback.length) score++;
    if (feedback.uppercase && feedback.lowercase) score++;
    if (feedback.number) score++;
    if (feedback.special) score++;

    return {
        score, // 0 to 4
        isValid: feedback.length && feedback.uppercase && feedback.lowercase && feedback.number && feedback.special,
        criteria: feedback
    };
}

// 3. Authentication Utilities
function getLoggedInUser() {
    const userStr = localStorage.getItem('hms_current_user');
    return userStr ? JSON.parse(userStr) : null;
}

function isLoggedIn() {
    return getLoggedInUser() !== null;
}

function handleLoginSubmit(username, password) {
    const users = JSON.parse(localStorage.getItem('hms_users') || '[]');
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    
    if (user) {
        localStorage.setItem('hms_current_user', JSON.stringify(user));
        return { success: true, role: user.role };
    }
    return { success: false, message: 'Invalid username/email or password.' };
}

function handleRegisterSubmit(userData) {
    const users = JSON.parse(localStorage.getItem('hms_users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.username === userData.username)) {
        return { success: false, message: 'Username is already registered.' };
    }
    if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email ID is already registered.' };
    }

    // Double check password strength
    const strength = checkPasswordStrength(userData.password);
    if (!strength.isValid) {
        return { success: false, message: 'Password is too weak. Please meet all criteria.' };
    }
    
    users.push(userData);
    localStorage.setItem('hms_users', JSON.stringify(users));
    return { success: true };
}

function handleUserLogout() {
    localStorage.removeItem('hms_current_user');
    showToast('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Check auth state and redirect if unauthorized
function guardRoute(requiredRole = null) {
    const user = getLoggedInUser();
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!user) {
        if (currentPage !== 'login.html' && currentPage !== 'register.html' && currentPage !== 'index.html' && currentPage !== '') {
            window.location.href = 'login.html';
        }
    } else {
        if (currentPage === 'login.html' || currentPage === 'register.html') {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'confirmation.html';
            }
        }
        if (requiredRole && user.role !== requiredRole) {
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'confirmation.html';
            }
        }
    }
}

// 4. Room & Booking Operations
function getRooms() {
    return JSON.parse(localStorage.getItem('hms_rooms') || '[]');
}

function getAvailableRooms(roomType) {
    const rooms = getRooms();
    return rooms.filter(r => r.type === roomType && r.occupiedCount < r.capacity);
}

function checkInUser(bookingData) {
    const rooms = getRooms();
    const room = rooms.find(r => r.roomNumber === bookingData.roomNumber && r.block === bookingData.block);
    
    if (!room) {
        return { success: false, message: 'Selected room not found.' };
    }
    if (room.occupiedCount >= room.capacity) {
        return { success: false, message: 'Selected room is already fully occupied.' };
    }
    
    // Check if user is already checked in somewhere
    const checkins = JSON.parse(localStorage.getItem('hms_checkins') || '[]');
    const activeBooking = checkins.find(c => c.username === bookingData.username && c.status === 'Active');
    if (activeBooking) {
        return { success: false, message: 'You are already checked in. Please check out first.' };
    }

    // Update Room state
    room.occupiedCount += 1;
    room.occupants.push(bookingData.username);
    localStorage.setItem('hms_rooms', JSON.stringify(rooms));

    // Create Check-in ticket
    const txId = 'TXN-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
        id: txId,
        ...bookingData,
        status: 'Active'
    };

    checkins.push(newBooking);
    localStorage.setItem('hms_checkins', JSON.stringify(checkins));
    
    // Store current active booking details in local storage for quick access in confirmation page
    localStorage.setItem('hms_latest_booking', JSON.stringify(newBooking));

    return { success: true, booking: newBooking };
}

function checkOutUser(checkoutDetails) {
    const checkins = JSON.parse(localStorage.getItem('hms_checkins') || '[]');
    const bookingIndex = checkins.findIndex(c => c.username === checkoutDetails.username && c.status === 'Active');
    
    if (bookingIndex === -1) {
        return { success: false, message: 'No active check-in record found for this user.' };
    }

    const booking = checkins[bookingIndex];
    const rooms = getRooms();
    const room = rooms.find(r => r.roomNumber === booking.roomNumber && r.block === booking.block);

    if (room) {
        room.occupiedCount = Math.max(0, room.occupiedCount - 1);
        room.occupants = room.occupants.filter(uname => uname !== checkoutDetails.username);
        localStorage.setItem('hms_rooms', JSON.stringify(rooms));
    }

    // Update check-in record
    booking.status = 'Checked Out';
    booking.checkOutDate = checkoutDetails.checkOutDate;
    booking.feedback = checkoutDetails.feedback;
    booking.keysReturned = checkoutDetails.keysReturned;

    localStorage.setItem('hms_checkins', JSON.stringify(checkins));
    localStorage.setItem('hms_latest_checkout', JSON.stringify(booking));

    return { success: true, booking };
}

function getUserActiveCheckIn(username) {
    const checkins = JSON.parse(localStorage.getItem('hms_checkins') || '[]');
    return checkins.find(c => c.username === username && c.status === 'Active') || null;
}

function getUserCheckInHistory(username) {
    const checkins = JSON.parse(localStorage.getItem('hms_checkins') || '[]');
    return checkins.filter(c => c.username === username);
}

// 5. Toast Notifications
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
    }

    const toast = document.createElement('div');
    toast.className = `alert-popup ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
        <span class="alert-icon">${icon}</span>
        <span class="alert-msg">${message}</span>
    `;

    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

// 6. Layout and Header/Footer/Sidebar Builder
function injectLayout() {
    const user = getLoggedInUser();
    const currentPage = window.location.pathname.split('/').pop();
    
    // 6a. Inject SVGs for gradient logo
    if (!document.getElementById('svg-defs')) {
        const defs = document.createElement('div');
        defs.id = 'svg-defs';
        defs.style.height = '0';
        defs.style.width = '0';
        defs.style.position = 'absolute';
        defs.style.visibility = 'hidden';
        defs.innerHTML = `
            <svg>
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#6366f1" />
                        <stop offset="100%" stop-color="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
        `;
        document.body.appendChild(defs);
    }

    // 6b. Inject Glowing background blobs
    if (!document.querySelector('.glow-container')) {
        const glowWrapper = document.createElement('div');
        glowWrapper.className = 'glow-container';
        glowWrapper.innerHTML = `
            <div class="glow-blob blob-1"></div>
            <div class="glow-blob blob-2"></div>
            <div class="glow-blob blob-3"></div>
        `;
        document.body.insertBefore(glowWrapper, document.body.firstChild);
    }

    // 6c. Check if page has sidebar-friendly app layout
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        // Build Split-Screen Sidebar
        const sidebarHtml = `
            <div class="sidebar">
                <a href="index.html" class="sidebar-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>VNR Hostels</span>
                </a>
                
                <div class="sidebar-menu">
                    ${user && user.role === 'admin' ? `
                        <a href="admin.html" class="sidebar-item ${currentPage === 'admin.html' ? 'active' : ''}">
                            <span>📊</span> Warden Overview
                        </a>
                    ` : `
                        <a href="confirmation.html" class="sidebar-item ${currentPage === 'confirmation.html' ? 'active' : ''}">
                            <span>👤</span> My Dashboard
                        </a>
                        <a href="checkin.html" class="sidebar-item ${currentPage === 'checkin.html' ? 'active' : ''}">
                            <span>🔑</span> Room Check-In
                        </a>
                        <a href="checkout.html" class="sidebar-item ${currentPage === 'checkout.html' ? 'active' : ''}">
                            <span>🚪</span> Room Check-Out
                        </a>
                    `}
                </div>

                <div class="sidebar-footer" style="padding-top: 15px;">
                    ${user ? `
                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom: 12px; display: flex; flex-direction: column;">
                            <span style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase;">User Logged In</span>
                            <span style="font-weight:600; color:var(--text-main); margin-top:2px;">${user.fullName}</span>
                            <span style="font-size:0.75rem; color:var(--primary); font-weight:600;">Role: ${user.role}</span>
                        </div>
                        <button class="btn btn-danger btn-icon" onclick="handleUserLogout()" style="padding: 8px 12px; font-size: 0.85rem; width:100%;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Sign Out
                        </button>
                    ` : `
                        <a href="login.html" class="btn btn-primary" style="padding: 8px 12px; font-size: 0.85rem;">Sign In</a>
                    `}
                </div>
            </div>
        `;
        
        // Prepend sidebar into the app container
        appContainer.innerHTML = sidebarHtml + appContainer.innerHTML;
        
        // Remove standard header / footer if present in sidebar pages
        const head = document.querySelector('header');
        if (head) head.remove();
        const foot = document.querySelector('footer');
        if (foot) foot.remove();
    } else {
        // Build Standard Top Header (for non-dashboard landing/login/register/receipt pages)
        const headerEl = document.querySelector('header');
        if (headerEl) {
            let navHtml = `
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>VNR Hostels</span>
                    </a>
                    <div class="nav-menu">
            `;

            if (user) {
                if (user.role === 'admin') {
                    navHtml += `<a href="admin.html" class="nav-link">Admin Dashboard</a>`;
                } else {
                    navHtml += `<a href="confirmation.html" class="nav-link">My Dashboard</a>`;
                }
                navHtml += `
                    <div class="nav-user">
                        <span>👤 ${user.fullName.split(' ')[0]}</span>
                    </div>
                    <button class="btn-logout" onclick="handleUserLogout()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                    </button>
                `;
            } else {
                if (currentPage !== 'login.html' && currentPage !== 'register.html') {
                    navHtml += `<a href="login.html" class="btn btn-primary btn-icon" style="width:auto; padding: 8px 16px; font-size:0.9rem;">Sign In</a>`;
                } else if (currentPage === 'login.html') {
                    navHtml += `<a href="register.html" class="nav-link">Create Account</a>`;
                } else {
                    navHtml += `<a href="login.html" class="nav-link">Sign In</a>`;
                }
            }

            navHtml += `
                    </div>
                </div>
            `;
            headerEl.innerHTML = navHtml;
        }

        const footerEl = document.querySelector('footer');
        if (footerEl) {
            footerEl.innerHTML = `
                <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: left; padding-bottom: 25px;">
                    <div>
                        <h4 style="color: var(--primary); margin-bottom: 12px; font-size: 1rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">🏢 VNR Hostels</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 8px;">
                            <strong>VNR Vignana Jyothi Hostels</strong><br>
                            Bachupally, Nizampet (S.O),<br>
                            Hyderabad, Telangana - 500090
                        </p>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
                            Email: <a href="mailto:hostel@vnrvjiet.ac.in" style="color: var(--primary); text-decoration: none;">hostel@vnrvjiet.ac.in</a><br>
                            Phone: +91 40 2304 2758 / 59 / 60
                        </p>
                    </div>
                    <div>
                        <h4 style="color: var(--secondary); margin-bottom: 12px; font-size: 1rem; font-weight: 600;">⏰ Hostel Rules & Timings</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
                            <strong>Office Hours:</strong> 9:00 AM - 6:00 PM (Mon-Sat)<br>
                            <strong>Night Curfew:</strong> 9:30 PM (Main Gate Closes)<br>
                            <strong>Dinner Timings:</strong> 7:30 PM - 9:30 PM<br>
                            <strong>Mess Schedule:</strong> Rotates daily (Check Student Portal)
                        </p>
                    </div>
                    <div>
                        <h4 style="color: var(--success); margin-bottom: 12px; font-size: 1rem; font-weight: 600;">📞 Emergency Contacts</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 8px;">
                            <strong>Boys Hostel Warden:</strong><br>
                            Dr. K. Srinivas (+91 98765 43210)
                        </p>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
                            <strong>Girls Hostel Warden:</strong><br>
                            Mrs. M. Radhika (+91 98765 43211)
                        </p>
                    </div>
                </div>
                <div style="border-top: 1px solid var(--glass-border); padding-top: 20px; font-size: 0.8rem; color: var(--text-dim);">
                    &copy; ${new Date().getFullYear()} VNR VJIET Hostel Management System. Crafted with excellence. All rights reserved.
                </div>
            `;
        }
    }
}

// Initialize on load
seedDatabase();
document.addEventListener('DOMContentLoaded', () => {
    guardRoute();
    injectLayout();
});
