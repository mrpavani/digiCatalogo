import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { generateDescription } from '../services/geminiService';
import { Product, User } from '../types';

// Components for different tabs
const ManageProductsTab: React.FC<{ 
  products: Product[],
  currentUserRole: 'admin' | 'user',
  onEdit: (p: Product) => void,
  onDelete: (id: number) => void,
  onToggleStatus: (id: number) => void
}> = ({ products, currentUserRole, onEdit, onDelete, onToggleStatus }) => (
  <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
    <table className="min-w-full text-sm text-left text-gray-300">
      <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
        <tr>
          <th scope="col" className="px-6 py-3">Nome do Produto</th>
          <th scope="col" className="px-6 py-3">Status</th>
          <th scope="col" className="px-6 py-3 text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
            <td className="px-6 py-4 font-medium text-white">{product.name}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.isEnabled ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                {product.isEnabled ? 'Habilitado' : 'Desabilitado'}
              </span>
            </td>
            <td className="px-6 py-4 flex items-center justify-end space-x-4">
              <button onClick={() => onEdit(product)} className="font-medium text-accent hover:text-blue-400 transition-colors">Editar</button>
              {currentUserRole === 'admin' ? (
                 <button onClick={() => onDelete(product.id)} className="font-medium text-error hover:text-red-400 transition-colors">Excluir</button>
              ) : (
                <button onClick={() => onToggleStatus(product.id)} className={`font-medium transition-colors ${product.isEnabled ? 'text-warning hover:text-yellow-400' : 'text-success hover:text-green-400'}`}>
                  {product.isEnabled ? 'Desabilitar' : 'Habilitar'}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AddProductTab: React.FC = () => {
    const { addProduct } = useProducts();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleGenerateDescription = async () => {
        if (!name) {
            setMessage({ text: 'Por favor, insira o nome do produto primeiro.', type: 'error' });
            return;
        }
        setIsGenerating(true);
        setMessage(null);
        const generatedDesc = await generateDescription(name);
        setDescription(generatedDesc);
        setIsGenerating(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description) {
            setMessage({ text: 'Todos os campos são obrigatórios.', type: 'error' });
            return;
        }
        addProduct({ name, description });
        setMessage({ text: 'Produto adicionado com sucesso!', type: 'success' });
        setName('');
        setDescription('');
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Produto</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required />
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating || !name} className="text-sm bg-secondary text-white py-1 px-3 rounded-md hover:bg-primary disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center">
                        {isGenerating ? (<><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Gerando...</>) : "Gerar com IA"}
                    </button>
                </div>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required></textarea>
            </div>
            <button type="submit" className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg">Adicionar Produto</button>
            {message && <p className={`mt-4 text-center font-medium ${message.type === 'success' ? 'text-success' : 'text-error'}`}>{message.text}</p>}
        </form>
    );
};

const ManageUsersTab: React.FC<{
  currentUser: User;
  onEdit: (user: User) => void;
  onToggleStatus: (id: number) => void;
}> = ({ currentUser, onEdit, onToggleStatus }) => {
    const { users, registerUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'user'>('user');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if(!username || !password) {
          setMessage({ text: 'Nome de usuário e senha são obrigatórios.', type: 'error' });
          return;
        }
        const success = await registerUser(username, password, role);
        if(success) {
            setMessage({ text: 'Usuário cadastrado com sucesso!', type: 'success' });
            setUsername('');
            setPassword('');
            setRole('user');
        } else {
            setMessage({ text: 'Este nome de usuário já existe.', type: 'error' });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Cadastrar Novo Usuário</h3>
                <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
                    <div>
                        <label htmlFor="new-username" className="block text-sm font-medium text-gray-300 mb-1">Nome de Usuário</label>
                        <input id="new-username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required/>
                    </div>
                     <div>
                        <label htmlFor="new-password">Senha</label>
                        <input id="new-password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required/>
                    </div>
                     <div>
                        <label htmlFor="new-user-role" className="block text-sm font-medium text-gray-300 mb-1">Perfil</label>
                        <select id="new-user-role" value={role} onChange={e => setRole(e.target.value as 'admin' | 'user')} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required>
                            <option value="user">Usuário</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cadastrar</button>
                    {message && <p className={`mt-4 text-center font-medium ${message.type === 'success' ? 'text-success' : 'text-error'}`}>{message.text}</p>}
                </form>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Usuários Cadastrados</h3>
                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md max-h-96 overflow-y-auto">
                    <table className="min-w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Usuário</th>
                                <th scope="col" className="px-6 py-3">Perfil</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => 
                            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{user.username}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-gray-600 text-gray-300'}`}>{user.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isEnabled ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>{user.isEnabled ? 'Habilitado' : 'Desabilitado'}</span>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-end space-x-4">
                                    <button onClick={() => onEdit(user)} className="font-medium text-accent hover:text-blue-400 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed" disabled={user.username === 'admin' && currentUser.username !== 'admin'}>Editar</button>
                                    <button onClick={() => onToggleStatus(user.id)} className={`font-medium transition-colors disabled:text-gray-500 disabled:cursor-not-allowed ${user.isEnabled ? 'text-warning hover:text-yellow-400' : 'text-success hover:text-green-400'}`} disabled={currentUser.id === user.id}>
                                        {user.isEnabled ? 'Desabilitar' : 'Habilitar'}
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ChangePasswordTab: React.FC = () => {
    const { changePassword } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if(newPassword !== confirmPassword) {
            setMessage({ text: 'As novas senhas não coincidem.', type: 'error' });
            return;
        }
        if(!currentPassword || !newPassword) {
            setMessage({ text: 'Todos os campos são obrigatórios.', type: 'error' });
            return;
        }

        const result = await changePassword(currentPassword, newPassword);
        if(result.success) {
            setMessage({ text: result.message, type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Alterar Sua Senha</h3>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
                 <div>
                    <label htmlFor="current-password">Senha Atual</label>
                    <input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required/>
                </div>
                 <div>
                    <label htmlFor="new-password-change">Nova Senha</label>
                    <input id="new-password-change" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required/>
                </div>
                 <div>
                    <label htmlFor="confirm-password">Confirmar Nova Senha</label>
                    <input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required/>
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Alterar Senha</button>
                {message && <p className={`mt-4 text-center font-medium ${message.type === 'success' ? 'text-success' : 'text-error'}`}>{message.text}</p>}
            </form>
        </div>
    );
};


const AdminPage: React.FC = () => {
  const { products, editProduct, deleteProduct, toggleProductStatus } = useProducts();
  const { currentUser, logout, editUser, toggleUserStatus } = useAuth();
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState<'addProduct' | 'manageProducts' | 'manageUsers' | 'changePassword'>('manageProducts');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editRole, setEditRole] = useState<'admin' | 'user'>('user');

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto? A ação não pode ser desfeita.')) {
      deleteProduct(id);
      setMessage({ text: 'Produto excluído com sucesso!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleToggleProductStatusClick = (id: number) => {
      toggleProductStatus(id);
      setMessage({ text: 'Status do produto alterado com sucesso!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDescription(product.description);
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editName || !editDescription) return;
    editProduct(editingProduct.id, { name: editName, description: editDescription });
    setMessage({ text: 'Produto atualizado com sucesso!', type: 'success' });
    setEditingProduct(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleUserStatusClick = (id: number) => {
      if (currentUser?.id === id) {
        setMessage({ text: 'Você não pode desabilitar sua própria conta.', type: 'error' });
        setTimeout(() => setMessage(null), 3000);
        return;
      }
      toggleUserStatus(id);
      setMessage({ text: 'Status do usuário alterado com sucesso!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
  };
  
  const handleEditUserClick = (user: User) => {
      setEditingUser(user);
      setEditUsername(user.username);
      setEditRole(user.role);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    if (editingUser.username === 'admin' && editUsername !== 'admin') {
         setMessage({ text: "Não é permitido alterar o nome do usuário 'admin' principal.", type: 'error' });
         setTimeout(() => setMessage(null), 3000);
         return;
    }

    const result = await editUser(editingUser.id, { username: editUsername, role: editRole });
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if(result.success) {
        setEditingUser(null);
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const tabClasses = (tabName: string) => 
    `px-3 sm:px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out border-b-2 focus:outline-none ${
        activeTab === tabName 
        ? 'border-accent text-white' 
        : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-200'
    }`;

  if (!currentUser) return null;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-neutral p-4 rounded-lg shadow-xl">
            <div>
                <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-gray-300">Bem-vindo, {currentUser.username || 'Admin'}.</p>
            </div>
            <button onClick={logout} className="bg-error hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Sair</button>
        </div>
        
        <div className="bg-neutral p-4 sm:p-8 rounded-lg shadow-xl">
            <div className="border-b border-gray-700">
                <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto" aria-label="Tabs">
                    <button onClick={() => setActiveTab('manageProducts')} className={tabClasses('manageProducts')}>Gerenciar Produtos</button>
                    <button onClick={() => setActiveTab('addProduct')} className={tabClasses('addProduct')}>Adicionar Produto</button>
                    {currentUser.role === 'admin' && (
                        <button onClick={() => setActiveTab('manageUsers')} className={tabClasses('manageUsers')}>Gerenciar Usuários</button>
                    )}
                    <button onClick={() => setActiveTab('changePassword')} className={tabClasses('changePassword')}>Alterar Senha</button>
                </nav>
            </div>

            <div key={activeTab} className="mt-6 animate-fade-in">
                {activeTab === 'manageProducts' && 
                    <ManageProductsTab 
                        products={products} 
                        currentUserRole={currentUser.role}
                        onEdit={handleEditProductClick} 
                        onDelete={handleDeleteClick}
                        onToggleStatus={handleToggleProductStatusClick}
                    />
                }
                {activeTab === 'addProduct' && <AddProductTab />}
                {activeTab === 'manageUsers' && currentUser.role === 'admin' && 
                    <ManageUsersTab 
                        currentUser={currentUser} 
                        onEdit={handleEditUserClick} 
                        onToggleStatus={handleToggleUserStatusClick}
                    />
                }
                {activeTab === 'changePassword' && <ChangePasswordTab />}
            </div>
        </div>
        {message && (
          <div className="fixed bottom-5 right-5 bg-neutral text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-up">
            <p className={`font-medium ${message.type === 'success' ? 'text-success' : 'text-error'}`}>{message.text}</p>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="bg-neutral rounded-lg shadow-2xl w-full max-w-lg">
            <form onSubmit={handleEditProductSubmit} className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Editar Produto</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-gray-300 mb-1">Nome do Produto</label>
                  <input type="text" id="editName" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required />
                </div>
                <div>
                  <label htmlFor="editDescription" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                  <textarea id="editDescription" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={5} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="bg-neutral rounded-lg shadow-2xl w-full max-w-lg">
            <form onSubmit={handleEditUserSubmit} className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Editar Usuário</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="editUsername" className="block text-sm font-medium text-gray-300 mb-1">Nome de Usuário</label>
                  <input type="text" id="editUsername" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required />
                </div>
                <div>
                  <label htmlFor="editRole" className="block text-sm font-medium text-gray-300 mb-1">Perfil</label>
                  <select id="editRole" value={editRole} onChange={e => setEditRole(e.target.value as 'admin' | 'user')} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent" required>
                    <option value="user">Usuário</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;