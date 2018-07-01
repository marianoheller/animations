import Tides from './components/Animations/Tides';
import Vickatint from './components/Animations/Vickatint';
import Patterns from './components/Animations/Patterns';
import Interpolate from './components/Animations/Interpolate';
import Trail from './components/Animations/Trail';

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
    color: '#8e03ff',
    component: Vickatint,
  },
  {
    path: '/interpolate',
    title: 'Interpolate',
    color: '#ffff76',
    component: Interpolate,
  },
  {
    path: '/trail',
    title: 'Trail',
    color: '#ffff76',
    component: Trail,
  },
  {
    path: '/patterns',
    title: 'Patterns',
    color: '#933EC5', // ff9861
    component: Patterns,
  },
];


export default routes;
