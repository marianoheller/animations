import Tides from './components/Animations/Tides';
import Vickatint from './components/Animations/Vickatint';
import Heart from './components/Animations/Heart';
import Interpolate from './components/Animations/Interpolate';
import Clock from './components/Animations/Clock';
import Bounce from './components/Animations/Bounce';
import Panel from './components/Animations/Panel';
/* import Sea from './components/Animations/Sea'; */

const routes = [
  {
    path: '/clock',
    title: 'Clock',
    color: '#f3ff44',
    component: Clock,
  },
  {
    path: '/tides',
    title: 'Tides',
    color: '#ff007b',
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
    color: '#ff7700',
    component: Interpolate,
  },
  {
    path: '/bounce',
    title: 'Bounce',
    color: '#6017ff',
    component: Bounce,
  },
  {
    path: '/heart',
    title: 'Heart',
    color: '#1757e2',
    component: Heart,
  },
  {
    path: '/panel',
    title: 'Panel',
    color: '#ff6924',
    component: Panel,
  },
];


export default routes;
