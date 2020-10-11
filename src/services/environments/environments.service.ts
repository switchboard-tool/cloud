import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { ProxyService } from "../proxy/proxy.service";
export interface Environment {
  appName: string;
  appId: string;
  url: string;
  username: string;
  password: string;
}

export class EnvironmentsService {
  environmentsSubject = new BehaviorSubject<Environment[]>([]);

  constructor(private proxyService: ProxyService, private authService: AuthService) {
    this.authService.authTokenSubject.pipe(filter((token) => token !== null && token.length > 0)).subscribe(async (token) => {
      const environments: Environment[] = await this.proxyService.get(".netlify/functions/get-environments", token!);

      this.environmentsSubject.next(environments);
    });
  }
}
