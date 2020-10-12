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

  trackEvent(...args: Parameters<IApplicationInsights["trackEvent"]>) {
    this.appInsights.trackEvent(...args);
    // console.log("[analytics] event", ...args);
  }

  trackMetric(...args: Parameters<IApplicationInsights["trackMetric"]>) {
    this.appInsights.trackMetric(...args);
    // console.log("[analytics] metrics", ...args);
  }
}
