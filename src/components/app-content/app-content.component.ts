import { html, render } from "lit-html";
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
                      <li>Right-click environment URLs to open them in InPrivate window. This prevents browser from using your Microsoft work account.</li>
                      <li>Close any existing InPrivate windows before opening an environment.</li>
                      <li>Open one environment at a time. If you need to view multiple environments, please close the previously opened window.</li>
                    </ol>
                  </article>
                </div>
              `
            : ""}
          ${this.authService.authStateSubject.value === "unknown" ? html`<div class="app-content__authentication">Authenticating…</div>` : ""}
          ${this.authService.authStateSubject.value === "signed-out"
            ? html` <div class="app-content__sign-in">
                <p>Sign in with your Microsoft work account to view all available environments.</p>
                <button class="btn btn--primary" @click=${this.authService.signIn}>Sign in</button>
              </div>`
            : ""}
        </main>
      `,
      this
    );
  }
}
