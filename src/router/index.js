import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Import your Vuex store instance
import VueJwtDecode from 'vue-jwt-decode';

const routes = [
    {
        path: '/',
        component: () => import('@/views/layout/LayoutView.vue'),
        children: [
            {
                path: '/',
                name: 'HomeView',
                component: () => import('@/views/HomeView.vue'),
            },
            {
                path: '/competition',
                name: 'CompetitionView',
                component: () => import('@/views/pages/CompetitionView.vue'),
            },
            {
                path: '/competition/:slug',
                name: 'Competition Detail',
                component: () => import('@/views/pages/CompetitionDetail.vue'),
            },
            {
                path: '/profile',
                name: 'Profile View',
                component: () => import('@/views/pages/ProfileView.vue'),
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/views/layout/LayoutNonNavbar.vue'),
        children: [
            {
                path: '/login',
                name: 'LoginView',
                component: () => import('@/views/pages/LoginView.vue'),
                meta: { requiresGuest: true },
            },
            {
                path: '/register',
                name: 'RegisterView',
                component: () => import('@/views/pages/RegisterView.vue'),
                beforeEnter: async (to, from, next) => {
                    const userId = localStorage.getItem('userId');

                    if (!userId) {
                        next();
                    } else {
                        try {
                            await store.dispatch('user/getUserDetail', {
                                search: userId,
                            });

                            const roleName =
                                store.getters['user/userDetail']?.role?.name;

                            if (roleName === 'Umum') {
                                next((vm) => {
                                    vm.currentStep = 2;                                    
                                    
                                });
                            } else if (
                                roleName === 'Siswa' ||
                                roleName === 'Mahasiswa' ||
                                roleName == 'Eo'
                            ) {
                                next('/profile');
                            } else {
                                next('');
                            }
                        } catch (error) {
                            next();
                        }
                    }
                },
            },
            {
                path: '/forgot',
                name: 'Forgot View',
                component: () => import('@/views/pages/ForgotView.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        component: () => import('@/views/layout/LayoutDashboard.vue'),
        beforeEnter: async (to, from, next) => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                next('/login');
            } else {
                try {
                    await store.dispatch('user/getUserDetail', {
                        search: userId,
                    });

                    const roleName =
                        store.getters['user/userDetail']?.role?.name;

<<<<<<< HEAD
                    if (
                        roleName === 'Eo' ||
                        roleName === 'Admin' ||
                        roleName === 'Perusahaan' ||
                        roleName === 'Sponsor'
                    ) {
                        next();
                    } else {
                        next(from.fullPath); // atau rute lain jika pengguna tidak memiliki akses
                    }
                } catch (error) {
                    next(from.fullPath); // atau rute lain jika ada kesalahan dalam mendapatkan detail pengguna
=======
                    if (roleName === 'Eo') {
                        next();
                    } else {
                        next('/'); // atau rute lain jika pengguna tidak memiliki akses
                    }
                } catch (error) {
                    next('/'); // atau rute lain jika ada kesalahan dalam mendapatkan detail pengguna
>>>>>>> main
                }
            }
        },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () =>
                    import('@/views/pages/dashboard/Dashboard.vue'),
            },
            {
                path: '/dashboard/competition',
                name: 'Competition Dashboard',
                component: () =>
                    import(
                        '@/views/pages/dashboard/competition/Competition.vue'
                    ),
            },
            {
                path: '/dashboard/user',
                name: 'User Dashboard',
                component: () => import('@/views/pages/dashboard/UserView.vue'),
<<<<<<< HEAD
                beforeEnter: async (to, from, next) => {
                    const userId = localStorage.getItem('userId');

                    if (!userId) {
                        next('/login');
                    } else {
                        try {
                            await store.dispatch('user/getUserDetail', {
                                search: userId,
                            });

                            const roleName =
                                store.getters['user/userDetail']?.role?.name;

                            if (roleName === 'Admin') {
                                next();
                            } else {
                                next(from.fullPath); // atau rute lain jika pengguna tidak memiliki akses
                            }
                        } catch (error) {
                            next(from.fullPath); // atau rute lain jika ada kesalahan dalam mendapatkan detail pengguna
                        }
                    }
                },
=======
>>>>>>> main
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/views/layout/LayoutBlank.vue'),
        children: [
            {
                path: '/:pathMatch(.*)*',
                name: '404',
                component: () => import('@/views/pages/Error/404.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Function to check if the JWT token is valid
const isTokenValid = async (token) => {
    try {
        // Check if token is expired
        const now = Math.floor(Date.now() / 1000);
        if (token.exp < now) {
            return false; // Token expired
        }

        // Attempt to retrieve user email using token id
        const exist = await store.dispatch('user/getUserEmail', {
            search: token.id,
        });
        return exist; // Return true if user email exists and token is valid
    } catch (err) {
        console.error('Error checking token validity:', err);
        return false; // Return false if any error occurs
    }
};

// Navigation guard to protect routes
// router.beforeEach((to, from, next) => {
//   const token = Cookies.get("token");
//   localStorage.removeItem("userId");
//   if (token) {
//     try {
//       const decodedToken = VueJwtDecode.decode(token);
//       if (isTokenValid(decodedToken)) {
//         localStorage.setItem("userId", decodedToken.id);
//         if (to.matched.some((record) => record.meta.requiresGuest)) {
//           next({ path: "/" }); // Redirect to home if token is valid and trying to access guest routes
//         } else {
//           // Extract user email from token and proceed
//           const userEmail = decodedToken.email;
//           next(); // Allow navigation to other routes
//         }
//       } else {
//         Cookies.remove("token"); // Remove expired token
//         localStorage.removeItem("userId");
//         next({ path: "/login" }); // Redirect to login if token is expired
//       }
//     } catch (err) {
//       console.error("Invalid token:", err.message);
//       Cookies.remove("token"); // Remove invalid token
//       localStorage.removeItem("userId");
//       next({ path: "/login" }); // Redirect to login if token is invalid
//     }
//   } else {
//     next(); // Allow navigation if no valid token
//   }
// });
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = VueJwtDecode.decode(token);
            const tokenIsValid = await isTokenValid(decodedToken);

            if (tokenIsValid) {
                localStorage.setItem('userId', decodedToken.id);
                if (to.matched.some((record) => record.meta.requiresGuest)) {
                    next({ path: '/' }); // Redirect to home if token is valid and trying to access guest routes
                } else {
                    next(); // Allow navigation to other routes
                }
            } else {
                localStorage.removeItem('token'); // Remove expired token
                localStorage.removeItem('userId');
                if (to.matched.some((record) => record.meta.requiresAuth)) {
                    next({ path: '/login' }); // Redirect to login if token is expired and accessing protected routes
                } else {
                    next(); // Allow navigation to public routes
                }
            }
        } catch (err) {
            console.error('Invalid token:', err.message);
            localStorage.removeItem('token'); // Remove invalid token
            localStorage.removeItem('userId');
            if (to.matched.some((record) => record.meta.requiresAuth)) {
                next({ path: '/login' }); // Redirect to login if token is invalid and accessing protected routes
            } else {
                next(); // Allow navigation to public routes
            }
        }
    } else {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            next({ path: '/login' }); // Redirect to login if no token and accessing protected routes
        } else {
            next(); // Allow navigation to public routes
        }
    }
});

export default router;
