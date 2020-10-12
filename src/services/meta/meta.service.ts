export class MetaService {
  getEnvironmentsLastModified(): string | null {
    const element = document.head.querySelector(`meta[name="environments-last-modified"]`) as HTMLMetaElement;
    const value = element?.getAttribute("content") || null;

    return value;
  }
}
