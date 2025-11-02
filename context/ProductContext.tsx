import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'imageUrl' | 'category' | 'isEnabled'>) => void;
  editProduct: (id: number, updatedData: Pick<Product, 'name' | 'description'>) => void;
  deleteProduct: (id: number) => void;
  toggleProductStatus: (id: number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'E-book: React Avançado',
    description: 'Aprenda padrões de design avançados e otimização de performance em React para construir aplicações escaláveis e eficientes.',
    imageUrl: 'https://picsum.photos/seed/react/600/400',
    category: 'E-books',
    isEnabled: true,
  },
  {
    id: 2,
    name: 'Curso de Tailwind CSS',
    description: 'Domine o framework CSS utility-first mais popular e crie interfaces modernas e responsivas de forma rápida e intuitiva.',
    imageUrl: 'https://picsum.photos/seed/tailwind/600/400',
    category: 'Cursos',
    isEnabled: true,
  },
  {
    id: 3,
    name: 'UI Kit para Figma',
    description: 'Um kit completo de componentes de UI para Figma que acelera seu processo de design e garante consistência visual em seus projetos.',
    imageUrl: 'https://picsum.photos/seed/figma/600/400',
    category: 'Ferramentas de Design',
    isEnabled: true,
  },
  {
    id: 4,
    name: 'Template de API com Node.js',
    description: 'Um boilerplate robusto para iniciar o desenvolvimento de APIs RESTful com Node.js, Express e TypeScript, incluindo autenticação.',
    imageUrl: 'https://picsum.photos/seed/nodejs/600/400',
    category: 'Desenvolvimento',
    isEnabled: true,
  },
  {
    id: 5,
    name: 'Plugin de SEO para WordPress',
    description: 'Otimize seu site WordPress para os motores de busca com nosso plugin avançado de SEO, fácil de configurar e usar.',
    imageUrl: 'https://picsum.photos/seed/seo/600/400',
    category: 'Desenvolvimento',
    isEnabled: true,
  },
  {
    id: 6,
    name: 'Curso de Python para Análise de Dados',
    description: 'Aprenda a manipular, analisar e visualizar dados com Python, Pandas e Matplotlib, do básico ao avançado.',
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    category: 'Cursos',
    isEnabled: true,
  },
  {
    id: 7,
    name: 'Coleção de Ícones Vetoriais',
    description: 'Mais de 5000 ícones vetoriais personalizáveis para dar um toque profissional aos seus projetos de design.',
    imageUrl: 'https://picsum.photos/seed/icons/600/400',
    category: 'Ferramentas de Design',
    isEnabled: true,
  },
  {
    id: 8,
    name: 'E-book: Guia de Copywriting',
    description: 'Domine a arte da escrita persuasiva e crie textos que vendem para sites, e-mails e redes sociais.',
    imageUrl: 'https://picsum.photos/seed/copywriting/600/400',
    category: 'E-books',
    isEnabled: true,
  },
  {
    id: 9,
    name: 'Template de E-commerce para React',
    description: 'Um template completo e responsivo para construir sua loja virtual com React, Next.js e Stripe.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/600/400',
    category: 'Desenvolvimento',
    isEnabled: true,
  },
  {
    id: 10,
    name: 'Curso de Docker e Kubernetes',
    description: 'Aprenda a containerizar e orquestrar suas aplicações com as tecnologias mais demandadas do mercado DevOps.',
    imageUrl: 'https://picsum.photos/seed/docker/600/400',
    category: 'Cursos',
    isEnabled: true,
  },
  {
    id: 11,
    name: 'Pacote de Presets para Lightroom',
    description: 'Transforme suas fotos com um clique usando nossa coleção de presets profissionais para Adobe Lightroom.',
    imageUrl: 'https://picsum.photos/seed/lightroom/600/400',
    category: 'Ferramentas de Design',
    isEnabled: true,
  },
  {
    id: 12,
    name: 'Sistema de Design System (Boilerplate)',
    description: 'Comece seu próprio Design System com este boilerplate completo, incluindo componentes, tokens e documentação.',
    imageUrl: 'https://picsum.photos/seed/designsystem/600/400',
    category: 'Desenvolvimento',
    isEnabled: true,
  },
  {
    id: 13,
    name: 'Curso de Git e GitHub',
    description: 'Do básico ao avançado, aprenda a controlar versões de seus projetos e a colaborar em equipe de forma eficiente.',
    imageUrl: 'https://picsum.photos/seed/git/600/400',
    category: 'Cursos',
    isEnabled: true,
  },
];


export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id' | 'imageUrl' | 'category' | 'isEnabled'>) => {
    setProducts(prevProducts => [
      ...prevProducts,
      {
        ...product,
        id: Date.now(),
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(product.name)}/600/400`,
        category: 'Novidades',
        isEnabled: true,
      },
    ]);
  };

  const editProduct = (id: number, updatedData: Pick<Product, 'name' | 'description'>) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === id
          ? {
              ...p,
              ...updatedData,
              imageUrl: `https://picsum.photos/seed/${encodeURIComponent(updatedData.name)}/600/400`,
            }
          : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  const toggleProductStatus = (id: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === id ? { ...p, isEnabled: !p.isEnabled } : p
      )
    );
  };


  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct, toggleProductStatus }}>
      {children}
    </ProductContext.Provider>
  );
};