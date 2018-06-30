import Tides from './components/Animations/Tides';
import Vickatint from './components/Animations/Vickatint';
import Patterns from './components/Animations/Patterns';

const routes = [
  {
    path: '/tides',
    title: 'Tides',
    component: Tides,
  },
  {
    path: '/vickatint',
    title: 'Vickatint',
    component: Vickatint,
  },
  {
    path: '/patterns',
    title: 'Patterns',
    component: Patterns,
  },
];


export default routes;
