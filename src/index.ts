import { AuthService } from "./services/auth/auth.service";
import { di } from "./utils/di";
import { AppContentComponent } from "./components/app-content/app-content.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { EnvironmentListComponent } from "./components/environment-list/environment-list.component";
import { EnvironmentsService } from "./services/environments/environments.service";
import { ProxyService } from "./services/proxy/proxy.service";
import { TelemetryService } from "./services/telemetry/telemetry.service";

di.registerClass(TelemetryService, []);
di.registerClass(AuthService, []);
di.registerClass(ProxyService, []);
di.registerClass(EnvironmentsService, [ProxyService, AuthService]);

customElements.define("app-content", AppContentComponent);
customElements.define("app-header", AppHeaderComponent);
customElements.define("environment-list", EnvironmentListComponent);

// start application
di.getSingleton(AuthService).handleRedirect();
