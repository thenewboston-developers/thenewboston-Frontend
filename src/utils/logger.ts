import * as Sentry from '@sentry/react';

interface LogContext {
  [key: string]: any;
}

type LogMessage = string | Error;

class Logger {
  private addBreadcrumb(level: Sentry.SeverityLevel, message: string, context: LogContext): void {
    Sentry.addBreadcrumb({
      category: level,
      data: context,
      level,
      message,
    });
  }

  debug(message: LogMessage, context: LogContext = {}): void {
    console.debug(message, context);
    this.addBreadcrumb('debug', String(message), context);
  }

  info(message: LogMessage, context: LogContext = {}): void {
    console.info(message, context);
    this.addBreadcrumb('info', String(message), context);
  }

  warn(message: LogMessage, context: LogContext = {}): void {
    console.warn(message, context);
    this.addBreadcrumb('warning', String(message), context);
  }

  error(error: Error, context: LogContext = {}): void {
    console.error(error, context);
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  }
}

const logger = new Logger();

export default logger;
