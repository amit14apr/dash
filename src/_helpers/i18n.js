import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          'login_heading': 'Welcome to Device Invetory System',
          'login_Desc': 'Sign in to your account below',
          'login_usernameLabel': 'Username or e-mail address',
          'login_usernamePlaceholder': 'Enter your username',
          'login_passwordLabel': 'Password',
          'login_passwordPlaceholder': 'Enter your password',
          'login_remember': 'Remember me',
          'login_btn': 'Login',
          'login_dontHaveAccount': "Don't have an account?",
          'login_signupLink': 'Create an account'
        }
      },
      fr: {
        translations: {
            'login_heading': "Bienvenue dans le système d'inventaire des appareils",
            'login_Desc': 'Connectez-vous à votre compte ci-dessous',
            'login_usernameLabel': "Nom d'utilisateur ou adresse e-mail",
            'login_usernamePlaceholder': "Entrez votre nom d'utilisateur",
            'login_passwordLabel': "Mot de passe",
            'login_passwordPlaceholder': "Entrez votre mot de passe",
            'login_remember': "Se souvenir de moi",
            'login_btn': 'Connexion',
            'login_dontHaveAccount': "Vous n'avez pas de compte ?",
            'login_signupLink': "Créer un compte"
        }
      }
    },
    fallbackLng: "en",
    debug: true,
    preload: ['en'],
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    initImmediate : false,
    keySeparator: true, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
