
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma aplicação real, aqui você enviaria os dados para um servidor.
    console.log('Form data submitted:', formState);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000); // Reseta a mensagem após 5 segundos
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Entre em Contato</h1>
        <p className="text-lg text-gray-400 mb-12">
          Adoraríamos ouvir de você! Preencha o formulário ou use nossos outros canais de contato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulário de Contato */}
        <div className="bg-neutral p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Envie uma Mensagem</h2>
          {isSubmitted ? (
            <div className="bg-success/20 border border-success text-success px-4 py-3 rounded-md" role="alert">
              <strong className="font-bold">Obrigado!</strong>
              <span className="block sm:inline"> Sua mensagem foi enviada com sucesso.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Assunto</label>
                <input type="text" name="subject" id="subject" value={formState.subject} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                <textarea name="message" id="message" rows={5} value={formState.message} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
              </div>
              <button type="submit" className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg">
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>

        {/* Informações & Mapa */}
        <div className="space-y-8">
          <div className="bg-neutral p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Nossas Informações</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p><strong>Email:</strong> contato@digicatalogo.com</p>
              <p><strong>Telefone:</strong> +55 (11) 98765-4321</p>
              <p><strong>Endereço:</strong> Av. Digital, 101, São Paulo - SP, Brasil</p>
              <hr className="border-gray-700 my-4" />
              <p><strong>Seg-Sex:</strong> 9:00 - 18:00 | <strong>Sáb:</strong> 9:00 - 13:00</p>
            </div>
          </div>
          <div className="bg-neutral rounded-lg shadow-xl overflow-hidden">
             <iframe
                src="https://maps.google.com/maps?q=Avenida%20Digital%20101%20Sao%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Empresa"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
