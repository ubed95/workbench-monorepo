import { AnalyticsBrowser } from '@segment/analytics-next';

const analytics = new AnalyticsBrowser();
const initializeAnalytics = () => {
  const segmentAnalyticsKey = import.meta.env.VITE_SEGMENT_ANALYTICS_KEY;
  if (!segmentAnalyticsKey)
    return console.log('Segment Analytics Key Not found. ');
  analytics.load({ writeKey: segmentAnalyticsKey }).then(() => {
    console.log('Segment Analytics Initialized');
  });
};

export { initializeAnalytics };
export default analytics;
