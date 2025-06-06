# Inmobiliaria Medellín - Sitio Web Moderno

Una página web moderna y escalable para inmobiliaria en Medellín, construida con React y Express.js, con diseño cálido y funcionalidades completas de catálogo de propiedades, calculadora de valuación y contacto.

## 🚀 Funcionalidades Principales

### ✅ Completamente Implementado
- **Página de Inicio**: Hero section, propiedades destacadas, información de la empresa
- **Catálogo de Propiedades**: Grid de tarjetas con filtros por tipo y zona
- **Detalle de Propiedades**: Vista completa con imágenes, características y contacto
- **Calculadora de Valor**: Estimación automática basada en ubicación, área y características
- **Formulario de Contacto**: Validación completa con envío por email
- **Integración WhatsApp**: Botón flotante y enlaces directos
- **Diseño Responsive**: Optimizado para móviles y escritorio
- **Navegación Moderna**: Menú responsive con estados activos

### 🎨 Diseño y UX
- Inspirado en Airbnb/Notion (minimalismo funcional)
- Colores cálidos y confiables
- Animaciones suaves y transiciones
- Tipografía moderna (Inter)
- Sistema de componentes reutilizables

## 🛠 Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Wouter** para enrutamiento
- **TanStack Query** para estado del servidor
- **React Hook Form** + **Zod** para formularios
- **Lucide React** para iconos
- **Shadcn/ui** para componentes

### Backend
- **Express.js** con TypeScript
- **Drizzle ORM** para base de datos
- **Zod** para validación de datos
- **Vite** para desarrollo

### Arquitectura
- Almacenamiento en memoria (fácil migración a PostgreSQL)
- API REST con validación completa
- Separación clara frontend/backend
- Código modular y escalable

## 📊 Algoritmo de Valuación

La calculadora de valor utiliza:
- **Precios base por zona** (El Poblado, Laureles, Envigado, etc.)
- **Características de la propiedad** (habitaciones, baños, área)
- **Antigüedad y estado** del inmueble
- **Amenidades adicionales** (parqueadero, ascensor, balcón)

```typescript
// Ejemplo de cálculo
basePrice = basePriceByZone[zone] * area
adjustedPrice = basePrice * bedroomMultiplier * conditionMultiplier
finalPrice = adjustedPrice + amenitiesBonus
```

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Configuración Local
```bash
# Clonar repositorio
git clone [tu-repo-url]
cd inmobiliaria-medellin

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto se ejecutará en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
inmobiliaria-medellin/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── hooks/          # React hooks personalizados
│   │   └── lib/            # Utilidades y configuración
├── server/                 # Backend Express
│   ├── index.ts           # Servidor principal
│   ├── routes.ts          # Rutas API
│   ├── storage.ts         # Capa de datos
│   └── vite.ts           # Configuración Vite
├── shared/                # Código compartido
│   └── schema.ts         # Esquemas de datos
└── package.json
```

## 🌐 API Endpoints

### Propiedades
- `GET /api/properties` - Listar propiedades (con filtros)
- `GET /api/properties/featured` - Propiedades destacadas
- `GET /api/properties/:id` - Detalle de propiedad

### Contacto
- `POST /api/contact` - Enviar mensaje de contacto

### Valuación
- `POST /api/property-estimate` - Calcular valor (sin guardar)
- `POST /api/property-valuation` - Calcular y guardar valuación

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Opción 2: Railway
1. Conectar repositorio en railway.app
2. Configurar variables de entorno
3. Deploy automático

### Variables de Entorno (Producción)
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
SMTP_SERVER=smtp.gmail.com
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-app
```

## 📈 Próximas Funcionalidades

### Preparado para Escalar
- **Panel de Administración**: Gestión de propiedades
- **Chatbot con IA**: Atención automatizada
- **Generación de Contratos**: PDF automáticos
- **Integración Pagos**: Stripe, PayU
- **Analytics Avanzados**: Google Analytics, heatmaps
- **Blockchain**: Verificación de propiedades

### Base de Datos
El proyecto incluye esquemas completos para migrar a PostgreSQL:
```sql
-- Usuarios, Propiedades, Mensajes, Valuaciones
-- Listo para producción
```

## 🎯 Casos de Uso

1. **Visitante** navega propiedades y contacta por WhatsApp
2. **Propietario** valúa su inmueble y solicita visita
3. **Cliente potencial** filtra propiedades y envía mensaje
4. **Administrador** gestiona catálogo (próximamente)

## 📞 Soporte

Para dudas técnicas o personalizaciones:
- Email: desarrollo@inmobiliariamedellin.com
- WhatsApp: +57 300 123 4567

## 📄 Licencia

Proyecto privado - Todos los derechos reservados
Inmobiliaria Medellín © 2024