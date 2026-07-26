#  Tienda Online con Facturación PDF y Envío por Correo

Este proyecto es una aplicación de E-commerce desarrollada con Next.js. Permite a los usuarios registrarse (simulado con LocalStorage), agregar productos a un carrito de compras, generar una factura electrónica en PDF al finalizar la compra y enviarla automáticamente al correo del usuario mediante la API de Resend.

## Características Principales
- **Autenticación Simulada:** Registro e inicio de sesión utilizando `localStorage`.
- **Gestión de Estado:** Manejo del carrito de compras (agregar, eliminar, modificar cantidades) persistente en el cliente.
- **Generación de PDF:** Creación dinámica de facturas comerciales utilizando `jsPDF` y `jspdf-autotable`.
- **Notificaciones UI:** Alertas interactivas con `SweetAlert2`.
- **Backend Integrado:** Uso de Next.js API Routes (`/api/send-invoice`) para procesar el envío de correos asíncronamente.
- **Envío de Emails:** Integración con la plataforma `Resend` para despachar los archivos PDF adjuntos.

 # Tecnologias Utilizadas
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Generación PDF:** `jspdf` y `jspdf-autotable`
- **Alertas:** `sweetalert2`
- **Manejo de Correos:** `resend`

---

## Requisitos Previos


1. [Node.js](https://nodejs.org/) instalado en tu computadora (versión 16.x o superior).
2. Una cuenta activa en [Resend](https://resend.com/) y una **API Key** generada.

---

##  Instalación y Configuración Local


1. **Clonar el repositorio** (Si lo tienes en GitHub):
   \`\`\`bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
   \`\`\`

2. **Instalar las dependencias del proyecto:**

   \`\`\`bash
   npm install
   npm install sweetalert2 jspdf jspdf-autotable resend
   \`\`\`

3. **Configurar las Variables de Entorno (Recomendado):**
  
   \`\`\`env
   RESEND_API_KEY=re_AQUI_VA_TU_CLAVE_DE_RESEND
   \`\`\`


4. **Iniciar el servidor de desarrollo:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Abrir la aplicación:**
   Abre su navegador [http://localhost:3000](http://localhost:3000). 
   *

