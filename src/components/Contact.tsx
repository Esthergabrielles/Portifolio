import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Copy, Check, AlertCircle, MessageSquare, Clock, Users, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormValidation } from '../hooks/useFormValidation';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../data/translations';
import { sendEmail, sendEmailViaMailto } from '../services/emailService';
import AnimatedSection from './AnimatedSection';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { language } = useLanguage();

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
      const success = await sendEmail(data);
      
      if (success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('esthergabriellesouza@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText('(19) 98926-1419');
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error('Failed to copy phone');
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'pt' 
        ? 'Olá Esther! Vi seu portfólio e gostaria de conversar sobre oportunidades.'
        : 'Hello Esther! I saw your portfolio and would like to talk about opportunities.'
    );
    window.open(`https://wa.me/5519989261419?text=${message}`, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('professionalEmail', language),
      value: 'esthergabriellesouza@gmail.com',
      action: copyEmail,
      color: 'from-blue-500 to-blue-600',
      copied: copied
    },
    {
      icon: Phone,
      label: t('phoneWhatsApp', language),
      value: '(19) 98926-1419',
      action: copyPhone,
      whatsappAction: openWhatsApp,
      color: 'from-green-500 to-green-600',
      copied: copiedPhone
    },
    {
      icon: MapPin,
      label: t('location', language),
      value: 'Santa Bárbara d\'Oeste, SP - Brasil',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/esthergabrielle',
      color: 'from-blue-600 to-blue-700',
      description: t('connectWithMe', language)
    }
  ];

  const getFieldClassName = (fieldName: string) => {
    const baseClass = "w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm text-neutral-900 dark:text-white transition-all duration-300 font-inter";
    
    if (!touched[fieldName]) {
      return `${baseClass} border-neutral-300 dark:border-neutral-600`;
    }
    
    if (errors[fieldName]) {
      return `${baseClass} border-red-500 ring-2 ring-red-500/20`;
    }
    
    return `${baseClass} border-green-500 ring-2 ring-green-500/20`;
  };

  return (
    <section id="contact" className="section-spacing bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-black dark:to-neutral-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(47,128,237,0.03)_49%,rgba(47,128,237,0.03)_51%,transparent_52%)] bg-[length:30px_30px]" />
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                {t('letsChat2', language)}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                {t('contactSubtitle', language)}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Quick Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, label: t('quickResponse', language), value: '< 24h', color: 'from-blue-500 to-blue-600' },
              { icon: Clock, label: t('availability', language), value: t('immediate', language), color: 'from-green-500 to-green-600' },
              { icon: Users, label: t('projects', language), value: t('acceptNewProjects', language), color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-6 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={1}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-900 dark:text-white mb-12">
                {t('contactInfo', language)}
              </h3>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-6 p-6 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className={`bg-gradient-to-r ${info.color} p-4 rounded-xl shadow-lg`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 font-inter font-medium mb-1">
                        {info.label}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-lg text-neutral-900 dark:text-white font-semibold font-inter">
                          {info.value}
                        </span>
                        <div className="flex gap-2">
                          {info.action && (
                            <motion.button
                              onClick={info.action}
                              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300"
                              title={language === 'pt' ? 'Copiar' : 'Copy'}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {info.copied ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy className="w-5 h-5 text-neutral-500" />
                              )}
                            </motion.button>
                          )}
                          {info.whatsappAction && (
                            <motion.button
                              onClick={info.whatsappAction}
                              className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
                              title="WhatsApp"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageSquare className="w-5 h-5" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                  {t('socialNetworks', language)}
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-6 bg-gradient-to-r ${social.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <social.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h5 className="font-bold text-lg font-inter">{social.label}</h5>
                        <p className="text-sm opacity-90 font-inter">{social.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Contact Form */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={2}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-900 dark:text-white mb-12">
                {t('sendMessage', language)}
              </h3>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-3xl shadow-xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-3 font-inter">
                    {t('fullName', language)} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={getFieldClassName('name')}
                    placeholder={t('yourFullName', language)}
                  />
                  {touched.name && errors.name && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500 flex items-center gap-2 font-inter"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-3 font-inter">
                    {t('professionalEmail', language)} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={getFieldClassName('email')}
                    placeholder={t('yourEmail', language)}
                  />
                  {touched.email && errors.email && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500 flex items-center gap-2 font-inter"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-3 font-inter">
                    {t('message', language)} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={data.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`${getFieldClassName('message')} resize-none`}
                    placeholder={t('messagePlaceholder', language)}
                  />
                  {touched.message && errors.message && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500 flex items-center gap-2 font-inter"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <motion.div 
                    className="p-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-inter border border-green-200 dark:border-green-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">{t('messageSuccess', language)}</span>
                    </div>
                    <p>{t('messageSuccessDesc', language)}</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    className="p-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-inter border border-red-200 dark:border-red-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">{t('messageError', language)}</span>
                    </div>
                    <p className="mb-3">{t('tryAgain', language)}</p>
                    <motion.button
                      type="button"
                      onClick={() => sendEmailViaMailto(data)}
                      className="flex items-center gap-2 text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('openEmailClient', language)}
                    </motion.button>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-8 rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-inter font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('sendingMessage', language)}
                    </>
                  ) : (
                    <>
                      {t('sendMessage2', language)}
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </motion.button>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-inter text-center">
                  {t('privacyNote', language)}
                </p>
              </motion.form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;