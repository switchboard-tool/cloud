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
            <li class="environment-item" data-app-id=${e.appId}>
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
                    <label class="label" for=${`username-${e.appId}`}>Username</label>
                    <input
                      class="input input--copy-target"
                      id=${`username-${e.appId}`}
                      type="text"
                      readonly
                      value=${e.username}
                      @click=${() => this.handleCopy(`username-${e.appId}`)}
                    />
                    <button
                      class="btn btn--primary btn--copy form-row__field-action"
                      data-copy-id=${`username-${e.appId}`}
                      @click=${() => this.handleCopy(`username-${e.appId}`)}
                    >
                      Copy
                    </button>
                  </div>

                  <div class="form-row">
                    <label class="label" for=${`password-${e.appId}`}>Password</label>
                    <input
                      class="input input--copy-target"
                      id=${`password-${e.appId}`}
                      type="password"
                      readonly
                      value=${e.password}
                      @click=${() => this.handleCopy(`password-${e.appId}`)}
                    />
                    <button
                      class="btn btn--primary btn--copy form-row__field-action"
                      data-copy-id=${`password-${e.appId}`}
                      @click=${() => this.handleCopy(`password-${e.appId}`)}
                    >
                      Copy
                    </button>
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

  private handleCopy(id: string) {
    const input = this.querySelector(`#${id}`) as HTMLInputElement;
    input?.select();
    navigator.clipboard.writeText(input.value);
    const copyButtonElement = document.querySelector(`[data-copy-id="${id}"]`) as HTMLButtonElement;
    copyButtonElement.innerText = "Copied ✔";
    copyButtonElement.dataset.copied = "";
  }

  private resetCopyButtons(evt: InputEvent) {
    ([...(evt.target as HTMLElement).querySelectorAll("[data-copy-id]")] as HTMLButtonElement[]).forEach((button) => {
      button.innerText = "Copy";
      delete button.dataset.copied;
    });
  }
}
