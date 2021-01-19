export class DomUtil {
  target: HTMLElement | null = null;
  constructor(target: HTMLElement) {
    this.target = target;
  }

  addClass(className: string) {
    this.target?.classList.add(className);
    return this;
  }

  removeClass(className: string) {
    this.target?.classList.remove(className);
    return this;
  }

  on(event: string, callback: () => void) {
    this.target?.addEventListener(event, callback);
    return this;
  }

  off(event: string, callback: () => void) {
    this.target?.removeEventListener(event, callback);
    return this;
  }
}
