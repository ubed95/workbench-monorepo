import { initializeAnalytics } from './analytics.service.ts'
import { initSentry } from './logger.service.ts'

const initializeServices = () => {
  initSentry()
  initializeAnalytics()
}

export default initializeServices
