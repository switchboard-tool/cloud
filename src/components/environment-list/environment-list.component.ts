import { html, render } from "lit-html";
import { EnvironmentsService } from "../../services/environments/environments.service";
import { di } from "../../utils/di";
import "./environment-list.component.css";

export class EnvironmentListComponent extends HTMLElement {
  environmentsService = di.getSingleton(EnvironmentsService);
  environmentsSubject = this.environmentsService.environmentsSubject;

  connectedCallback() {
    this.update();

    this.environmentsSubject.subscribe(() => this.update());
  }

  update() {
    render(
      html` <ul class="environments">
        ${this.environmentsSubject.value.map((e) => {
          return html`
            <li data-app-id=${e.appId}>
              <details class="environment-details">
                <summary class="environment-summary">
                  <div class="app-icon"></div>
                  <div class="app-name">${e.appName}</div>
                </summary>
                <section class="environment-form">
                  <div class="form-row">
                    <span>URL</span>
                    <a class="environment-url" href=${e.url}>${e.url}</a>
                  </div>
                  <div class="form-row">
                    <label for=${`username-${e.appId}`}>Username</label>
                    <input id=${`username-${e.appId}`} type="text" readonly value=${e.username} />
                    <button>Copy</button>
                  </div>

                  <div class="form-row">
                    <label for=${`password-${e.appId}`}>Password</label>
                    <input id=${`password-${e.appId}`} type="text" readonly value=${e.password} />
                    <button>Copy</button>
                  </div>
                </section>
              </details>
            </li>
          `;
        })}
      </ul>`,
      this
    );
  }
}
