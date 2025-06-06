document.addEventListener('DOMContentLoaded', () => {
    const WEBHOOK_URL = 'https://n8n.smarteco.com.ar/webhook-test/area_tecnica';
    const chatContainer = document.getElementById('chatContainer');
    const inputEl       = document.getElementById('chatInput');
    const sendBtn       = document.getElementById('sendBtn');
    const micBtn        = document.getElementById('micBtn');
  
    let mediaRecorder, audioChunks = [];
  
    function addMessage(content, who, { type = 'text' } = {}) {
      const msg = document.createElement('div');
      msg.classList.add('message', who);
      if (type === 'audio') {
        msg.classList.add('audio');
        msg.innerHTML = `<audio controls src="${content}"></audio>`;
      } else {
        msg.innerHTML = `
          ${content}
          <span class="timestamp">
            ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
          </span>
        `;
      }
      if (who === 'user') {
        const receipt = document.createElement('i');
        receipt.className = 'fas fa-check receipt';
        msg.appendChild(receipt);
      }
      chatContainer.appendChild(msg);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      return msg;
    }
  
    function showTyping() {
      const indicator = document.createElement('div');
      indicator.className = 'typing-indicator bot';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        indicator.appendChild(dot);
      }
      chatContainer.appendChild(indicator);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      return indicator;
    }
  
    async function sendToWebhook(payload) {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Status ' + res.status);
      return res.json();
    }
  
    async function sendText() {
      const text = inputEl.value.trim();
      if (!text) return;
      const userMsgEl = addMessage(text, 'user');
      inputEl.value = '';
  
      const typingEl = showTyping();
      try {
        const data = await sendToWebhook({ type:'text', text });
        typingEl.remove();
        if (data.audioUrl) {
          addMessage(data.audioUrl, 'bot', { type:'audio' });
        } else if (data.text) {
          addMessage(data.text, 'bot');
        }
      } catch (err) {
        typingEl.remove();
        addMessage('❌ Error al conectar con el bot', 'bot');
      }
  
      setTimeout(() => {
        const rc = userMsgEl.querySelector('.receipt');
        if (rc) {
          rc.className = 'fas fa-check-double receipt';
          rc.style.color = '#4fc3f7';
        }
      }, 500);
    }
  
    sendBtn.addEventListener('click', sendText);
    inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') sendText(); });
  
    micBtn.addEventListener('click', async () => {
      if (!mediaRecorder) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const blob = new Blob(audioChunks);
          audioChunks = [];
          const url = URL.createObjectURL(blob);
          addMessage(url, 'user', { type:'audio' });
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              await sendToWebhook({ type:'audio', audio: reader.result });
            } catch {
              addMessage('❌ Error al enviar audio', 'bot');
            }
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorder.start();
        micBtn.innerHTML = '<i class="fa-solid fa-stop text-danger"></i>';
      } else {
        mediaRecorder.stop();
        mediaRecorder = null;
        micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      }
    });
  
    // Mensaje inicial
    addMessage('Hola, buenos días. ¿En qué puedo ayudarte?', 'bot');
  });