import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { MetaService } from "../meta/meta.service";
import { ProxyService } from "../proxy/proxy.service";
import { StorageService } from "../storage/storage.service";
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
  environmentsSubject = new BehaviorSubject<Environment[]>([]);

  constructor(
    private proxyService: ProxyService,
    private authService: AuthService,
    private telemetryService: TelemetryService,
    private storageService: StorageService,
    private metaService: MetaService
  ) {
    this.restoreLocalEnvironments();

    if (this.isRemoteEnvironmentsRequired()) {
      this.getRemoteEnvironments();
    }
  }

  private isRemoteEnvironmentsRequired(): boolean {
    const remoteLastModified = this.metaService.getEnvironmentsLastModified();
    console.log(`[environments] remote timestamp, ${remoteLastModified}`);

    const localLastModified = this.storageService.getEnvironmentsLastModified();
    console.log(`[environments] local timestamp, ${localLastModified}`);

    // dev environment does not have remote environment cache
    if (remoteLastModified === null) {
      console.error(`[environments] remote timestamp abscent`);
      return true;
    }

    // local version is older than remote version (assuming local cannot be newer than remote)
    if (localLastModified !== remoteLastModified) {
      console.log(`[environments] update required`);

      return true;
    }

    return false;
  }

  private restoreLocalEnvironments() {
    const environments = this.storageService.getEnvironments();
    if (environments) {
      this.environmentsSubject.next(environments);
    }
  }

  private getRemoteEnvironments() {
    this.authService.authTokenSubject.pipe(filter((token) => token !== null && token.length > 0)).subscribe(async (token) => {
      const start = performance.now();
      const environments: Environment[] = await this.proxyService.get(".netlify/functions/get-environments", token!);
      const duration = performance.now() - start;
      this.telemetryService.trackMetric({
        name: "get-environments",
        average: duration / 1000,
      });

      this.environmentsSubject.next(environments);

      // cache results
      this.storageService.setEnvironments(environments);

      const remoteLastModified = this.metaService.getEnvironmentsLastModified();
      if (remoteLastModified !== null) {
        this.storageService.setEnvironmentsLastModified(remoteLastModified);
      }
    });
  }
}
