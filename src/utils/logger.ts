/* eslint-disable no-console */
import * as Sentry from '@sentry/react';

interface LogContext {
  [key: string]: any;
}

type LogMessage = string | Error;

class Logger {
  private static addBreadcrumb(level: Sentry.SeverityLevel, message: string, context: LogContext): void {
    Sentry.addBreadcrumb({
      category: level,
      data: context,
      level,
      message,
    });
  }

  static debug(message: LogMessage, context: LogContext = {}): void {
    console.debug(message, context);
    Logger.addBreadcrumb('debug', String(message), context);
  }

  static info(message: LogMessage, context: LogContext = {}): void {
    console.info(message, context);
    Logger.addBreadcrumb('info', String(message), context);
  }

  static warn(message: LogMessage, context: LogContext = {}): void {
    console.warn(message, context);
    Logger.addBreadcrumb('warning', String(message), context);
  }

  static error(error: Error, context: LogContext = {}): void {
    console.error(error, context);
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  }
}

export default Logger;
