import { ApplicationInsights, IApplicationInsights } from "@microsoft/applicationinsights-web";

export class TelemetryService {
  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: "34fe2d3e-e166-4544-b608-130d49bad0db",
    },
  });

  constructor() {
    this.appInsights.loadAppInsights();
    this.appInsights.trackPageView();
  }

  setAuthenticatedUserId(id: string) {
    this.appInsights.setAuthenticatedUserContext(id);
  }

  trackEvent(...args: Parameters<IApplicationInsights["trackEvent"]>) {
    const [event, customProperties] = args;
    const finalCustomProperties = { ...customProperties, host: location.host };
    this.appInsights.trackEvent(event, finalCustomProperties);
  }

  trackMetric(...args: Parameters<IApplicationInsights["trackMetric"]>) {
    const [event, customProperties] = args;
    const finalCustomProperties = { ...customProperties, host: location.host };
    this.appInsights.trackMetric(event, finalCustomProperties);
  }
}
