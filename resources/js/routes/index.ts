export default {
  routes: [
    {
      path: '/',
      name: 'Members',
      component: () => import("@/js/components/Pages/Members.vue")
    },
    {
      path: '/members/:id',
      name: 'Profile',
      component: () => import("@/js/components/Pages/Members/MemberProfile.vue")
    },
    {
      path: '/matches',
      name: 'Matches',
      component: () => import("@/js/components/Pages/Matches.vue")
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import("@/js/components/Pages/Leaderboard.vue"),
    },
  ]
}
