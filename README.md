# MBOR BUSINESS STORE 🏆

Site e-commerce premium ultra-moderne pour la vente de maillots de football, sneakers, crampons et streetwear.

![MBOR Business Store](public/athletic-person-wearing-premium-streetwear-and-sne.jpg)

## 🎯 Fonctionnalités

### 🌓 Interface Utilisateur Premium
- **Dark/Light Mode** : Système de thème complet avec transition fluide et persistance localStorage
- **Design Ultra-Moderne** : Interface inspirée de Nike.com et Adidas.com avec animations sophistiquées
- **Responsive** : Optimisé pour mobile, tablette et desktop
- **Animations Fluides** : Transitions douces, effets hover, et micro-interactions partout

### 🛍️ E-commerce Complet
- **Homepage** : Hero cinématique, catégories immersives, produits phares, newsletter
- **Shop** : Filtres avancés (catégorie, marque, taille, prix), tri, grille responsive
- **Produit** : Galerie images, sélection taille, variations couleur, produits similaires
- **Panier** : Gestion quantité, calcul total, promo codes, résumé commande
- **Checkout** : Formulaire livraison, paiement, résumé final

### 🔐 Authentification & Admin
- **Login/Signup** : Design split-screen élégant avec validation formulaire
- **Dashboard Admin** : 
  - Statistiques en temps réel (ventes, commandes, clients)
  - Gestion des commandes avec statuts
  - Produits populaires
  - Actions rapides (ajout produit, gestion promo)

### 📄 Pages Additionnelles
- **About** : Histoire de la marque, vision, valeurs, statistiques
- **Footer** : Navigation complète, newsletter, réseaux sociaux

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm, yarn, ou pnpm

### Étapes d'installation

1. **Cloner/Télécharger le projet**
   ```bash
   # Si vous avez téléchargé le ZIP, extrayez-le
   cd mbor-business-store
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configurer les variables d'environnement** (optionnel)
   ```bash
   cp .env.example .env.local
   ```
   
   Modifiez `.env.local` avec vos clés API si nécessaire.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📁 Structure du Projet

```
mbor-business-store/
├── app/                          # Next.js App Router
│   ├── about/                    # Page À propos
│   ├── admin/                    # Dashboard administrateur
│   ├── cart/                     # Page panier
│   ├── checkout/                 # Page paiement
│   ├── login/                    # Page connexion
│   ├── signup/                   # Page inscription
│   ├── product/[id]/             # Page détail produit (dynamique)
│   ├── shop/                     # Page boutique avec filtres
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Layout principal
│   └── globals.css               # Styles globaux & thème
│
├── components/                   # Composants React
│   ├── ui/                       # Composants shadcn/ui
│   ├── navigation.tsx            # Barre de navigation
│   ├── footer.tsx                # Pied de page
│   ├── theme-provider.tsx        # Provider thème dark/light
│   ├── theme-toggle.tsx          # Bouton switch thème
│   ├── product-grid.tsx          # Grille produits
│   ├── product-gallery.tsx       # Galerie images produit
│   ├── shop-filters.tsx          # Filtres boutique
│   ├── cart-items.tsx            # Liste items panier
│   └── ... autres composants
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Hook détection mobile
│   └── use-toast.ts              # Hook notifications toast
│
├── lib/                          # Utilitaires
│   └── utils.ts                  # Fonctions helpers (cn, etc.)
│
├── public/                       # Assets statiques
│   ├── *.jpg                     # Images produits
│   └── *.svg                     # Logos et icônes
│
├── package.json                  # Dépendances
├── next.config.mjs               # Configuration Next.js
├── tsconfig.json                 # Configuration TypeScript
└── README.md                     # Ce fichier
```

## 🎨 Technologies Utilisées

- **Framework** : Next.js 16 (App Router)
- **UI** : React 19.2
- **Styling** : Tailwind CSS v4
- **Composants** : shadcn/ui + Radix UI
- **Thème** : next-themes (dark/light mode)
- **Animations** : Tailwind CSS animations + Framer Motion concepts
- **Icônes** : Lucide React
- **Formulaires** : React Hook Form + Zod validation
- **TypeScript** : Support complet

## 🎨 Personnalisation

### Modifier les Couleurs

Éditez `app/globals.css` pour changer les couleurs de thème :

```css
@theme inline {
  /* Light Mode */
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-primary: #d4af37;      /* Or/Gold */
  
  /* Dark Mode */
  .dark {
    --color-background: #0a0a0a;
    --color-foreground: #ffffff;
    --color-primary: #ffd700;    /* Or brillant */
  }
}
```

### Ajouter des Produits

Modifiez les données dans les composants concernés :
- `app/page.tsx` - Produits homepage
- `app/shop/page.tsx` - Produits boutique
- `components/product-grid.tsx` - Structure produit

### Modifier les Polices

Éditez `app/layout.tsx` et `app/globals.css` :

```tsx
// layout.tsx
import { Inter, Bebas_Neue } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Crée le build de production
npm run start        # Lance le serveur de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
```

## 🚀 Déploiement

### Vercel (Recommandé)

Le moyen le plus simple de déployer votre application Next.js :

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet GitHub/GitLab
3. Vercel détecte automatiquement Next.js et configure tout
4. Votre site est en ligne !

### Autres Plateformes

Le projet peut aussi être déployé sur :
- Netlify
- Railway
- AWS Amplify
- Tout hébergeur supportant Node.js

## 📝 TODO / Améliorations Futures

- [ ] Intégration backend réel (API)
- [ ] Base de données (Supabase, PostgreSQL)
- [ ] Authentification réelle (NextAuth, Supabase Auth)
- [ ] Paiement Stripe/PayPal
- [ ] Gestion des stocks
- [ ] Emails transactionnels
- [ ] Recherche avec Algolia
- [ ] Recommandations IA
- [ ] Reviews & ratings produits
- [ ] Wishlist
- [ ] Programme de fidélité

## 🐛 Problèmes Connus

Aucun problème majeur connu pour le moment. Pour signaler un bug :
1. Vérifiez que vous utilisez Node.js 18+
2. Supprimez `node_modules` et réinstallez
3. Vérifiez la console pour les erreurs

## 📧 Support

Pour toute question ou assistance :
- Email : support@mborbusiness.com
- Site : www.mborbusiness.com

## 📄 Licence

Ce projet est sous licence privée - MBOR BUSINESS © 2025

---

**Fait avec ❤️ par l'équipe MBOR BUSINESS**

Inspiré par les meilleurs sites e-commerce du monde : Nike, Adidas, Supreme
