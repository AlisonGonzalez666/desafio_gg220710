import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTA: 're_...' es una clave de prueba. 
// Para que envíe correos reales a cualquier bandeja, debes crearte una cuenta gratis en resend.com
// y pegar aquí la API Key que ellos te den.
const resend = new Resend('re_BNjZr7Gn_NDbUUdGdjuKCbUJFg5KPXTnj')

export async function POST(req: Request) {
  try {
    // 1. Parseamos el cuerpo de la petición HTTP POST
    const { email, orderNumber, pdfBase64 } = await req.json();

    // 2. Validamos que el cliente haya enviado la información necesaria
    if (!email || !pdfBase64) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (email o pdfBase64)' }, { status: 400 });
    }

    // 3. Ejecutamos el envío del correo con el buffer/string del PDF adjunto
    await resend.emails.send({
      from: 'Mi Tienda Online <onboarding@resend.dev>', // Remitente por defecto de Resend para pruebas
      to: email, // El correo del usuario logueado en tu interfaz
      subject: `Factura Electrónica de tu Pedido #${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg">
          <h2 style="color: #2563eb;">¡Muchas gracias por tu compra!</h2>
          <p>Confirmamos que tu pedido <strong>#${orderNumber}</strong> ha sido procesado con éxito.</p>
          <p>En el archivo adjunto de este correo encontrarás tu <strong>Factura Electrónica Comercial</strong> en formato PDF.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
      `,
      attachments: [
        {
          filename: `Factura_Pedido_${orderNumber}.pdf`,
          content: pdfBase64, // Resend acepta directamente el string Base64 puro para reconstruir el archivo
        },
      ],
    });

    // 4. Respondemos con un código HTTP 200 Exitoso
    return NextResponse.json({ success: true, message: 'Factura enviada exitosamente por correo.' });
    
  } catch (error: any) {
    console.error('Error crítico en el endpoint de la API:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}