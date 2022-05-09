import { useCallback, useMemo } from 'react';
import { useLanguage } from 'src/boot';

interface IEntity {
    _translations_id: { items: Array<{ id: string; value: string; language: string }> };
}
interface ITranslations {
    translations: Array<{ id: string; value: string; language: string }>;
    getTranslation: (key: string) => string | undefined;
}
export const useTranslation = (entity?: IEntity): ITranslations => {
    const { currentLanguage } = useLanguage();
    const translations = useMemo(
        () => entity?._translations_id.items.filter(({ language }) => language === currentLanguage) || [],
        [currentLanguage, entity],
    );

    const getTranslation = useCallback((key: string) => translations.find(({ id }) => id === key)?.value, [
        translations,
    ]);

    return {
        translations,
        getTranslation,
    };
};
