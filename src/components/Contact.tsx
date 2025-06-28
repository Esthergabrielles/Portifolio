import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Copy, Check, AlertCircle } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import AnimatedSection from './AnimatedSection';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formConfig = {
    name: { required: true, minLength: 2, maxLength: 50 },
    email: { required: true, email: true },
    message: { required: true, minLength: 10, maxLength: 500 }
  };

  const {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(
    { name: '', email: '', message: '' },
    formConfig
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('esther.souza@email.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'esther.souza@email.com',
      action: copyEmail
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'São Paulo, SP - Brasil'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/esther-souza',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/esther-souza',
      color: 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
    }
  ];

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-300 font-inter";
    
    if (!touched[fieldName]) {
      return `${baseClass} border-neutral-300 dark:border-neutral-600`;
    }
    
    if (errors[fieldName]) {
      return `${baseClass} form-field-error`;
    }
    
    return `${baseClass} form-field-success`;
  };

  return (
    <section id="contact" className="section-spacing bg-white dark:bg-neutral-900">
      <div className="container-12">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <h2 className="text-display font-poppins text-neutral-900 dark:text-white mb-4">
              Vamos Conversar?
            </h2>
            <p className="text-h2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Estou sempre aberta a novas oportunidades e colaborações. 
              Entre em contato para discutirmos como posso contribuir com seu projeto.
            </p>
          </AnimatedSection>
        </div>

        {/* Contact Information */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={1}>
            <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-8">
              Informações de Contato
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                    <info.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-small text-neutral-500 dark:text-neutral-400 font-inter">
                      {info.label}
                    </p>
                    <div className="flex items-center gap-2">
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-neutral-900 dark:text-white font-medium hover:text-primary-500 transition-colors duration-300 font-inter"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-neutral-900 dark:text-white font-medium font-inter">
                          {info.value}
                        </span>
                      )}
                      {info.action && (
                        <button
                          onClick={info.action}
                          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300"
                          title="Copiar email"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-h2 font-poppins text-neutral-900 dark:text-white mb-4">
                Redes Sociais
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg glass-card hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover-lift will-change-transform ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Contact Form */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={2}>
            <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-8">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-small font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={getFieldClassName('name')}
                  placeholder="Seu nome"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-small font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={getFieldClassName('email')}
                  placeholder="seu.email@exemplo.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-small font-medium text-neutral-700 dark:text-neutral-300 mb-2 font-inter">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={data.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`${getFieldClassName('message')} resize-none`}
                  placeholder="Conte-me sobre seu projeto ou oportunidade..."
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-inter">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-inter">
                  Mensagem enviada com sucesso! Entrarei em contato em breve.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-inter">
                  Erro ao enviar mensagem. Tente novamente.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-inter font-medium flex items-center justify-center gap-2 hover-lift will-change-transform"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;