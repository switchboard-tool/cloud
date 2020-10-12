import { AppContentComponent } from "./components/app-content/app-content.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { EnvironmentListComponent } from "./components/environment-list/environment-list.component";
import { AuthService } from "./services/auth/auth.service";
import { EnvironmentsService } from "./services/environments/environments.service";
import { MetaService } from "./services/meta/meta.service";
import { ProxyService } from "./services/proxy/proxy.service";
import { StorageService } from "./services/storage/storage.service";
import { TelemetryService } from "./services/telemetry/telemetry.service";
import { di } from "./utils/di";

di.registerClass(TelemetryService, []);
di.registerClass(StorageService, []);
di.registerClass(AuthService, [StorageService, TelemetryService]);
di.registerClass(MetaService, []);
di.registerClass(ProxyService, []);
di.registerClass(EnvironmentsService, [ProxyService, AuthService, TelemetryService, StorageService, MetaService]);

customElements.define("app-content", AppContentComponent);
customElements.define("app-header", AppHeaderComponent);
customElements.define("environment-list", EnvironmentListComponent);

// start application
di.getSingleton(AuthService).handleRedirect();
