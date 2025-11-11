const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// 🔑 IMPORTANTE: Aquí va tu token de Slack
const SLACK_BOT_TOKEN = 'xoxb-9492187289028-9881197737011-fTVcwqx1r8nygnvOWwJccFad';

// 📚 BASE DE CONOCIMIENTOS - Personaliza con tu información
const respuestas = {
  horarios: `📅 *HORARIOS DE LA ACADEMIA*

🕐 Lunes a Viernes: 7:00 AM - 9:00 PM
🕐 Sábados: 8:00 AM - 2:00 PM  
🕐 Domingos: Cerrado

📍 ¿Necesitas más información? Mencióname de nuevo.`,

  pagos: `💵 *INFORMACIÓN DE PAGOS*

💰 Mensualidad: $100
📝 Matrícula (pago único): $50

*Formas de pago:*
- SINPE Móvil: 8888-8888
- Transferencia: CR00000000000000
- Tarjeta en oficina
- Efectivo en oficina

📅 Fecha límite: Primeros 5 días del mes

💬 Dudas: pagos@tuacademia.com`,

  inscripcion: `📝 *PROCESO DE INSCRIPCIÓN*

*Pasos:*
1️⃣ Formulario: www.tuacademia.com/inscripcion
2️⃣ Documentos:
   • Copia de cédula
   • 1 foto tamaño pasaporte
   • Comprobante de pago
3️⃣ Envía a: inscripciones@tuacademia.com
4️⃣ Confirmación en 24-48 horas

📞 Dudas: 2222-2222`,

  cursos: `📚 *CURSOS DISPONIBLES*

*Idiomas:*
- Inglés: Básico, Intermedio, Avanzado
- Francés: Básico

*Tecnología:*
- Programación Python
- Desarrollo Web
- Excel Avanzado

*Negocios:*
- Marketing Digital
- Diseño Gráfico

📋 Más info: www.tuacademia.com/cursos`,

  contacto: `📞 *CONTACTO*

📧 info@tuacademia.com
📱 WhatsApp: +506 8888-8888
☎️ 2222-2222

🏢 San José, Costa Rica
[Tu dirección]

🕐 Lunes a Viernes 8AM-5PM`,

  ayuda: `👋 *¡Hola! Soy el Bot de la Academia*

Puedo ayudarte con:
📅 Horarios
💵 Pagos
📝 Inscripciones  
📚 Cursos
📞 Contacto

*Ejemplos:*
@Bot FAQ horarios
@Bot FAQ cuánto cuesta
@Bot FAQ cómo me inscribo

¡Pregúntame! 🚀`
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
