import { jobTranslations } from '@/data/translations/jobs';
import { serviceTranslations } from '@/data/translations/services';
import { commonTranslations } from '@/data/translations/common';
import { formTranslations } from '@/data/translations/forms';
import { homeTranslations } from '@/data/translations/home';
import { aboutTranslations } from '@/data/translations/about';
import { legalTranslations } from '@/data/translations/legal'; // ADD THIS LINE

export const translations = {
  en: {
    ...commonTranslations.en,
    ...homeTranslations.en,
    ...serviceTranslations.en,
    ...jobTranslations.en,
    ...formTranslations.en,
    ...aboutTranslations.en,
    ...legalTranslations.en, // ADD THIS LINE
  },
  nl: {
    ...commonTranslations.nl,
    ...homeTranslations.nl,
    ...serviceTranslations.nl,
    ...jobTranslations.nl,
    ...formTranslations.nl,
    ...aboutTranslations.nl,
    ...legalTranslations.nl, // ADD THIS LINE
  }
};