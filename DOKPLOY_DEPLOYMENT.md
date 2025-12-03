# Desplegar en Dokploy - Guía de Configuración

## Variables de Entorno Requeridas

En Dokploy, configura las siguientes variables de entorno como **Build Arguments**:

```
VITE_BASE_URL=/
VITE_API_AUTH=https://tu-api.ejemplo.com
VITE_STORAGE_KEY=tu-clave-super-secreta-de-32-caracteres-minimo
```

> [!IMPORTANT]
> Estas variables deben configurarse en Dokploy antes del despliegue, ya que se utilizan durante la construcción de la aplicación.

## Pasos para Desplegar

### 1. Crear Aplicación en Dokploy

1. Accede a tu panel de Dokploy
2. Crea una nueva aplicación de tipo **Docker**
3. Conecta tu repositorio Git

### 2. Configurar Build

En la sección de configuración:

- **Dockerfile Path**: `./Dockerfile` (o déjalo en blanco si está en la raíz)
- **Port**: `80`

### 3. Configurar Build Arguments

En la sección **Environment Variables** o **Build Args**, añade:

| Variable | Valor |
|----------|-------|
| `VITE_BASE_URL` | `/` |
| `VITE_API_AUTH` | URL de tu API backend |
| `VITE_STORAGE_KEY` | Clave secreta para encriptación |

### 4. Desplegar

1. Haz clic en **Deploy**
2. Dokploy construirá la imagen usando el Dockerfile optimizado
3. Una vez completado, la aplicación estará disponible en la URL asignada

## Características del Dockerfile Optimizado

✅ **Multi-stage build** - Imagen final más ligera (~50MB vs ~1GB)  
✅ **Cache optimizado** - Builds más rápidos usando `npm ci`  
✅ **Variables de entorno** - Build args para configuración de Vite  
✅ **Nginx optimizado** - Configuración para SPA con Vue Router  
✅ **Compresión Gzip** - Mejor performance de carga  
✅ **Security headers** - Protección básica contra ataques  
✅ **Health check** - Monitoreo de salud del contenedor  
✅ **.dockerignore** - Contexto de build más pequeño

## Verificar el Despliegue

Una vez desplegado, verifica:

1. **Aplicación carga**: Accede a la URL de Dokploy
2. **Routing funciona**: Navega entre páginas (no debe haber 404)
3. **API conecta**: Verifica que las llamadas al backend funcionan
4. **Health check**: Accede a `/health` para verificar el endpoint

## Troubleshooting

### Error: Variables de entorno no definidas

Si la aplicación no carga correctamente, verifica que definiste los build args en Dokploy.

### Error 404 en rutas de Vue

Revisa que el archivo `nginx.conf` esté correctamente copiado. El Dockerfile debería tener:
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### Build falla en npm ci

Asegúrate de que `package-lock.json` esté en el repositorio.
