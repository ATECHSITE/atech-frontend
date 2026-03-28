# Configuration de l'envoi d'emails

Ce document explique comment configurer l'envoi d'emails pour le formulaire de contact.

## Prérequis

Le système d'envoi d'emails utilise **Resend**, un service moderne et fiable pour l'envoi d'emails.

## Étapes de configuration

### 1. Installer le package Resend

```bash
npm install resend
```

### 2. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour inclus)
3. Vérifiez votre email

### 3. Obtenir votre clé API

1. Connectez-vous à votre compte Resend
2. Allez dans **API Keys** dans le menu
3. Cliquez sur **Create API Key**
4. Donnez-lui un nom (ex: "ATECH Website")
5. Copiez la clé générée

### 4. Configurer les variables d'environnement

1. Copiez le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Modifiez `.env.local` et ajoutez vos valeurs :
   ```env
   RESEND_API_KEY=re_votre_cle_api_ici
   CONTACT_EMAIL=info@atech-bf.com
   ```

### 5. Configurer votre domaine (optionnel mais recommandé)

Par défaut, Resend utilise `onboarding@resend.dev` comme expéditeur. Pour utiliser votre propre domaine :

1. Dans Resend, allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `atech-bf.com`)
4. Suivez les instructions pour ajouter les enregistrements DNS
5. Une fois vérifié, modifiez `src/app/api/contact/route.ts` ligne 27 :
   ```typescript
   from: 'ATECH Solutions <contact@atech-bf.com>',
   ```

### 6. Tester l'envoi d'emails

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur la page de contact
3. Remplissez le formulaire et envoyez
4. Vérifiez votre boîte mail (définie dans `CONTACT_EMAIL`)

## Alternatives à Resend

Si vous préférez utiliser un autre service, voici quelques alternatives :

### SendGrid
```bash
npm install @sendgrid/mail
```

### Nodemailer (SMTP)
```bash
npm install nodemailer
```

### AWS SES
```bash
npm install @aws-sdk/client-ses
```

## Dépannage

### L'email n'arrive pas
- Vérifiez que `RESEND_API_KEY` est correctement configurée
- Vérifiez les logs du serveur pour les erreurs
- Consultez le dashboard Resend pour voir l'état des emails

### L'email arrive dans les spams
- Configurez votre propre domaine avec SPF, DKIM et DMARC
- Évitez d'utiliser `onboarding@resend.dev` en production

### Erreur "Invalid API key"
- Vérifiez que la clé API commence par `re_`
- Assurez-vous que le fichier `.env.local` est à la racine du projet
- Redémarrez le serveur de développement après modification du `.env.local`

## Limites

### Plan gratuit Resend
- 100 emails par jour
- 3,000 emails par mois
- Idéal pour commencer

### Plans payants
Si vous dépassez ces limites, consultez [les tarifs Resend](https://resend.com/pricing).

## Sécurité

⚠️ **Important** :
- Ne commitez JAMAIS votre fichier `.env.local` dans git
- Le fichier `.env.local` est déjà dans `.gitignore`
- Ne partagez jamais votre clé API publiquement
