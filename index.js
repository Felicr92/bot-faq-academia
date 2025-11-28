const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// 🔑 IMPORTANTE: Aquí va tu token de Slack
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

// 📚 BASE DE CONOCIMIENTOS - Academia de Libertad
const respuestas = {
  que_es: `🎓 *¿QUÉ ES LA ACADEMIA DE LIBERTAD?*

La Academia de Libertad es una plataforma incentivada de educación en libertad que transforma el conocimiento cívico en acción. 

A través de tres pilares principales:
- Curso de Libertad (certificado por Cornell University)
- Red de Embajadores de Libertad
- Programa de Libertad y Comunidad

Acompañamos a personas que desean comprender, defender y promover la Libertad y Democracia en sus comunidades.`,

  iniciativas: `🌟 *INICIATIVAS DE LA ACADEMIA*

La Academia se basa en tres pilares:

1️⃣ *Curso de Libertad*
Experiencia cinematográfica de 15 horas, certificada por Cornell University, que introduce a los Principios de Libertad.

2️⃣ *Red de Embajadores de Libertad*
Comunidad de graduados con acceso a becas, microgrants, mentorías y oportunidades de liderazgo cívico.

3️⃣ *Programa de Libertad y Comunidad*
Iniciativas presenciales que llevan la educación cívica a espacios deportivos, culturales y comunitarios.`,

  modalidad: `💻 *MODALIDAD DEL PROGRAMA*

La Academia de Libertad es *totalmente virtual y asincrónica*.

Puedes avanzar a tu propio ritmo, en el horario que prefieras. No hay clases fijas.

📅 Ocasionalmente hay encuentros virtuales sincrónicos opcionales para profundizar temas y conectar con otros participantes.

⏱️ Duración promedio: 6-8 semanas (dependiendo de tu ritmo)`,

  curso: `🎬 *CURSO DE LIBERTAD*

Es un recorrido cinematográfico de *15 horas*, certificado por Cornell University, que combina:
- Historias reales de Freedom Advocates
- Diálogo socrático
- Pensamiento crítico
- Aplicación cívica en contextos reales

*Basado en 7 Principios de Libertad:*
1. Libertad política y participación
2. Derechos de propiedad y autonomía personal
3. Libertad de expresión
4. Gobierno limitado y separación de poderes
5. Estado de derecho
6. Relaciones y asociaciones voluntarias
7. Gobierno por consentimiento y representación`,

  certificado: `📜 *CERTIFICADO EN LIBERTAD Y LIDERAZGO CÍVICO*

Al completar el Curso de Libertad, recibes un certificado formal otorgado y certificado por *Cornell University*.

Este certificado valida que:
✅ Dominas el Freedom Curriculum
✅ Tienes las bases para continuar tu liderazgo cívico
✅ Puedes unirte a la Red de Embajadores de Libertad`,

  participar: `👥 *¿QUIÉNES PUEDEN PARTICIPAR?*

La Academia está diseñada para:
- Aprendices independientes *mayores de 16 años*
- Participantes de universidades y centros educativos aliados
- Freedom Advocates que amplifican mensajes de libertad
- Personas afiliadas a organizaciones colaboradoras

*No necesitas experiencia previa* - solo interés en comprender y defender la libertad.`,

  beneficios: `🎁 *BENEFICIOS DE LA RED DE EMBAJADORES*

Al completar el Curso de Libertad, puedes aplicar a:
- 💰 Becas académicas con socios universitarios
- 🚀 Microgrants para proyectos cívicos
- 🤝 Oportunidades de voluntariado
- 📈 Formación en libertad financiera y emprendimiento
- 🌍 Participación en eventos globales sobre libertad y democracia`,

  microgrants: `💡 *MICROGRANTS*

Los microgrants apoyan iniciativas que promueven:
- Participación cívica
- Innovación y emprendimiento social
- Inclusión comunitaria
- Liderazgo juvenil

Son fondos para convertir tu aprendizaje en *acción real* en tu comunidad.`,

  costo: `💵 *¿TIENE COSTO?*

Depende del país, aliado o programa de acceso.

En la mayoría de los casos, gracias a aliados institucionales, la participación es *gratuita o está altamente becada*.

🎓 No hay barreras económicas para participar.`,

  diferencia: `⭐ *¿QUÉ NOS DIFERENCIA?*

- *Es incentivada:* el aprendizaje abre puertas reales a becas y microgrants
- *Certificada* por Cornell University
- *Cinematográfica,* basada en historias reales
- *Práctica,* conectando aprendizaje con acción inmediata
- *Comunitaria,* forma una red regional comprometida con Libertad y Democracia`,

  inscripcion: `📝 *¿CÓMO ME INSCRIBO?*

Puedes registrarte a través de:
- Página web oficial de la Academia de Libertad
- Aliados universitarios
- Organizaciones colaboradoras
- Programas comunitarios

Una vez inscrito, recibirás acceso a la plataforma virtual y las instrucciones por correo electrónico.

¿Necesitas el enlace específico? Contáctanos.`,

  requisitos: `🔧 *REQUISITOS TÉCNICOS*

Solo necesitas:
- ✅ Conexión a internet
- ✅ Computadora o dispositivo móvil
- ✅ Disposición para aprender de forma autónoma
- ✅ Ser mayor de 16 años

¡Eso es todo!`,

  ayuda: `👋 *¡Hola! Soy el Asistente de la Academia de Libertad*

Puedo ayudarte con información sobre:

📚 *Sobre la Academia*
- ¿Qué es? → pregunta sobre "qué es academia"
- Iniciativas → pregunta sobre "iniciativas" o "pilares"
- ¿Qué nos diferencia? → pregunta "diferencia" o "único"

🎓 *Curso y Certificado*
- Curso de Libertad → pregunta "curso"
- Certificado → pregunta "certificado"
- Modalidad → pregunta "virtual" o "modalidad"

💰 *Beneficios*
- Red de Embajadores → pregunta "beneficios" o "embajadores"
- Microgrants → pregunta "microgrants" o "proyectos"
- Costo → pregunta "costo" o "gratis"

📝 *Participación*
- ¿Quiénes pueden? → pregunta "participar" o "requisitos"
- Inscripción → pregunta "inscribir" o "registro"

*Ejemplos:*
- @Bot FAQ qué es la academia
- @Bot FAQ cómo me inscribo
- @Bot FAQ cuáles son los beneficios

¡Pregúntame lo que necesites! 🚀`
};

function buscarRespuesta(mensaje) {
  const msg = mensaje.toLowerCase();
  
  if (msg.includes('horario') || msg.includes('hora') || msg.includes('abierto')) {
    return respuestas.horarios;
  }
  
  if (msg.includes('pago') || msg.includes('costo') || msg.includes('precio') || 
      msg.includes('cuanto') || msg.includes('mensualidad')) {
    return respuestas.pagos;
  }
  
  if (msg.includes('inscri') || msg.includes('matricul') || msg.includes('como me inscribo')) {
    return respuestas.inscripcion;
  }
  
  if (msg.includes('curso') || msg.includes('programa') || msg.includes('clases')) {
    return respuestas.cursos;
  }
  
  if (msg.includes('contacto') || msg.includes('telefono') || msg.includes('email') || 
      msg.includes('direccion') || msg.includes('ubicacion')) {
    return respuestas.contacto;
  }
  
  if (msg.includes('ayuda') || msg.includes('help')) {
    return respuestas.ayuda;
  }
  
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
