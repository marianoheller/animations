import Tides from './components/Animations/Tides';
import Vickatint from './components/Animations/Vickatint';
import Patterns from './components/Animations/Patterns';
import Interpolate from './components/Animations/Interpolate';

const routes = [
  {
    path: '/tides',
    title: 'Tides',
    color: '#ff6924',
    component: Tides,
  },
  {
    path: '/vickatint',
    title: 'Vickatint',
    color: '#059c50',
    component: Vickatint,
  },
  {
    path: '/interpolate',
    title: 'Interpolate',
    color: '#ffff76',
    component: Interpolate,
  },
  {
    path: '/patterns',
    title: 'Patterns',
    color: '#933EC5',
    component: Patterns,
  },
];


export default routes;
