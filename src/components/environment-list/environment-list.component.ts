import { html, render } from "lit";
import { EnvironmentsService } from "../../services/environments/environments.service";
import { TelemetryService } from "../../services/telemetry/telemetry.service";
import { di } from "../../utils/di";
import "./environment-list.component.css";

const iconUrlPrefix = `https://switchboard-assets.netlify.app/product-icons`;

export class EnvironmentListComponent extends HTMLElement {
  environmentsService = di.getSingleton(EnvironmentsService);
  telemetryService = di.getSingleton(TelemetryService);
  environmentsSubject = this.environmentsService.environmentsSubject;

  #badgeTooltips = new Map([
    ["demo", ["DEMO", "Demo environments come with customizations and extensions. They showcase possibilities to customers."]],
    ["dev", ["DEV", "Dev environments come with bugs and experiments. They help developement and testing."]],
    ["viewonly", ["VIEW-ONLY", "Changes in this environment may break other people's work. Please don't make changes even if you can."]],
  ]);

  connectedCallback() {
    this.update();

    this.environmentsSubject.subscribe(() => this.update());
  }

  update() {
    render(
      html` <ul class="environments">
        ${this.environmentsSubject.value.map((e) => {
          return html`
            <li class="environment-item" style=${`--icon-url:url("${iconUrlPrefix}/${e.appIcon}")`}>
              <details class="environment-details" @toggle=${(evt: InputEvent) => this.resetCopyButtons(evt)}>
                <summary class="environment-summary">
                  <div class="app-icon"></div>
                  <div class="app-name">
                    ${e.appName}${e.decorators
                      ? html`
                          <sup class="app-badge-list"
                            >${e.decorators.map(
                              (decorator, index) =>
                                html`
                                  ${index > 0 ? html` <span>·</span> ` : null}
                                  <span class="app-badge" title="${this.getDecoratorTooltip(decorator)}">${this.getDecoratorDisplayText(decorator)}</span>
                                `
                            )}</sup
                          >
                        `
                      : null}
                  </div>
                </summary>
                <section class="environment-form">
                  <div class="form-row">
                    <span class="label">URL</span>
                    <a
                      class="environment-url"
                      target="_blank"
                      rel="noopener"
                      href=${e.url}
                      @contextmenu=${() => this.trackOpenApp(e.appId)}
                      @click=${() => this.trackOpenApp(e.appId)}
                      >Right click > Open link in InPrivate window</a
                    >
                  </div>
                  <div class="form-row">
                    <label class="label" for=${`username-${e.appId}`}>Username</label>
                    <input
                      class="input input--copy-target"
                      id=${`username-${e.appId}`}
                      type="text"
                      readonly
                      .value=${e.username}
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
                      .value=${e.password}
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
    copyButtonElement.innerText = "✔ Copied";
    copyButtonElement.dataset.copied = "";
  }

  private resetCopyButtons(evt: InputEvent) {
    ([...(evt.target as HTMLElement).querySelectorAll("[data-copy-id]")] as HTMLButtonElement[]).forEach((button) => {
      button.innerText = "Copy";
      delete button.dataset.copied;
    });
  }

  private getDecoratorTooltip(key: string) {
    return this.#badgeTooltips.has(key) ? this.#badgeTooltips.get(key)?.[1] : "";
  }

  private getDecoratorDisplayText(key: string) {
    return this.#badgeTooltips.has(key) ? this.#badgeTooltips.get(key)?.[0] : key.toLocaleUpperCase();
  }

  private trackOpenApp(appId: string) {
    return this.telemetryService.trackEvent({ name: "open-app" }, { appId });
  }
}
