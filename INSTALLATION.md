# 📦 Guide d'Installation Détaillé - MBOR BUSINESS STORE

## 🎯 Installation Complète Pas-à-Pas

### Méthode 1 : Téléchargement ZIP depuis v0

1. **Télécharger le projet**
   - Dans v0, cliquez sur les 3 points en haut à droite
   - Sélectionnez "Download ZIP"
   - Extrayez le fichier ZIP dans un dossier de votre choix

2. **Ouvrir un terminal**
   - **Windows** : Ouvrez PowerShell ou CMD dans le dossier
   - **Mac/Linux** : Ouvrez Terminal et naviguez vers le dossier
   ```bash
   cd chemin/vers/mbor-business-store
   ```

3. **Installer Node.js** (si pas déjà installé)
   - Téléchargez depuis [nodejs.org](https://nodejs.org)
   - Version recommandée : 18.x ou supérieure
   - Vérifiez l'installation :
   ```bash
   node --version
   npm --version
   ```

4. **Installer les dépendances**
   ```bash
   npm install
   ```
   ⏱️ Cela peut prendre 2-5 minutes

5. **Lancer le projet**
   ```bash
   npm run dev
   ```

6. **Ouvrir dans le navigateur**
   - Allez sur `http://localhost:3000`
   - Votre site est maintenant en ligne localement !

### Méthode 2 : Via shadcn CLI (Recommandé)

```bash
# Installer le projet directement avec shadcn CLI
npx v0@latest init mbor-business-store

# Naviguer dans le dossier
cd mbor-business-store

# Lancer le projet
npm run dev
```

## 🔧 Configuration Avancée

### Configurer les Variables d'Environnement

1. **Copier le fichier exemple**
   ```bash
   cp .env.example .env.local
   ```

2. **Éditer `.env.local`**
   - Ouvrez avec votre éditeur de code préféré
   - Remplissez les clés nécessaires selon vos besoins

### Intégrer une Base de Données (Optionnel)

#### Option 1 : Supabase (Gratuit, recommandé)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez les clés API dans `.env.local`
4. Créez les tables nécessaires :

```sql
-- Table produits
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sizes JSONB,
  colors JSONB,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table utilisateurs (extends Supabase auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table commandes
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  items JSONB NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Option 2 : Neon (PostgreSQL gratuit)

1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez une nouvelle base de données
3. Copiez l'URL de connexion dans `.env.local`

### Configurer les Paiements Stripe (Optionnel)

1. Créez un compte sur [stripe.com](https://stripe.com)
2. En mode test, copiez vos clés API
3. Ajoutez-les dans `.env.local`
4. Installez le package Stripe :
```bash
npm install @stripe/stripe-js stripe
```

## 🎨 Personnalisation

### Changer le Logo

1. Remplacez les fichiers dans `/public` :
   - `placeholder-logo.svg` → votre logo
   - `icon.svg` → favicon

2. Mettez à jour dans `components/navigation.tsx` :
```tsx
<Image src="/votre-logo.svg" alt="MBOR" width={120} height={40} />
```

### Modifier les Produits

Les produits sont actuellement en dur dans le code. Pour les modifier :

1. **Homepage** : Éditez `app/page.tsx`
```tsx
const featuredProducts = [
  {
    id: 1,
    name: "Votre Produit",
    price: 99.99,
    image: "/votre-image.jpg"
  }
]
```

2. **Shop** : Éditez `app/shop/page.tsx`

### Ajouter des Pages

```bash
# Créer une nouvelle page
mkdir app/contact
touch app/contact/page.tsx
```

```tsx
// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  )
}
```

## 🚀 Déploiement en Production

### Sur Vercel (Le plus simple)

1. **Préparer votre code**
   ```bash
   # Créer un repo Git
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Pousser sur GitHub**
   - Créez un nouveau repo sur GitHub
   - Suivez les instructions pour pousser votre code

3. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez "Import Project"
   - Sélectionnez votre repo GitHub
   - Vercel détecte Next.js automatiquement
   - Ajoutez vos variables d'environnement
   - Cliquez "Deploy"

4. **Votre site est en ligne !** 🎉
   - URL automatique : `mbor-business-store.vercel.app`
   - Configurez un domaine personnalisé si vous voulez

### Sur Netlify

1. **Build le projet**
   ```bash
   npm run build
   ```

2. **Déployer**
   - Allez sur [netlify.com](https://netlify.com)
   - Glissez-déposez le dossier `.next`
   - Ou connectez votre repo GitHub

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas

```bash
# Supprimer les modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreurs de build

```bash
# Vérifier la version de Node
node --version  # Doit être 18+

# Nettoyer le cache Next.js
rm -rf .next
npm run dev
```

### Images ne s'affichent pas

- Vérifiez que les images sont dans `/public`
- Utilisez le chemin `/nom-image.jpg` (pas `./public/`)

### Thème dark/light ne fonctionne pas

- Vérifiez que `ThemeProvider` est dans `layout.tsx`
- Effacez le localStorage du navigateur
- Rafraîchissez la page

## 📞 Support

**Besoin d'aide ?**
- 📧 Email : support@mborbusiness.com
- 📚 Documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
- 💬 Discord shadcn/ui : [discord.gg/shadcn](https://discord.gg/shadcn)

## ✅ Checklist Avant de Déployer

- [ ] Toutes les images sont optimisées
- [ ] Variables d'environnement configurées
- [ ] Build fonctionne sans erreurs (`npm run build`)
- [ ] Tests de navigation sur mobile
- [ ] Thème dark/light fonctionne
- [ ] Formulaires validés
- [ ] SEO configuré (metadata dans pages)
- [ ] Analytics ajouté
- [ ] Domaine personnalisé configuré

---

**Bon développement ! 🚀**
