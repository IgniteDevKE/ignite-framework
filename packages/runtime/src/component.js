import { destroyDOM } from "./destroy-dom";
import { mountDOM } from "./mount-dom";

export function defineComponent({ render }) {
  class Component {
    #isMounted = false;
    #vdom = null;
    #hostEl = null;

    render() {
      return render();
    }

    mount(hostEl, index = null) {
      if (this.#isMounted) {
        throw new Error("Component is already mounted");
      }
      this.#vdom = this.render();
      mountDOM(this.#vdom, hostEl, index);

      this.#hostEl = hostEl;
      this.#isMounted = true;
    }

    unmount() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted");
      }
      destroyDOM(this.#vdom);
      this.#vdom = null;
      this.#hostEl = null;
      this.#isMounted = false;
    }
  }

  return Component;
}
