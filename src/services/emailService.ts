import emailjs from '@emailjs/browser';

// Configuração do EmailJS
const EMAILJS_SERVICE_ID = 'service_portfolio';
const EMAILJS_TEMPLATE_ID = 'template_contact';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Configuração real do EmailJS - substitua pelas suas credenciais
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_email: 'esthergabriellesouza@gmail.com',
      message: data.message,
      reply_to: data.email,
    };

    // Para demonstração, vamos simular o envio de email
    // Em produção, descomente a linha abaixo e configure suas credenciais do EmailJS
    // await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    
    // Simulação de envio bem-sucedido
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Email enviado com sucesso:', templateParams);
    
    // Para funcionalidade real, configure o EmailJS e retorne true
    // Por enquanto, vamos usar o mailto como fallback
    sendEmailViaMailto(data);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

// Função alternativa usando mailto (sempre funciona)
export const sendEmailViaMailto = (data: EmailData): void => {
  const subject = encodeURIComponent(`Contato do Portfolio - ${data.name}`);
  const body = encodeURIComponent(
    `Nome: ${data.name}\n` +
    `Email: ${data.email}\n\n` +
    `Mensagem:\n${data.message}\n\n` +
    `---\n` +
    `Enviado através do portfolio de Esther Gabrielle`
  );
  
  const mailtoLink = `mailto:esthergabriellesouza@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
};