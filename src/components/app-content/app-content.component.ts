import { html, render } from "lit-html";
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
                      <li>Right-click environment URLs to open them in InPrivate window. This prevents browser from using your Microsoft work account.</li>
                      <li>Close any existing InPrivate windows before opening an environment.</li>
                      <li>Open one environment at a time. If you need to view multiple environments, please close the previously opened window.</li>
                      <li>Cannot remember the URL? You can use <a href=${links.switchboardAkaMs}>aka.ms/switchboard</a>.</li>
                      <li>To provide feedback or get help, use <a href=${links.switchboardTeamsGeneralChannel}>Switchboard Teams General channel</a></li>
                    </ol>
                  </article>
                </div>
              `
            : ""}
          ${this.authService.authStateSubject.value === "unknown"
            ? html`<div class="app-content__authentication">
                <p aria-live="polite">Authenticating…</p>
                <article class="auth-help">
                  <p>
                    Did you encounter issue signing in? <a href=${`${location.protocol}//${location.host}`}>Click here to start over</a> or report the issue in
                    <a
                      href="https://teams.microsoft.com/l/channel/19%3a847ddf12dcee4e27adb9c0ff6ab68aa5%40thread.skype/General?groupId=da3b2d71-1ea2-48e2-af0e-cc54e80c1a85&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47"
                      >Switchboard Teams General channel</a
                    >.
                  </p>
                </article>
              </div>`
            : ""}
          ${this.authService.authStateSubject.value === "signed-out"
            ? html` <div class="app-content__sign-in">
                <p>Sign in with Microsoft work account to view environments.</p>
                <button class="btn btn--primary btn--w120" @click=${this.authService.signIn}>Sign in</button>
              </div>`
            : ""}
        </main>
      `,
      this
    );
  }
}
