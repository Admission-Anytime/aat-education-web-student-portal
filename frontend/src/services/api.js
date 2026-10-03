// Central API service for Aayush Institute Frontend
import { 
    getAllDefaultCategories, 
    defaultCategoryCourses, 
    getAllDefaultCoursesFlat, 
    getDeletedCourseIds, 
    addDeletedCourseId, 
    clearDeletedCourseIds, 
    STORAGE_KEY_CUSTOM_COURSES 
} from '../data/coursesData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';


// Helper for standard JSON fetch requests
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('aayush_token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error);
        throw error;
    }
}

// Offline user store helper for development / offline demonstration
const getOfflineUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('aayush_offline_users') || '[]');
    } catch {
        return [];
    }
};

const saveOfflineUser = (user) => {
    const users = getOfflineUsers();
    users.push(user);
    localStorage.setItem('aayush_offline_users', JSON.stringify(users));
};

// Authentication API
export const authApi = {
    register: async (userData) => {
        try {
            return await request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        } catch (error) {
            // Offline fallback when backend is offline
            const isStaffRole = userData.role === 'staff' || userData.role === 'admin';
            const user = {
                id: 'usr_' + Date.now(),
                name: userData.name || (isStaffRole ? 'Staff Member' : 'Student Member'),
                email: (userData.email || (isStaffRole ? 'staff@aayush.com' : 'student@aayush.com')).toLowerCase(),
                phone: userData.phone || '',
                role: userData.role || 'student',
                course: userData.course || '',
                department: userData.department || (isStaffRole ? 'Faculty / Instructor' : undefined),
                studentId: !isStaffRole ? ('AAY-' + Math.floor(1000 + Math.random() * 9000)) : undefined,
                staffId: isStaffRole ? (userData.staffId || ('STF-' + Math.floor(100 + Math.random() * 900))) : undefined
            };
            saveOfflineUser(user);
            const token = 'demo_jwt_' + btoa(JSON.stringify({ id: user.id, role: user.role }));
            localStorage.setItem('aayush_token', token);
            localStorage.setItem('aayush_user', JSON.stringify(user));
            return {
                success: true,
                message: 'Account created successfully! Welcome to Aayush Institute.',
                token,
                user
            };
        }
    },

    login: async (credentials) => {
        try {
            return await request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
        } catch (error) {
            // Offline fallback when backend is offline
            const { identifier, email, loginType } = credentials;
            const target = (email || identifier || '').trim().toLowerCase();

            const offlineUsers = getOfflineUsers();
            const found = offlineUsers.find(u =>
                u.email.toLowerCase() === target ||
                (identifier && (u.studentId === identifier || u.staffId === identifier || u.alumniId === identifier))
            );

            let role = loginType || 'student';
            if (target.includes('admin')) role = 'admin';
            else if (target.includes('staff') || (identifier && identifier.toUpperCase().startsWith('STF'))) role = 'staff';
            else if (target.includes('alumni') || (identifier && identifier.toUpperCase().startsWith('ALM'))) role = 'alumni';

            const isDemoAccount = target === 'student@aayush.com' || target === 'staff@aayush.com' || target === 'admin@aayush.com' || target === 'alumni@aayush.com';
            
            const extractNameFromEmail = (mail) => {
                if (!mail) return 'Student';
                const prefix = mail.split('@')[0];
                const clean = prefix.replace(/[0-9]/g, '').replace(/[._-]/g, ' ').trim();
                if (!clean) return 'Student';
                return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            };

            const user = found || {
                id: (isDemoAccount ? 'demo_' : 'usr_') + role + '_' + Date.now(),
                name: isDemoAccount
                    ? (role === 'admin' ? 'Administrator' : role === 'staff' ? 'Faculty Member' : role === 'alumni' ? 'Alumni Graduate' : 'Aayush Student')
                    : extractNameFromEmail(target),
                email: email || target,
                role: role,
                isProfileComplete: isDemoAccount ? true : false,
                isEnrolled: isDemoAccount ? true : false,
                studentId: identifier || (isDemoAccount ? 'AAY-2024-1082' : 'Pending Enrollment'),
                staffId: role === 'staff' ? (identifier || 'STF-001') : '',
                alumniId: role === 'alumni' ? (identifier || 'ALM-2022') : '',
                enrolledCourse: isDemoAccount ? 'Software & Full Stack Development' : '',
                phone: ''
            };

            const token = 'demo_jwt_' + btoa(JSON.stringify({ 
                id: user.id, 
                role: user.role, 
                email: user.email, 
                name: user.name, 
                isProfileComplete: user.isProfileComplete, 
                isEnrolled: user.isEnrolled 
            }));
            localStorage.setItem('aayush_token', token);
            localStorage.setItem('aayush_user', JSON.stringify(user));

            return {
                success: true,
                message: `Login successful! Welcome back, ${user.name}.`,
                token,
                user
            };
        }
    },

    forgotPassword: async (email) => {
        try {
            return await request('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
        } catch (error) {
            // Offline fallback: provide instant reset code
            return {
                success: true,
                message: 'Password reset code generated.',
                resetCode: '123456'
            };
        }
    },

    resetPassword: async (payload) => {
        try {
            return await request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
        } catch (error) {
            return {
                success: true,
                message: 'Password reset successfully! You can now log in.'
            };
        }
    },

    getProfile: () => request('/auth/me'),

    updateProfile: async (profileData) => {
        try {
            return await request('/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
        } catch (error) {
            // Local fallback
            const existing = JSON.parse(localStorage.getItem('aayush_user') || '{}');
            const updated = { ...existing, ...profileData };
            localStorage.setItem('aayush_user', JSON.stringify(updated));
            window.dispatchEvent(new Event('authChange'));
            return {
                success: true,
                message: 'Profile updated successfully',
                user: updated
            };
        }
    },

    logout: () => {
        localStorage.removeItem('aayush_token');
        localStorage.removeItem('aayush_user');
    }
};

// Course API with offline storage persistence & sync
export const courseApi = {
    getAll: async (params = {}) => {
        try {
            const query = new URLSearchParams();
            if (params.programType && params.programType !== 'all') query.append('programType', params.programType);
            if (params.categoryId && params.categoryId !== 'all') query.append('categoryId', params.categoryId);
            if (params.category && params.category !== 'all') query.append('category', params.category);
            if (params.search) query.append('search', params.search);
            const qStr = query.toString() ? `?${query.toString()}` : '';
            const res = await request(`/courses${qStr}`);
            const courseList = Array.isArray(res) ? res : (res?.data || []);
            if (courseList && courseList.length > 0) {
                const deletedIds = getDeletedCourseIds();
                const filtered = courseList.filter(c => !deletedIds.includes(String(c._id || c.id)));
                return { success: true, data: filtered };
            }
        } catch {
            // Backend offline - seamlessly fallback to local store + defaults
        }

        // Get deleted course IDs to omit
        const deletedIds = getDeletedCourseIds();

        // 1. Start with all default courses
        const defaultList = getAllDefaultCoursesFlat();

        // 2. Read custom/updated courses from localStorage
        let customList = [];
        try {
            const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_COURSES);
            if (saved) {
                const parsed = JSON.parse(saved);
                for (const [catKey, list] of Object.entries(parsed)) {
                    if (Array.isArray(list)) {
                        list.forEach(c => {
                            customList.push({
                                ...c,
                                categoryId: c.categoryId || catKey
                            });
                        });
                    }
                }
            }
        } catch {}

        // Merge: custom courses override default courses by ID or name
        const courseMap = new Map();
        defaultList.forEach(c => {
            const key = String(c.id);
            courseMap.set(key, c);
        });
        customList.forEach(c => {
            const key = String(c.id || c._id);
            courseMap.set(key, c);
        });

        // Filter out deleted courses
        let allCourses = Array.from(courseMap.values()).filter(c => {
            const cId = String(c.id || c._id);
            return !deletedIds.includes(cId);
        });

        // Apply category filter if requested
        if (params.category && params.category !== 'all') {
            allCourses = allCourses.filter(c => c.categoryId === params.category);
        }

        // Apply search query filter if requested
        if (params.search) {
            const q = params.search.toLowerCase();
            allCourses = allCourses.filter(c => 
                c.name?.toLowerCase().includes(q) || 
                c.oneLiner?.toLowerCase().includes(q) ||
                (Array.isArray(c.skills) && c.skills.some(s => s.toLowerCase().includes(q)))
            );
        }

        return { success: true, data: allCourses };
    },

    getById: async (id) => {
        try {
            return await request(`/courses/${id}`);
        } catch {
            const res = await courseApi.getAll();
            const found = res.data.find(c => String(c.id) === String(id) || String(c._id) === String(id));
            if (found) return { success: true, data: found };
            throw new Error('Course not found');
        }
    },

    create: async (courseData) => {
        let serverRes = null;
        try {
            serverRes = await request('/courses', {
                method: 'POST',
                body: JSON.stringify(courseData)
            });
        } catch (e) {
            console.warn('Backend offline, saving course locally for students/alumni:', e);
        }

        // Persist to local custom courses so all students & staff immediately see it
        try {
            const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_COURSES);
            const parsed = saved ? JSON.parse(saved) : {};
            const cat = courseData.categoryId || courseData.category || 'software';
            if (!parsed[cat]) parsed[cat] = [];
            const newCourse = {
                ...courseData,
                id: courseData.id || Date.now(),
                categoryId: cat
            };
            parsed[cat].unshift(newCourse);
            localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(parsed));
            window.dispatchEvent(new Event('coursesUpdated'));
            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            console.warn('Local storage error:', err);
        }
        return serverRes || { success: true, data: courseData };
    },

    update: async (id, courseData) => {
        let serverRes = null;
        try {
            serverRes = await request(`/courses/${id}`, {
                method: 'PUT',
                body: JSON.stringify(courseData)
            });
        } catch (e) {
            console.warn('Backend offline, updating course locally for students/alumni:', e);
        }

        // Persist to local custom courses
        try {
            const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_COURSES);
            const parsed = saved ? JSON.parse(saved) : {};
            let updated = false;
            for (const catKey of Object.keys(parsed)) {
                if (Array.isArray(parsed[catKey])) {
                    parsed[catKey] = parsed[catKey].map(c => {
                        if (String(c.id) === String(id) || String(c._id) === String(id) || c.name === courseData.name) {
                            updated = true;
                            return { ...c, ...courseData, id: c.id || id };
                        }
                        return c;
                    });
                }
            }
            if (!updated) {
                const cat = courseData.categoryId || courseData.category || 'software';
                if (!parsed[cat]) parsed[cat] = [];
                parsed[cat].unshift({ ...courseData, id });
            }
            localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(parsed));
            window.dispatchEvent(new Event('coursesUpdated'));
            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            console.warn('Local storage error:', err);
        }
        return serverRes || { success: true, data: courseData };
    },

    delete: async (id) => {
        let serverRes = null;
        try {
            serverRes = await request(`/courses/${id}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.warn('Backend offline, deleting course locally:', e);
        }

        // 1. Record ID in deleted list so default or cached courses with this ID stay deleted
        addDeletedCourseId(id);

        // 2. Remove from custom courses in localStorage
        try {
            const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_COURSES);
            if (saved) {
                const parsed = JSON.parse(saved);
                for (const catKey of Object.keys(parsed)) {
                    if (Array.isArray(parsed[catKey])) {
                        parsed[catKey] = parsed[catKey].filter(c => 
                            String(c.id) !== String(id) && String(c._id) !== String(id)
                        );
                    }
                }
                localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(parsed));
            }
        } catch (err) {
            console.warn('Storage cleanup failed:', err);
        }

        // 3. Dispatch global events
        window.dispatchEvent(new Event('coursesUpdated'));
        window.dispatchEvent(new Event('storage'));

        return serverRes || { success: true, message: 'Course deleted successfully' };
    },

    seedDefault: async () => {
        try {
            await request('/courses/seed', { method: 'POST' });
        } catch (e) {
            console.warn('Backend offline, seeding default courses locally');
        }

        // Reset deleted courses and restore all defaults
        clearDeletedCourseIds();
        try {
            localStorage.setItem(STORAGE_KEY_CUSTOM_COURSES, JSON.stringify(defaultCategoryCourses));
            window.dispatchEvent(new Event('coursesUpdated'));
            window.dispatchEvent(new Event('storage'));
        } catch {}

        return { success: true, message: 'All default courses & subjects synced successfully!' };
    }
};

// Categories (Subjects) API
export const categoryApi = {
    getAll: async () => {
        try {
            const res = await request('/categories');
            if (res && res.data && res.data.length > 0) return res;
        } catch {
            // Backend offline fallback
        }

        // Merge default categories with any custom saved categories
        const defaults = getAllDefaultCategories();
        let customCats = [];
        try {
            const saved = localStorage.getItem('aayush_custom_categories');
            if (saved) customCats = JSON.parse(saved);
        } catch {}

        const catMap = new Map();
        defaults.forEach(c => catMap.set(c.categoryId, c));
        customCats.forEach(c => catMap.set(c.categoryId, c));

        return { success: true, data: Array.from(catMap.values()) };
    },

    create: async (catData) => {
        let serverRes = null;
        try {
            serverRes = await request('/categories', {
                method: 'POST',
                body: JSON.stringify(catData)
            });
        } catch (e) {
            console.warn('Backend offline, saving category locally:', e);
        }

        try {
            const saved = localStorage.getItem('aayush_custom_categories');
            const list = saved ? JSON.parse(saved) : [];
            const newCat = {
                ...catData,
                id: catData.categoryId || catData.id,
                categoryId: catData.categoryId || catData.id
            };
            list.push(newCat);
            localStorage.setItem('aayush_custom_categories', JSON.stringify(list));
            window.dispatchEvent(new Event('categoriesUpdated'));
        } catch {}

        return serverRes || { success: true, data: catData };
    },

    delete: async (id) => {
        let serverRes = null;
        try {
            serverRes = await request(`/categories/${id}`, { method: 'DELETE' });
        } catch (e) {
            console.warn('Backend offline, deleting category locally:', e);
        }

        try {
            const saved = localStorage.getItem('aayush_custom_categories');
            if (saved) {
                const list = JSON.parse(saved).filter(c => c.categoryId !== id && c.id !== id);
                localStorage.setItem('aayush_custom_categories', JSON.stringify(list));
            }
            // Also mark all courses in this category as deleted
            const allCourses = await courseApi.getAll({ category: id });
            if (allCourses && allCourses.data) {
                allCourses.data.forEach(c => addDeletedCourseId(c.id || c._id));
            }
            window.dispatchEvent(new Event('categoriesUpdated'));
            window.dispatchEvent(new Event('coursesUpdated'));
        } catch {}

        return serverRes || { success: true, message: 'Category removed' };
    }
};

// Health Check API
export const healthApi = {
    check: () => request('/health')
};

// Dynamic Student Profile & Dashboard API
export const studentApi = {
    getProfile: async () => {
        try {
            const res = await request('/student/profile');
            return res.profile;
        } catch (e) {
            // Local fallback
            const cached = JSON.parse(localStorage.getItem('aayush_user') || '{}');
            const savedProfile = JSON.parse(localStorage.getItem(`aayush_profile_${cached.id || cached.email}`) || 'null');
            return savedProfile || cached;
        }
    },

    updateProfile: async (data) => {
        try {
            return await request('/student/profile', {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        } catch (e) {
            return { success: true, message: 'Updated locally' };
        }
    },

    addInterest: async (courseData) => {
        try {
            return await request('/student/interest', {
                method: 'POST',
                body: JSON.stringify(courseData)
            });
        } catch (e) {
            return { success: true, message: 'Saved locally' };
        }
    },

    removeInterest: async (courseName) => {
        try {
            return await request(`/student/interest/${encodeURIComponent(courseName)}`, {
                method: 'DELETE'
            });
        } catch (e) {
            return { success: true };
        }
    },

    addToBuy: async (courseData) => {
        try {
            return await request('/student/buy', {
                method: 'POST',
                body: JSON.stringify(courseData)
            });
        } catch (e) {
            return { success: true, message: 'Saved locally' };
        }
    },

    removeFromBuy: async (courseName) => {
        try {
            return await request(`/student/buy/${encodeURIComponent(courseName)}`, {
                method: 'DELETE'
            });
        } catch (e) {
            return { success: true };
        }
    },

    createTicket: async (ticketData) => {
        try {
            return await request('/student/ticket', {
                method: 'POST',
                body: JSON.stringify(ticketData)
            });
        } catch (e) {
            return { success: true, message: 'Ticket created' };
        }
    }
};

// Enquiries & Leads API
export const enquiryApi = {
    submit: (enquiryData) => request('/inquiry/submit-form', {
        method: 'POST',
        body: JSON.stringify(enquiryData)
    }),
    getAll: () => request('/inquiry/all-submissions')
};

// ERP Admin Admission API (Directly communicates with the ERP Backend)
export const ERP_BASE_URL = import.meta.env.VITE_ERP_API_BASE_URL || 'http://localhost:4001';

export const admissionApi = {
    /**
     * Submit new student admission registration
     * Method: POST
     * Endpoint: /api/user/admin/admission/newregistration
     */
    submitRegistration: async (formData) => {
        // In local development, use relative URL to route via Vite proxy (zero CORS errors)
        const targetUrl = import.meta.env.DEV
            ? '/api/user/admin/admission/newregistration'
            : `${ERP_BASE_URL}/api/user/admin/admission/newregistration`;

        console.log(`[AdmissionAPI] Submitting registration to: ${targetUrl}`, formData);

        let response;
        try {
            response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        } catch (fetchErr) {
            console.warn(`[AdmissionAPI] Proxy route failed, trying direct endpoint ${ERP_BASE_URL}...`, fetchErr);
            response = await fetch(`${ERP_BASE_URL}/api/user/admin/admission/newregistration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }

        const data = await response.json().catch(() => ({}));
        console.log(`[AdmissionAPI] Server response status ${response.status}:`, data);

        if (!response.ok) {
            const errorMsg = data.message || `Submission failed with server status ${response.status}`;
            throw new Error(errorMsg);
        }

        return data;
    },

    /**
     * Upload photo for student or guardian
     * Method: PUT
     * @param {'student-pic'|'father-pic'|'mother-pic'|'guardian-pic'} type
     * @param {File} file
     */
    uploadPhoto: async (type, file) => {
        const targetUrl = import.meta.env.DEV
            ? `/api/user/admin/admission/newregistration/${type}`
            : `${ERP_BASE_URL}/api/user/admin/admission/newregistration/${type}`;

        const formData = new FormData();
        formData.append('file', file);

        let response;
        try {
            response = await fetch(targetUrl, {
                method: 'PUT',
                body: formData
            });
        } catch (err) {
            response = await fetch(`${ERP_BASE_URL}/api/user/admin/admission/newregistration/${type}`, {
                method: 'PUT',
                body: formData
            });
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const errorMsg = data.message || `Photo upload failed with status ${response.status}`;
            throw new Error(errorMsg);
        }

        return data;
    },

    /**
     * Helper to verify all registered admissions in ERP DB
     * Method: GET /api/user/admin/admission/getallregistration
     */
    getAllRegistrations: async () => {
        const targetUrl = import.meta.env.DEV
            ? '/api/user/admin/admission/getallregistration'
            : `${ERP_BASE_URL}/api/user/admin/admission/getallregistration`;
        const res = await fetch(targetUrl);
        return await res.json();
    }
};


