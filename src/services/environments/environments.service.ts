import { BehaviorSubject } from "rxjs";

export interface Environment {
  appName: string;
  appId: string;
  url: string;
  username: string;
  password: string;
}

export class EnvironmentsService {
  environmentsSubject = new BehaviorSubject<Environment[]>([]);

  constructor() {
    this.init();
  }

  private async init() {
    const response = await fetch("api/environments.json");
    const environments: Environment[] = await response.json();

    this.environmentsSubject.next(environments);
  }
}
