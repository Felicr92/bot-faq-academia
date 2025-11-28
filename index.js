const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// 🔑 IMPORTANTE: Aquí va tu token de Slack
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

Más info: [link de la web]`,

  certificado: `🏆 *CERTIFICADO EN LIBERTAD Y LIDERAZGO CÍVICO*

✅ Certificado formal por Cornell University
✅ Validación del Freedom Curriculum
✅ Base para unirte a la Red de Embajadores

📋 Requisito: Completar el Curso de Libertad

Este certificado abre puertas a becas, microgrants y oportunidades de liderazgo cívico.`,

  inscripcion: `📝 *¿CÓMO ME INSCRIBO?*

*Opciones de registro:*
- Página web oficial: [link]
- A través de universidades aliadas
- Organizaciones colaboradoras
- Programas comunitarios

📧 Recibirás acceso a la plataforma por email
🆓 Participación gratuita o becada (según país/aliado)

*Requisitos:*
- Mayor de 16 años
- Conexión a internet
- Disposición para aprender

¿Listo para empezar? Visita: [link]`,

  beneficios: `🎁 *BENEFICIOS DE LA RED DE EMBAJADORES*

Al completar el Curso de Libertad, accedes a:

💰 Becas académicas con universidades socias
💵 Microgrants para proyectos cívicos
🤝 Oportunidades de voluntariado
📈 Formación en libertad financiera
🌍 Eventos globales sobre libertad y democracia

*Proyectos que apoyamos:*
- Participación cívica
- Emprendimiento social
- Inclusión comunitaria
- Liderazgo juvenil`,

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
- Tu país
- Aliado institucional
- Programa de acceso

En la mayoría de los casos, la participación es GRATUITA gracias a nuestros aliados comprometidos con la educación en libertad.

📧 Consulta disponibilidad en tu región al inscribirte.`,

  requisitos: `📋 *REQUISITOS PARA PARTICIPAR*

✅ Edad: Mayor de 16 años
✅ Conexión a internet estable
✅ Computadora o dispositivo móvil
✅ Disposición para aprender de forma autónoma

❌ NO necesitas experiencia previa
❌ NO necesitas conocimientos especializados

*Perfil ideal:*
- Aprendices independientes
- Estudiantes universitarios
- Freedom Advocates
- Personas comprometidas con su comunidad`,

  demolab: `🏢 *DEMO LAB*

Demo Lab es la organización que desarrolla:
- El contenido de la Academia
- La metodología de aprendizaje
- La plataforma virtual

📢 Todas las comunicaciones se refieren a la Academia de Libertad.

Más información: [link de Demo Lab]`,

  diferencias: `⭐ *¿QUÉ NOS HACE ÚNICOS?*

✅ Incentivada: Abre puertas a becas y oportunidades reales
✅ Certificada: Por Cornell University
✅ Cinematográfica: Basada en historias reales
✅ Práctica: Conecta aprendizaje con acción inmediata
✅ Comunitaria: Red regional comprometida con libertad

No es solo teoría, es transformación en acción. 🚀`,

  contacto: `📞 *CONTACTO*

📧 Email: [email de la academia]
🌐 Web: [link]
📱 Redes sociales: [enlaces]

*Horario de atención:*
Lunes a Viernes: [horario]

¿Tienes dudas? Escríbenos y te ayudaremos con tu inscripción.`,

  ayuda: `👋 *¡Hola! Soy el Bot de la Academia de Libertad*

Puedo ayudarte con información sobre:

🎓 Academia - Qué es y cómo funciona
📚 Curso - Detalles del Curso de Libertad
🏆 Certificado - Certificación de Cornell
📝 Inscripción - Cómo registrarte
🎁 Beneficios - Becas, microgrants y más
⏱️ Duración - Cuánto tiempo toma
💰 Costo - Información de precios
📋 Requisitos - Qué necesitas

*Ejemplos de preguntas:*
- @Bot qué es la academia
- @Bot cómo me inscribo
- @Bot qué beneficios tiene
- @Bot cuánto cuesta

¡Pregúntame lo que necesites! 🚀`
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
  
  // Si no reconoce nada, muestra el menú de ayuda
  return respuestas.ayuda;
}
app.post('/slack/events', async (req, res) => {
  const body = req.body;
  
  if (body.challenge) {
    console.log('✅ Verificación de Slack exitosa');
    return res.send(body.challenge);
  }
  
  res.sendStatus(200);
  
  const event = body.event;
  
  if (event && event.type === 'app_mention' && !event.bot_id) {
    const mensajeUsuario = event.text;
    const canal = event.channel;
    
    console.log(`📩 Pregunta: ${mensajeUsuario}`);
    
    const respuesta = buscarRespuesta(mensajeUsuario);
    
    try {
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
      
      console.log('✅ Respuesta enviada');
      
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
});

app.get('/', (req, res) => {
  res.send('🤖 Bot FAQ funcionando! ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot en puerto ${PORT}`);
});
