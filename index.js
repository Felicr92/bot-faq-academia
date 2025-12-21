const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

const respuestas = {
  // INFORMACIÓN GENERAL
  academia: `🎓 *¿QUÉ ES LA ACADEMIA DE LIBERTAD?*

La Academia de Libertad es una plataforma de educación en libertad que transforma el conocimiento cívico en acción.

📚 *Tres pilares:*
1️⃣ Curso de Libertad (15 horas, certificado por Cornell University)
2️⃣ Red de Embajadores de Libertad
3️⃣ Programa de Libertad y Comunidad

🌐 Totalmente virtual y asincrónica
💡 Aprende a tu propio ritmo

¿Quieres saber más? Pregúntame sobre el curso, certificación o beneficios.`,

  curso: `📖 *CURSO DE LIBERTAD*

Un recorrido cinematográfico de 15 horas certificado por Cornell University.

📚 *7 Principios de Libertad:*
1. Libertad política y participación
2. Derechos de propiedad
3. Libertad de expresión
4. Gobierno limitado
5. Estado de derecho
6. Relaciones voluntarias
7. Gobierno por consentimiento

🎬 Basado en historias reales
💭 Pensamiento crítico
🎯 Aplicación práctica

Más info: https://freedomacademy.mykajabi.com/`,

  certificado: `🏆 *CERTIFICADO EN LIBERTAD Y LIDERAZGO CÍVICO*

✅ Certificado formal por Cornell University
✅ Validación del Freedom Curriculum
✅ Base para unirte a la Red de Embajadores

📋 Requisito: Completar el Curso de Libertad

Este certificado abre puertas a becas, microgrants y oportunidades de liderazgo cívico.`,

  inscripcion: `📝 *¿CÓMO ME INSCRIBO?*

*Opciones de registro:*
• Página web oficial: https://freedomacademy.mykajabi.com/
• A través de universidades aliadas
• Organizaciones colaboradoras
• Programas comunitarios

📧 Recibirás acceso a la plataforma por email
🆓 Participación gratuita o becada (según país/aliado)

*Requisitos:*
• Mayor de 16 años
• Conexión a internet
• Disposición para aprender

¿Listo para empezar? Visita: https://freedomacademy.mykajabi.com/`,

  beneficios: `🎁 *BENEFICIOS DE LA RED DE EMBAJADORES*

Al completar el Curso de Libertad, accedes a:

💰 Becas académicas con universidades socias
💵 Microgrants para proyectos cívicos
🤝 Oportunidades de voluntariado
📈 Formación en libertad financiera
🌍 Eventos globales sobre libertad y democracia

*Proyectos que apoyamos:*
• Participación cívica
• Emprendimiento social
• Inclusión comunitaria
• Liderazgo juvenil`,

  duracion: `⏱️ *DURACIÓN DEL PROGRAMA*

📚 Curso de Libertad: 15 horas de contenido
⏰ A tu propio ritmo (asincrónico)
📅 Promedio: 6-8 semanas para completar

*Modalidad:*
✅ 100% virtual
✅ Sin horarios fijos
✅ Fechas límite flexibles para módulos

💡 Ocasionalmente hay encuentros virtuales opcionales para profundizar temas.`,

  costo: `💰 *COSTO DE PARTICIPACIÓN*

🆓 *Gratis o altamente becado*

Depende de:
• Tu país
• Aliado institucional
• Programa de acceso

En la mayoría de los casos, la participación es GRATUITA gracias a nuestros aliados comprometidos con la educación en libertad.

📧 Consulta disponibilidad en tu región al inscribirte en: https://freedomacademy.mykajabi.com/`,

  requisitos: `📋 *REQUISITOS PARA PARTICIPAR*

✅ Edad: Mayor de 16 años
✅ Conexión a internet estable
✅ Computadora o dispositivo móvil
✅ Disposición para aprender de forma autónoma

❌ NO necesitas experiencia previa
❌ NO necesitas conocimientos especializados

*Perfil ideal:*
• Aprendices independientes
• Estudiantes universitarios
• Freedom Advocates
• Personas comprometidas con su comunidad`,

  demolab: `🏢 *DEMO LAB*

Demo Lab es la organización que desarrolla:
• El contenido de la Academia
• La metodología de aprendizaje
• La plataforma virtual

📢 Todas las comunicaciones se refieren a la Academia de Libertad.

📧 Contacto: elena@demolabcr.org
📱 Instagram: https://www.instagram.com/academiadelibertad/`,

  diferencias: `⭐ *¿QUÉ NOS HACE ÚNICOS?*

✅ Incentivada: Abre puertas a becas y oportunidades reales
✅ Certificada: Por Cornell University
✅ Cinematográfica: Basada en historias reales
✅ Práctica: Conecta aprendizaje con acción inmediata
✅ Comunitaria: Red regional comprometida con libertad

No es solo teoría, es transformación en acción. 🚀`,

  contacto: `📞 *CONTACTO*

📧 Email: elena@demolabcr.org
🌐 Web: https://freedomacademy.mykajabi.com/
📱 Instagram: https://www.instagram.com/academiadelibertad/

*¿Tienes dudas?* 
Escríbenos y te ayudaremos con tu inscripción.`,

  ayuda: `👋 *¡Hola! Soy el Bot de la Academia de Libertad*

Puedo ayudarte con información sobre:

🎓 Academia - Qué es y cómo funciona
📚 Curso - Detalles del Curso de Libertad
🏆 Certificado - Certificación de Cornell
📝 Inscripción - Cómo registrarte
🎁 Beneficios - Becas, microgrants y más
⏱️ Duración - Cuánto tiempo toma
💰 Costo - Información de precios
📋 Requisitos - Quién puede participar

*Ejemplos de preguntas:*
• @Bot qué es la academia
• @Bot cómo me inscribo
• @Bot qué beneficios tiene

¡Pregúntame lo que necesites! 🚀`,

  noentendido: `🤔 *No estoy seguro de qué necesitas*

Puedo ayudarte con información sobre:

📚 *Temas principales:*
• Academia - Qué es la Academia de Libertad
• Curso - Detalles del Curso de Libertad  
• Certificado - Certificación Cornell
• Inscripción - Cómo registrarte
• Beneficios - Becas y oportunidades
• Costo - Información de precios
• Requisitos - Quién puede participar
• Duración - Cuánto tiempo toma

*Ejemplo de preguntas:*
"@Bot qué es la academia"
"@Bot cómo me inscribo"
"@Bot cuánto cuesta"

💬 *¿Necesitas ayuda más específica?*
Contacta a nuestros asesores:
📧 elena@demolabcr.org
📱 Instagram: https://www.instagram.com/academiadelibertad/
🌐 https://freedomacademy.mykajabi.com/`
};

function buscarRespuesta(mensaje) {
  const msg = mensaje.toLowerCase();
  
  // Academia de Libertad / Qué es
  if (msg.includes('academia') || msg.includes('que es') || msg.includes('qué es') || 
      msg.includes('pilares') || msg.includes('iniciativas')) {
    return respuestas.academia;
  }
  
  // Curso de Libertad
  if (msg.includes('curso') || msg.includes('principios') || msg.includes('contenido') ||
      msg.includes('temas') || msg.includes('curriculum')) {
    return respuestas.curso;
  }
  
  // Certificado
  if (msg.includes('certificado') || msg.includes('certificacion') || msg.includes('cornell') ||
      msg.includes('titulo')) {
    return respuestas.certificado;
  }
  
  // Inscripción
  if (msg.includes('inscri') || msg.includes('registro') || msg.includes('como me registro') ||
      msg.includes('aplicar') || msg.includes('unirme')) {
    return respuestas.inscripcion;
  }
  
  // Beneficios
  if (msg.includes('beneficio') || msg.includes('beca') || msg.includes('microgrant') ||
      msg.includes('oportunidad') || msg.includes('embajador')) {
    return respuestas.beneficios;
  }
  
  // Duración
  if (msg.includes('duracion') || msg.includes('duración') || msg.includes('cuanto dura') ||
      msg.includes('cuánto dura') || msg.includes('tiempo') || msg.includes('horario')) {
    return respuestas.duracion;
  }
  
  // Costo
  if (msg.includes('costo') || msg.includes('precio') || msg.includes('gratis') ||
      msg.includes('pagar') || msg.includes('cuanto cuesta') || msg.includes('cuánto cuesta')) {
    return respuestas.costo;
  }
  
  // Requisitos
  if (msg.includes('requisito') || msg.includes('necesito') || msg.includes('quien puede') ||
      msg.includes('quién puede') || msg.includes('participar')) {
    return respuestas.requisitos;
  }
  
  // Demo Lab
  if (msg.includes('demo lab') || msg.includes('demolab') || msg.includes('quien desarrollo') ||
      msg.includes('quién desarrolló')) {
    return respuestas.demolab;
  }
  
  // Diferencias
  if (msg.includes('diferencia') || msg.includes('unico') || msg.includes('único') ||
      msg.includes('por que') || msg.includes('por qué')) {
    return respuestas.diferencias;
  }
  
  // Contacto
  if (msg.includes('contacto') || msg.includes('email') || msg.includes('telefono') ||
      msg.includes('escribir')) {
    return respuestas.contacto;
  }
  
  // Ayuda por defecto
  if (msg.includes('ayuda') || msg.includes('help') || msg.includes('hola')) {
    return respuestas.ayuda;
  }
  
  // Si no reconoce nada, muestra mensaje personalizado con menú y contacto
  return respuestas.noentendido;
}

// Ruta de verificación
app.get('/', (req, res) => {
  res.send('🤖 Bot FAQ funcionando! ✅');
});

// Endpoint para eventos de Slack
app.post('/slack/events', async (req, res) => {
  const event = req.body;

  // Verificación de URL de Slack
  if (event.type === 'url_verification') {
    return res.send({ challenge: event.challenge });
  }

  // Procesar menciones al bot
  if (event.event && event.event.type === 'app_mention') {
    const mensaje = event.event.text;
    const canal = event.event.channel;

    const respuesta = buscarRespuesta(mensaje);

    // Enviar respuesta a Slack
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: canal,
        text: respuesta
      })
    });
  }

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot funcionando en puerto ${PORT}`);
});
