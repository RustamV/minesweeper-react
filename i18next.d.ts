// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ru from "./src/helpers/locales/ru";
import en from "./src/helpers/locales/en";
import fr from "./src/helpers/locales/fr";

declare module "i18next" {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: "en";
        // custom resources type
        resources: {
            ru: typeof ru;
            en: typeof en;
            fr: typeof fr;
        };
        // other
    }
}
