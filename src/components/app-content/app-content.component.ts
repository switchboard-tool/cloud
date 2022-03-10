import { html, render } from "lit";
import { links } from "../../contants";
import { AuthService } from "../../services/auth/auth.service";
import { di } from "../../utils/di";
import "./app-content.component.css";

export class AppContentComponent extends HTMLElement {
  authService = di.getSingleton(AuthService);

  connectedCallback() {
    this.update();

    this.authService.authStateSubject.subscribe(() => this.update());
  }

  update() {
    render(
      html`
        <main class="app-content">
          ${this.authService.authStateSubject.value === "signed-in"
            ? html`
                <div class="app-content__board">
                  <environment-list></environment-list>
                  <article class="app-content__tips">
                    <h1>Tips</h1>
                    <ol>
                      <li>Use <a href="https://www.microsoft.com/en-us/edge">Microsoft Edge</a> to protect demo credentials.</li>
                      <li>Right-click on URL to open apps in InPrivate window.</li>
                      <li>Close previously opened apps before opening a new one.</li>
                      <li>Share Switchboard by its short URL: <a href=${links.switchboardAkaMs}>aka.ms/switchboard</a>.</li>
                      <li>
                        Join our <a href=${links.switchboardTeamsGeneralChannel}>Teams community</a> for help and feedback.
                      </li>
                    </ol>
                  </article>
                </div>
              `
            : ""}
          ${this.authService.authStateSubject.value === "unknown"
            ? html`<div class="app-content__authentication" aria-live="polite">
                <p>Authenticating…</p>
                <article class="auth-help">
                  <p>
                    Was there an issue signing in? <a href=${`${location.protocol}//${location.host}`}>Click here to start over</a> or get help from
                    <a href=${links.switchboardTeamsGeneralChannel}>Switchboard Teams General channel</a>.
                  </p>
                </article>
              </div>`
            : ""}
          ${this.authService.authStateSubject.value === "signed-out"
            ? html` <div class="app-content__sign-in">
                <p>Switchboard provides instant access to demo apps from Microsoft Digital Transformation Platform (DTP).</p>
                <p>Sign in with your Microsoft work account to continue.</p>
                <button class="btn btn--primary btn--w120" @click=${() => this.authService.signIn()}>Sign in</button>
              </div>`
            : ""}
        </main>
      `,
      this
    );
  }
}
