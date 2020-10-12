import { html, render } from "lit-html";
import { AuthService } from "../../services/auth/auth.service";
import { di } from "../../utils/di";
import "./app-header.component.css";

export class AppHeaderComponent extends HTMLElement {
  authService = di.getSingleton(AuthService);

  connectedCallback() {
    this.update();
    this.authService.authStateSubject.subscribe(() => this.update());
  }

  update() {
    render(
      html`<header class="app-header">
        <div class="app-header__app-name">Switchboard</div>
        ${this.authService.authStateSubject.value === "signed-in" ? html`<button class="btn" @click=${() => this.authService.signOut()}>Sign out</button>` : ""}
      </header>`,
      this
    );
  }
}
