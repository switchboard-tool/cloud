import { html, render } from "lit-html";
import { di } from "../../utils/di";

import "./app-root.component.css";

export class AppRootComponent extends HTMLElement {
  connectedCallback() {
    this.update();
  }

  update() {
    render(
      html`
        <account-info></account-info>
        <environment-list></environment-list>
      `,
      this
    );
  }
}
