import { initSentry } from './logger.service.ts';
import { initializeAnalytics } from './analytics.service.ts';

const initializeServices = () => {
  initSentry();
  initializeAnalytics();
};

export default initializeServices;
