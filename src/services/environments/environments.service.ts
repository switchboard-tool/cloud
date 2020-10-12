import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { di } from "../../utils/di";
import { AuthService } from "../auth/auth.service";
import { ProxyService } from "../proxy/proxy.service";
import { TelemetryService } from "../telemetry/telemetry.service";
export interface Environment {
  appName: string;
  appId: string;
  url: string;
  username: string;
  password: string;
  decorators: string[];
}

export class EnvironmentsService {
  telemetryService = di.getSingleton(TelemetryService);
  environmentsSubject = new BehaviorSubject<Environment[]>([]);

  constructor(private proxyService: ProxyService, private authService: AuthService) {
    this.authService.authTokenSubject.pipe(filter((token) => token !== null && token.length > 0)).subscribe(async (token) => {
      const start = performance.now();
      const environments: Environment[] = await this.proxyService.get(".netlify/functions/get-environments", token!);
      const duration = performance.now() - start;
      this.telemetryService.trackMetric({
        name: "get-environments",
        average: duration / 1000,
      });

      this.environmentsSubject.next(environments);
    });
  }
}
