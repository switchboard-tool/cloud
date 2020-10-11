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
      html` <ul>
        ${this.environmentsSubject.value.map(
          (e) => html`
            <li>
              <details>
                <summary>${e.appName}</summary>
                <div>
                  <label for=${`url-${e.appId}`}>URL</label>
                  <input id=${`url-${e.appId}`} type="url" name readonly value=${e.url} />
                  <a href=${e.url}>Open (right-click to use private mode)</a>
                </div>
                <div>
                  <label for=${`username-${e.username}`}>Username</label>
                  <input id=${`username-${e.username}`} type="text" readonly value=${e.username} />
                  <button>Copy</button>
                </div>

                <div>
                  <label for=${`password-${e.username}`}>Password</label>
                  <input id=${`password-${e.username}`} type="text" readonly value=${e.password} />
                  <button>Copy</button>
                </div>
              </details>
            </li>
          `
        )}
      </ul>`,
      this
    );
  }
}
