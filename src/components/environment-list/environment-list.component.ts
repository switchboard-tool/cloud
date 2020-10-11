import { html, render } from "lit-html";
import { EnvironmentsService } from "../../services/environments/environments.service";
import { di } from "../../utils/di";

export class EnvironmentListComponent extends HTMLElement {
  environmentsService = di.getSingleton(EnvironmentsService);
  environmentsSubject = this.environmentsService.environmentsSubject;

  connectedCallback() {
    this.update();

    this.environmentsSubject.subscribe(() => this.update());
  }

  update() {
    render(
      html` <h1>Environments</h1>
        <ul>
          ${this.environmentsSubject.value.map((e) => html`<li>${e.appName}</li>`)}
        </ul>`,
      this
    );
  }
}
