# Configuration SMTP — Formulaire de contact KCI

Copiez ce fichier vers `.env.local` à la racine du projet, puis renseignez les valeurs.

```env
# Compte Gmail utilisé pour l'envoi (Google Workspace ou Gmail personnel)
SMTP_USER=votre-compte@gmail.com

# Mot de passe d'application Gmail (pas le mot de passe du compte)
# https://myaccount.google.com/apppasswords
SMTP_PASS=xxxx xxxx xxxx xxxx

# Optionnel — valeurs par défaut Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Nom affiché comme expéditeur
CONTACT_FROM_NAME=KCI Website

# Boîtes de réception KCI
CONTACT_TO_EMAIL=info@kci-ltd.com
CONTACT_SALES_EMAIL=sales@kci-ltd.com
```

## Routage des messages

| Département sélectionné | Destinataire |
|-------------------------|--------------|
| Ventes (`sales`)        | `CONTACT_SALES_EMAIL` |
| Autres départements     | `CONTACT_TO_EMAIL` |

Le champ **Reply-To** est défini sur l'email du visiteur : KCI peut répondre directement depuis Gmail.

## Prérequis Gmail

1. Activer la validation en 2 étapes sur le compte Google.
2. Créer un **mot de passe d'application** (Application passwords).
3. Coller ce mot de passe dans `SMTP_PASS` (sans espaces ou avec espaces, les deux fonctionnent).

## Test local

```bash
npm run dev
```

Soumettez le formulaire sur `/fr/contact` ou `/en/contact`. En cas de succès, le visiteur voit uniquement le message de confirmation ; l'email arrive dans la boîte KCI configurée.

## Déploiement (Vercel)

Ajoutez les mêmes variables dans **Project Settings → Environment Variables**.
