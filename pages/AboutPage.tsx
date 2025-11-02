import React from 'react';

const MissionIcon = () => (
    <div className="flex justify-center items-center h-16 w-16 bg-primary/20 rounded-full mx-auto mb-4">
        <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    </div>
);

const VisionIcon = () => (
    <div className="flex justify-center items-center h-16 w-16 bg-primary/20 rounded-full mx-auto mb-4">
        <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    </div>
);

const ValuesIcon = () => (
    <div className="flex justify-center items-center h-16 w-16 bg-primary/20 rounded-full mx-auto mb-4">
        <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);


const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-fade-in-up">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Nossa Paixão é Impulsionar o Futuro Digital
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          No DigiCatálogo, acreditamos que a tecnologia e o conhecimento são as chaves para desbloquear o potencial humano.
        </p>
      </section>

      {/* Nossa História Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-neutral p-8 rounded-lg shadow-xl">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-accent pl-4">Nossa História</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              O DigiCatálogo nasceu em 2020, da união de um grupo de desenvolvedores e designers apaixonados por criar soluções digitais que fazem a diferença. Começamos com a grande ambição de simplificar o acesso a ferramentas de alta qualidade para profissionais criativos e empresas.
            </p>
            <p>
              Hoje, somos uma plataforma de referência, com um catálogo diversificado que acelera o desenvolvimento e o design de projetos inovadores em todo o mundo.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="https://picsum.photos/seed/history/800/600" 
            alt="Equipe trabalhando em um projeto" 
            className="rounded-lg shadow-2xl object-cover w-full h-full aspect-video md:aspect-auto"
          />
        </div>
      </section>

      {/* Missão, Visão, Valores Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Missão Card */}
        <div className="bg-neutral p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
           <MissionIcon />
           <h3 className="text-2xl font-bold text-white mb-3">Nossa Missão</h3>
           <p className="text-gray-400">
            Capacitar criadores e desenvolvedores com ferramentas e conhecimento para transformar ideias em realidade digital.
           </p>
        </div>
        
        {/* Visão Card */}
        <div className="bg-neutral p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
          <VisionIcon />
          <h3 className="text-2xl font-bold text-white mb-3">Nossa Visão</h3>
          <p className="text-gray-400">
            Ser a principal fonte global de produtos digitais inovadores, inspirando uma comunidade de criadores e aprendizes contínuos.
          </p>
        </div>

        {/* Valores Card */}
        <div className="bg-neutral p-8 rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
          <ValuesIcon />
          <h3 className="text-2xl font-bold text-white mb-3">Nossos Valores</h3>
          <ul className="text-gray-400 space-y-1 list-none">
            <li>Inovação Constante</li>
            <li>Qualidade Excepcional</li>
            <li>Foco no Cliente</li>
            <li>Colaboração e Comunidade</li>
          </ul>
        </div>
      </section>

       {/* Team Section */}
       <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-neutral p-8 rounded-lg shadow-xl">
        <div className="order-1">
            <img 
                src="https://picsum.photos/seed/team/800/600" 
                alt="Nossa equipe colaborando" 
                className="rounded-lg shadow-2xl object-cover w-full h-full aspect-video md:aspect-auto"
            />
        </div>
        <div className="order-2">
            <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-accent pl-4">Nossa Equipe</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
                Nossa equipe é o coração do DigiCatálogo. Somos um coletivo de especialistas da indústria, designers e engenheiros que exploram constantemente novas tecnologias.
            </p>
            <p>
                Unimos nossa expertise para trazer a você o que há de mais moderno e eficaz no mercado digital, garantindo que cada produto em nosso catálogo tenha um selo de qualidade e relevância.
            </p>
            </div>
        </div>
        </section>

    </div>
  );
};

export default AboutPage;
