import * as Sentry from '@sentry/react'
// TODO: rearrange proper util fns and export.

const initSentry = () => {
  const sentryDsnUrl = import.meta.env.VITE_SENTRY_DSN_URL
  // console.log('Sentry Url: ', sentryDsnUrl);
  if (!sentryDsnUrl) { return console.log('Sentry DSN Url Not found. ') }
  Sentry.init({
    dsn: sentryDsnUrl,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    // Enable logs to be sent to Sentry
    enableLogs: true,
  })
  console.log('Sentry Initialized!')
}

const captureException = (
  error: unknown,
  context?: Record<string, unknown>,
) => {
  try {
    Sentry.captureException(error, { extra: context })
  } catch (_) {
    // swallow errors from the logger to avoid cascading failures
    console.log('Exception: ', _)
  }
}

export { captureException, initSentry }

export default Sentry.logger
