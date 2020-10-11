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
              <details class="environment-details" @toggle=${(evt: InputEvent) => this.resetCopyButtons(evt)}>
                <summary class="environment-summary">
                  <div class="app-icon"></div>
                  <div class="app-name">${e.appName}</div>
                </summary>
                <section class="environment-form">
                  <div class="form-row">
                    <span class="label">URL</span>
                    <a class="environment-url" href=${e.url}>${e.url}</a>
                  </div>
                  <div class="form-row">
                    <label for=${`username-${e.appId}`}>Username</label>
                    <input id=${`username-${e.appId}`} type="text" readonly value=${e.username} />
                    <button data-copy-button @click=${(evt: InputEvent) => this.handleCopyFromInput(`username-${e.appId}`, evt)}>Copy</button>
                  </div>

                  <div class="form-row">
                    <label for=${`password-${e.appId}`}>Password</label>
                    <input id=${`password-${e.appId}`} type="password" readonly value=${e.password} />
                    <button data-copy-button @click=${(evt: InputEvent) => this.handleCopyFromInput(`password-${e.appId}`, evt)}>Copy</button>
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

  private handleCopyFromInput(id: string, event: InputEvent) {
    const input = this.querySelector(`#${id}`) as HTMLInputElement;
    input?.select();
    navigator.clipboard.writeText(input.value);
    (event.target as HTMLButtonElement).innerText = "Copied ✔";
  }

  private resetCopyButtons(evt: InputEvent) {
    ([...(evt.target as HTMLElement).querySelectorAll("[data-copy-button]")] as HTMLButtonElement[]).forEach((button) => (button.innerText = "Copy"));
  }
}
