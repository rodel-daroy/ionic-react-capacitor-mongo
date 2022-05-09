import React, { ReactNode } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';
import defaultMessages from 'src/translations/compiled/en.json';

export enum LOCALES {
    EN = 'EN',
    DE = 'DE',
}

type Messages = Record<string, string> | Record<string, MessageFormatElement[]>;

export interface IIntlContext {
    currentLanguage: LOCALES;
    messages: Messages;
    setLanguage: React.Dispatch<React.SetStateAction<LOCALES>>;
}
const ReactIntlContext = React.createContext<IIntlContext>(null as any);

export const ReactIntlProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setLanguage] = React.useState(LOCALES.EN);
    const [messages, setMessages] = React.useState<Messages>(defaultMessages);

    React.useEffect(() => {
        const load = async () => {
            const msgs = await fetchMessages(currentLanguage);
            setMessages(msgs);
        };
        void load();
    }, [currentLanguage]);

    return (
        <ReactIntlContext.Provider value={{ currentLanguage, messages, setLanguage }}>
            <IntlProvider key={currentLanguage} messages={messages} locale={currentLanguage} defaultLocale="en">
                {children}
            </IntlProvider>
        </ReactIntlContext.Provider>
    );
};

export const useLanguage = (): IIntlContext => {
    const ctx = React.useContext(ReactIntlContext);
    if (!ctx) {
        throw new Error(`You must call useLanguage() inside of a <ReactIntlProvider />`);
    }
    return {
        setLanguage: ctx.setLanguage,
        currentLanguage: ctx.currentLanguage,
        messages: ctx.messages,
    };
};

async function fetchMessages(locale: LOCALES): Promise<Messages> {
    switch (locale) {
        case LOCALES.EN: {
            return (await import('../translations/compiled/en.json')).default as Messages;
        }
        case LOCALES.DE: {
            return (await import('../translations/compiled/de.json')).default as Messages;
        }
        default: {
            return (await import('../translations/compiled/en.json')).default as Messages;
        }
    }
}
