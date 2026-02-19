# OpiTech - Catálogo de Productos

Demo de catálogo de productos desarrollado como prueba técnica.

## 🌐 Demo

https://ericko15.github.io/opitech-test/#/

## 🚀 Tecnologías

- **Vue 3** - Framework UI con Composition API
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Pinia** - State management
- **Vue Router** - Enrutamiento
- **Tailwind CSS v4** - Estilos

## 🛠️ Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Verificar tipos
pnpm typecheck
```

## 🧪 Tests

Los tests usan **Vitest** con **@vue/test-utils** para testing de componentes.

```bash
# Ejecutar tests en watch mode
pnpm test

# Ejecutar tests una vez
pnpm test:run

# Ejecutar tests con coverage
pnpm test:coverage
```

### Cobertura

- **Servicios**: productService (API, caché)
- **Stores**: products (estado y getters)
- **Config**: env (variables de entorno)
- **Directives**: clickOutside
- **Componentes UI**: ErrorBanner, PaginationNav, SearchInput, CategorySelect, ProductCard
- **Componentes**: ProductGrid, ProductFilters

### Archivos de test

Los archivos de test usan la nomenclatura `.spec.ts` y se encuentran junto a los archivos que:

```
src/
├── components/
│   ├── products/
│   │   ├── ProductFilters.spec.ts
│   │   └── ProductGrid.spec.ts
│   └── ui/
│       ├── CategorySelect.spec.ts
│       ├── ErrorBanner.spec.ts
│       ├── PaginationNav.spec.ts
│       ├── ProductCard.spec.ts
│       └── SearchInput.spec.ts
├── config/
│   └── env.spec.ts
├── directives/
│   └── clickOutside.spec.ts
├── services/
│   └── productService.spec.ts
└── stores/
    └── products.spec.ts
```

## 🔧 Variables de Entorno

| Variable            | Descripción        | Valor por defecto       |
| ------------------- | ------------------ | ----------------------- |
| `VITE_API_BASE_URL` | URL base de la API | `https://dummyjson.com` |

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── products/        # Componentes específicos del dominio
│   │   ├── ProductFilters.vue
│   │   └── ProductGrid.vue
│   └── ui/              # Componentes reutilizables
│       ├── CategorySelect.vue
│       ├── ErrorBanner.vue
│       ├── PaginationNav.vue
│       ├── ProductCard.vue
│       └── SearchInput.vue
├── composables/
│   └── useProducts.ts  # Lógica de fetching
├── directives/
│   └── clickOutside.ts # Directiva personalizada
├── services/
│   └── productService.ts # API layer
├── stores/
│   └── products.ts      # Estado de Pinia
├── types/
│   └── product.ts       # Tipos de TypeScript
└── views/
    ├── ProductDetail.vue
    └── ProductList.vue
```

## 📋 Decisiones Técnicas

### Separación de responsabilidades

- **Service** (`productService.ts`): Manejo de API y caché
- **Store** (`products.ts`): Estado reactivo (solo datos, sin lógica de fetching)
- **Composable** (`useProducts.ts`): Lógica de fetching + manejo de errores/loading
- **Componentes**: UI pura

### Componentes enfocados

- `ProductList` es una **composition surface** - delega UI a componentes hijos
- `ProductFilters`: maneja filtros y debounce de búsqueda
- `ProductGrid`: maneja lista de productos y skeleton
- UI components son reutilizables y genéricos

### Patrones usados

- **Props down, events up**: Comunicación entre componentes
- **`defineModel`**: v-model nativo en componentes
- **Skeleton loading**: Mejora UX durante carga
- **Debounce**: Evita múltiples peticiones durante búsqueda

### Enfoque de testing

- Tests unitarios con Vitest + @vue/test-utils
- Mocking de dependencias externas (API, setTimeout)
- Tests de componentes focuseados en comportamiento, no implementación
- Coverage mínimo de 80% en código testeable

### Estilo

- Tailwind CSS v4 con `@theme` para tokens personalizados
- Diseño basado en la identidad visual de OpiTech (color primario #673ab7)
- UI limpia con cards clickeables, inputs redondeados, etc.

## 🔗 API

Demo usando [DummyJSON](https://dummyjson.com/docs/products) como fuente de datos.

## 🚀 Despliegue

El proyecto usa **GitHub Actions** para CI/CD y desplegar automáticamente a **GitHub Pages**.

### Workflow

El workflow (`.github/workflows/deploy.yml`) corre en cada push a `main`:

1. **Lint** - Verifica código con ESLint
2. **Test** - Ejecuta tests con Vitest y coverage (mínimo 80%)
3. **Build** - Compila la app para producción
4. **Deploy** - Despliega a GitHub Pages (solo si los pasos anteriores pasan)

## 🌐 Ver Proyecto

https://ericko15.github.io/opitech-test/#/
