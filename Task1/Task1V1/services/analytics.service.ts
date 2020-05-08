import appInsights = require('applicationinsights');
import { EventTelemetry } from 'applicationinsights/out/Declarations/Contracts';

export class AnalyticsService {

  client!: appInsights.TelemetryClient;

  constructor(instrumentationKey: string, disabled: boolean = false) {
    try {
      if (!disabled) {
        appInsights.setup(instrumentationKey);

        this.client = appInsights.defaultClient;

        appInsights.defaultClient.commonProperties = {
          task: 'Angular CLI',
          version: '$(ExtensionVersion)',
        };

        appInsights.start();
      }
    } catch (e) {
      console.warn(e);
    }

  }

  trackEvent(message: string) {
    if (this.client) {
      this.client.trackEvent({ name: message });
    }
  }

  trackEventExtended(obj: EventTelemetry) {
    if (this.client) {
      this.client.trackEvent(obj);
    }
  }

  trackException(message: string) {
    if (this.client) {
      this.client.trackException({ exception: new Error(message) });
    }
  }

  trackExceptionExtended(error: Error) {
    if (this.client) {
      this.client.trackException({ exception: error });
    }
  }
}