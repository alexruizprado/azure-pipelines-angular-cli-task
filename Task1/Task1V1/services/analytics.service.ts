import appInsights = require('applicationinsights');
import { EventTelemetry } from 'applicationinsights/out/Declarations/Contracts';
let os = require('os');

export class AnalyticsService {

  client!: appInsights.TelemetryClient;

  runId = new Date().getTime();

  constructor(instrumentationKey: string, disabled: boolean = false) {
    var osPlatform = '';
    var osRelease = '';
    var nodeVersion = '';
    try {
      osPlatform = os.platform();
      osRelease = os.release();
      nodeVersion = process.version;
    } catch (e) { }
    try {
      if (!disabled) {
        appInsights.setup(instrumentationKey);

        this.client = appInsights.defaultClient;

        appInsights.defaultClient.commonProperties = {
          task: 'Angular CLI',
          version: '##{ExtensionVersion}##',
          runId: this.runId.toString(),
          platform: osPlatform,
          release: osRelease,
          node: nodeVersion
        };

        appInsights.start();
      }
    } catch (e) {
      console.warn(e);
    }

  }

  trackEvent(message: string) {
    try {
      if (this.client) {
        this.client.trackEvent({ name: message });
      }
    } catch (e) {
      console.warn(e);
    }
  }

  trackEventExtended(obj: EventTelemetry) {
    try {
      if (this.client) {
        this.client.trackEvent(obj);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  trackException(message: string) {
    try {
      if (this.client) {
        this.client.trackException({ exception: new Error(message) });
      }
    } catch (e) {
      console.warn(e);
    }
  }

  trackExceptionExtended(error: Error) {
    try {
      if (this.client) {
        this.client.trackException({ exception: error });
      }
    } catch (e) {
      console.warn(e);
    }
  }
}