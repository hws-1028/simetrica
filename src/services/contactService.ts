// src/services/contactService.ts
// ARCHIVO AÑADIDO: Servicio para envío de formulario de contacto - 2025-10-01
// STUB: Preparado para integración con backend real en POST /api/contact

import type { ContactFormData } from '../components/ContactForm/ContactForm';

interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Envía los datos del formulario de contacto al backend
 * 
 * @param data - Datos del formulario de contacto
 * @returns Promise<ContactResponse> - Respuesta del servidor
 * 
 * NOTA: Este es un stub que debe integrarse con el backend real.
 * El endpoint sugerido es POST /api/contact
 * 
 * El backend debe:
 * - Validar y sanitizar los datos
 * - Implementar rate limiting para prevenir spam
 * - Enviar notificaciones (email, CRM, etc.)
 * - Retornar códigos HTTP apropiados (200/400/422/500)
 */
export async function sendContact(data: ContactFormData): Promise<ContactResponse> {
  // Simulación temporal para desarrollo (eliminar cuando se integre backend real)
  const isDevelopment = window.location.hostname === 'localhost';
  
  if (isDevelopment) {
    console.log('📧 Simulando envío de contacto:', data);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular respuesta exitosa (cambiar a error para probar manejo de errores)
    return { success: true, message: 'Mensaje enviado correctamente' };
  }

  // Implementación real para producción
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Añadir headers adicionales según necesidades del backend
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'X-CSRF-Token': getCsrfToken(),
    },
    body: JSON.stringify({
      // Remover honeypot antes del envío
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject?.trim(),
      phone: data.phone?.trim(),
      message: data.message.trim(),
      // Opcional: añadir metadata
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }),
  });

  // Manejo de respuestas HTTP
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Error al enviar el formulario';
    
    switch (response.status) {
      case 400:
        errorMessage = 'Datos del formulario inválidos';
        break;
      case 422:
        errorMessage = 'Por favor verifica los datos ingresados';
        break;
      case 429:
        errorMessage = 'Demasiados intentos. Intenta de nuevo más tarde';
        break;
      case 500:
        errorMessage = 'Error del servidor. Intenta de nuevo más tarde';
        break;
      default:
        errorMessage = errorText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
}