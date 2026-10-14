class ChangeLanguageUseCase {
  constructor(languageRepository, translationService = null) {
    this.languageRepository = languageRepository;
    this.translationService = translationService;
  }

  async execute(language) {
    const normalizedLanguage = String(language || "es").toLowerCase();

    if (this.languageRepository && typeof this.languageRepository.saveLanguage === "function") {
      this.languageRepository.saveLanguage(normalizedLanguage);
    }

    if (this.translationService && typeof this.translationService.changeLanguage === "function") {
      await this.translationService.changeLanguage(normalizedLanguage);
    }

    return normalizedLanguage;
  }
}

export default ChangeLanguageUseCase;
