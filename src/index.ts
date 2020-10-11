import { di } from "./utils/di";
import { AppRootComponent } from "./components/app-root/app-root.component";
import { EnvironmentListComponent } from "./components/environment-list/environment-list.component";
import { EnvironmentsService } from "./services/environments/environments.service";

di.registerClass(EnvironmentsService, []);

customElements.define("app-root", AppRootComponent);
customElements.define("environment-list", EnvironmentListComponent);
