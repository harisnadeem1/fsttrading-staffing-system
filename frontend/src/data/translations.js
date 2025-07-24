
import { jobTranslations } from '@/data/translations/jobs';
import { serviceTranslations } from '@/data/translations/services';
import { commonTranslations } from '@/data/translations/common';
import { formTranslations } from '@/data/translations/forms';
import { homeTranslations } from '@/data/translations/home';

export const translations = {
  en: {
    ...commonTranslations.en,
    ...homeTranslations.en,
    ...serviceTranslations.en,
    ...jobTranslations.en,
    ...formTranslations.en,
  },
  nl: {
    ...commonTranslations.nl,
    ...homeTranslations.nl,
    ...serviceTranslations.nl,
    ...jobTranslations.nl,
    ...formTranslations.nl,
  }
};
