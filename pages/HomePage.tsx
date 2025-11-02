import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

// SVG Icons for Categories & Features
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m0 0a7.5 7.5 0 007.5-7.5H4.5a7.5 7.5 0 007.5 7.5z" />
  </svg>
);
const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CertificateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const categories = [
    { name: "Desenvolvimento", icon: <CodeIcon />, description: "Leve suas habilidades de código para o próximo nível.", to: "/products" },
    { name: "Cursos", icon: <BookOpenIcon />, description: "Aprenda novas tecnologias com especialistas do mercado.", to: "/products" },
    { name: "Ferramentas de Design", icon: <PaletteIcon />, description: "Otimize seu fluxo de trabalho criativo com assets de alta qualidade.", to: "/products" },
    { name: "E-books", icon: <BookOpenIcon />, description: "Conhecimento aprofundado para consulta a qualquer momento.", to: "/products" }
];

const features = [
    { title: "Conteúdo de Ponta", description: "Cursos atualizados com as últimas tendências e tecnologias do mercado.", icon: <BrainIcon /> },
    { title: "Acesso Flexível", description: "Aprenda no seu ritmo, quando e onde quiser, com acesso vitalício.", icon: <ClockIcon /> },
    { title: "Instrutores Especialistas", description: "Aprenda com profissionais experientes e apaixonados por ensinar.", icon: <CertificateIcon /> }
];

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-br from-neutral to-gray-900 rounded-xl p-8 md:p-16 shadow-2xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Transforme sua Carreira com Nossos Cursos Online
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Domine novas habilidades com cursos práticos, e-books e ferramentas criadas por especialistas da indústria para impulsionar seu sucesso.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
            to="/products" 
            className="inline-block bg-accent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
            Explorar Cursos
            </Link>
             <Link 
            to="/about" 
            className="inline-block bg-transparent border-2 border-gray-600 hover:bg-gray-800 text-gray-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
            Saber Mais
            </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-3xl font-bold text-center text-white mb-10">Explore por Categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
                <Link to={cat.to} key={index} className="block group">
                    <div className="bg-neutral p-8 rounded-lg text-center h-full transform group-hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-accent/20">
                        <div className="flex justify-center items-center mb-4">
                            {cat.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                        <p className="text-gray-400 text-sm">{cat.description}</p>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <h2 className="text-3xl font-bold text-center text-white mb-10">Cursos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="opacity-0 animate-fade-in-up" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <div className="bg-neutral p-8 md:p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Por que escolher a DigiCatálogo?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="flex justify-center items-center h-16 w-16 bg-primary/20 rounded-full mb-4">
                           {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 max-w-xs">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;