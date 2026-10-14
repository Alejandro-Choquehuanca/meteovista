class LocalStorageLanguageRepository {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
  }

  getLanguage() {
    if (!this.storage) {
      return "es";
    }

    return this.storage.getItem("meteovista-language") || "es";
  }

  saveLanguage(language) {
    if (!this.storage) {
      return language;
    }

    const normalizedLanguage = String(language || "es").toLowerCase();
    this.storage.setItem("meteovista-language", normalizedLanguage);
    return normalizedLanguage;
  }
}

export default LocalStorageLanguageRepository;
