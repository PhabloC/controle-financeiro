"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Phablo Carvalho",
    email: "phablo@example.com",
    phone: "+55 (11) 99999-9999",
    role: "Admin",
    company: "Controle Financeiro",
    bio: "Especialista em gestão financeira e análise de investimentos.",
    location: "São Paulo, Brasil",
    joinDate: "2023",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você salvaria os dados no backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aqui você restauraria os dados originais
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">👤 Perfil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isEditing
                ? "glass-subtle text-primary hover:glass-accent hover:text-white"
                : "glass-accent text-white hover:glass-subtle hover:text-primary"
            }`}
          >
            {isEditing ? "Cancelar" : "Editar Perfil"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-glass-medium p-6 rounded-xl text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto glass-accent rounded-full flex items-center justify-center animate-liquid">
                  <span className="text-6xl">👨‍💼</span>
                </div>
                <button className="absolute bottom-2 right-1/2 transform translate-x-6 w-10 h-10 glass-subtle rounded-full flex items-center justify-center hover:glass-accent transition-all group">
                  <span className="text-lg group-hover:text-white">📷</span>
                </button>
              </div>

              <h2 className="text-2xl font-bold text-primary mb-2">
                {profile.name}
              </h2>
              <p className="text-muted mb-4">{profile.role}</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center space-x-2 text-secondary">
                  <span>📧</span>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-secondary">
                  <span>📱</span>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-secondary">
                  <span>📍</span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-secondary">
                  <span>📅</span>
                  <span>Desde {profile.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card-glass-light p-6 rounded-xl mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">
                📊 Estatísticas
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Relatórios criados</span>
                  <span className="font-bold text-primary">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Transações analisadas</span>
                  <span className="font-bold text-primary">2,543</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Economia gerada</span>
                  <span className="font-bold text-primary">R$ 45,230</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card-glass-light p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-primary">
                  ℹ️ Informações Básicas
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="glass-accent px-4 py-2 rounded-lg text-white font-medium hover:glass-subtle hover:text-primary transition-all"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Nome Completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-muted border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  ) : (
                    <p className="text-primary font-medium">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    E-mail
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-muted border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  ) : (
                    <p className="text-primary font-medium">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Telefone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-muted border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  ) : (
                    <p className="text-primary font-medium">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Localização
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-muted border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  ) : (
                    <p className="text-primary font-medium">
                      {profile.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-muted mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-muted border-0 focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                    placeholder="Descreva um pouco sobre você..."
                  />
                ) : (
                  <p className="text-primary">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Security Settings */}
            <div className="card-glass-medium p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-6">
                🔒 Configurações de Segurança
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 glass-subtle rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Alterar Senha</h4>
                    <p className="text-sm text-muted">
                      Última alteração há 3 meses
                    </p>
                  </div>
                  <button className="glass-accent px-4 py-2 rounded-lg text-white font-medium hover:glass-subtle hover:text-primary transition-all">
                    Alterar
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 glass-subtle rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">
                      Autenticação em Duas Etapas
                    </h4>
                    <p className="text-sm text-muted">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <button className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all">
                    Ativar
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 glass-subtle rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">Sessões Ativas</h4>
                    <p className="text-sm text-muted">
                      Gerencie dispositivos conectados
                    </p>
                  </div>
                  <button className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all">
                    Gerenciar
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="card-glass-light p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-6">
                ⚙️ Preferências
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-primary">
                      Notificações por E-mail
                    </h4>
                    <p className="text-sm text-muted">
                      Receba atualizações importantes
                    </p>
                  </div>
                  <button className="w-12 h-6 glass-accent rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-primary">Modo Escuro</h4>
                    <p className="text-sm text-muted">
                      Interface com tema escuro
                    </p>
                  </div>
                  <button className="w-12 h-6 glass-accent rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-primary">
                      Relatórios Automáticos
                    </h4>
                    <p className="text-sm text-muted">
                      Gere relatórios mensais automaticamente
                    </p>
                  </div>
                  <button className="w-12 h-6 glass-subtle rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
