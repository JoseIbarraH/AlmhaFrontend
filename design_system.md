# Sistema de Diseño - Paleta de Colores

Este documento detalla los códigos de color utilizados en la aplicación, específicamente para la implementación del **Modo Claro** y **Modo Oscuro**.

La aplicación utiliza la paleta de colores estándar de **Tailwind CSS**.

## Colores Primarios (Acciones / Énfasis)
Se utiliza la escala de **Azul (Blue)** para elementos interactivos y de énfasis.

| Uso | Modo Claro (Light) | Modo Oscuro (Dark) |
| :--- | :--- | :--- |
| **Botones Primarios** | `bg-blue-600` (Hover: `bg-blue-700`) | `bg-blue-600` (Hover: `bg-blue-700`) |
| **Focus Rings** | `ring-blue-500` | `ring-blue-600` |
| **Switches (Activos)** | `bg-blue-600` | `bg-blue-600` |

## Escala de Grises (Superficies y Textos)
Se utiliza la escala de **Gris (Gray - Cool Gray)** para la estructura, fondos y tipografía.

### Fondos (Backgrounds)

| Elemento | Modo Claro (Light) | Modo Oscuro (Dark) |
| :--- | :--- | :--- |
| **Fondo General** | `bg-gray-50` / Default | `bg-gray-900` |
| **Tarjetas (Cards)** | `bg-white` | `bg-gray-800` |
| **Inputs/Campos** | `bg-white` | `bg-gray-900` |
| **Dropdowns/Modales** | `bg-white` | `bg-gray-800` |

### Bordes (Borders)

| Elemento | Modo Claro (Light) | Modo Oscuro (Dark) |
| :--- | :--- | :--- |
| **Separadores** | `border-gray-200` | `border-gray-700` |
| **Bordes de Inputs** | `border-gray-300` | `border-gray-600` / `border-gray-700` |

### Texto (Typography)

| Jerarquía | Modo Claro (Light) | Modo Oscuro (Dark) |
| :--- | :--- | :--- |
| **Títulos (H1, H2)** | `text-gray-900` | `text-white` / `text-gray-100` |
| **Subtítulos** | `text-gray-600` | `text-gray-400` |
| **Cuerpo / Labels** | `text-gray-700` | `text-gray-200` / `text-gray-300` |
| **Placeholders** | Default (Gray-400) | `placeholder-gray-500` |
| **Iconos** | `text-gray-400` | `text-gray-500` |

## Mapeo de Clases Tailwind

A continuación se muestra una guía rápida de conversión usada en los componentes:

```css
/* Contenedores Principales */
.main-container {
  @apply bg-gray-50 dark:bg-gray-900;
}

/* Tarjetas */
.card {
  @apply bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700;
}

/* Textos */
.heading {
  @apply text-gray-900 dark:text-gray-100;
}
.subheading {
  @apply text-gray-600 dark:text-gray-400;
}
.body-text {
  @apply text-gray-700 dark:text-gray-300;
}

/* Inputs */
.input {
  @apply bg-white dark:bg-gray-900 
         border-gray-300 dark:border-gray-600 
         text-gray-900 dark:text-gray-100;
}
```
