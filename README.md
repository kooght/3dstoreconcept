# 3D Store Concept

Boutique de pièces auto imprimées en 3D + admin produits.

## Démo en ligne

- Site : [https://kooght.github.io/3dstoreconcept/](https://kooght.github.io/3dstoreconcept/)
- Admin (tableau classable) : [https://kooght.github.io/3dstoreconcept/admin/products/](https://kooght.github.io/3dstoreconcept/admin/products/)

## Démarrage local

```bash
npm install
npm run db:seed
npm run dev
```

- Boutique : [http://localhost:3000](http://localhost:3000)
- Admin produits : [http://localhost:3000/admin/products](http://localhost:3000/admin/products)

## Tableau produits classable

Sur `/admin/products`, cliquez sur les en-têtes **Produit**, **Boutiques**, **Prix (€)** ou **Statut** pour trier.

## Déploiement

Déploiement GitHub Pages (branche `main`, dossier `/`) via GitHub Actions à chaque push sur le code source.
