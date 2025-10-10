"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "+55 (11) 99999-9999",
    role: "Usuário",
    company: "Controle Financeiro",
    bio: "Especialista em gestão financeira e análise de investimentos.",
    location: "São Paulo, Brasil",
    joinDate: "2024",
  });

  // Função para fazer upload do avatar
  const uploadAvatar = async (file: File) => {
    if (!user) {
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    setIsUploading(true);

    try {
      // Validar o arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione uma imagem válida (JPG, PNG, etc.).");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        alert("A imagem deve ter no máximo 2MB.");
        return;
      }

      console.log("Iniciando upload do avatar...", {
        fileName: `${user.id}.jpg`,
        fileSize: file.size,
        fileType: file.type,
        userId: user.id,
      });

      // Upload para o bucket 'avatars' com o nome sendo o ID do usuário
      const fileName = `${user.id}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          upsert: true, // Substitui se já existir
        });

      console.log("Resultado do upload:", { uploadData, uploadError });

      if (uploadError) {
        // Tratamento específico de erros
        if (uploadError.message.includes("Bucket not found")) {
          alert(
            'Erro: Bucket "avatars" não encontrado no Supabase. Verifique a configuração do Storage.'
          );
        } else if (uploadError.message.includes("Policy")) {
          alert(
            'Erro de permissão: Verifique as políticas de segurança do bucket "avatars".'
          );
        } else if (uploadError.message.includes("Invalid JWT")) {
          alert("Erro de autenticação: Faça login novamente.");
        } else {
          alert(`Erro no upload: ${uploadError.message}`);
        }
        console.error("Erro detalhado do upload:", uploadError);
        return;
      }

      // Obter a URL pública
      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

      console.log("URL pública gerada:", data);

      if (data?.publicUrl) {
        // Atualizar o avatar_url nos metadados do usuário
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            avatar_url: data.publicUrl,
          },
        });

        if (updateError) {
          console.error("Erro ao atualizar metadados:", updateError);
          alert(
            "Upload realizado, mas erro ao salvar nos metadados do usuário."
          );
        } else {
          console.log("Metadados atualizados com sucesso");
        }

        // Atualizar o estado local
        setAvatar(data.publicUrl);
        alert("Avatar atualizado com sucesso!");
        console.log("Avatar atualizado com sucesso!");
      } else {
        alert("Erro: Não foi possível gerar a URL pública da imagem.");
      }
    } catch (error: unknown) {
      console.error("Erro geral no upload do avatar:", error);

      // Tratamento de erros específicos
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("NetworkError")) {
        alert("Erro de rede. Verifique sua conexão e tente novamente.");
      } else if (errorMessage.includes("CORS")) {
        alert("Erro de CORS. Verifique as configurações do Supabase.");
      } else {
        alert(
          `Erro inesperado: ${errorMessage || "Tente novamente mais tarde."}`
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Handler para seleção de arquivo
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  // Atualizar profile quando user mudar
  useEffect(() => {
    // Função para carregar o avatar do usuário
    const loadAvatar = async () => {
      if (!user) return;

      try {
        // Buscar o avatar do user_metadata ou do storage
        const avatarUrl = user.user_metadata?.avatar_url;

        if (avatarUrl) {
          setAvatar(avatarUrl);
        } else {
          // Tentar buscar no storage usando o ID do usuário
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(`${user.id}.jpg`);

          if (data?.publicUrl) {
            // Verificar se o arquivo existe fazendo uma requisição HEAD
            try {
              const response = await fetch(data.publicUrl, { method: "HEAD" });
              if (response.ok) {
                setAvatar(data.publicUrl);
              }
            } catch {
              // Avatar não existe, mantém null
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar avatar:", error);
      }
    };

    if (user) {
      const userName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Usuário";

      setProfile((prev) => ({
        ...prev,
        name: userName,
        email: user.email || "",
        phone: user.user_metadata?.phone || prev.phone,
        bio: user.user_metadata?.bio || prev.bio,
        location: user.user_metadata?.location || prev.location,
        company: user.user_metadata?.company || prev.company,
        joinDate: new Date(user.created_at).getFullYear().toString(),
      }));

      // Carregar avatar
      loadAvatar();
    }
  }, [user]);

  // Loading state
  if (!user) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 glass-accent rounded-full animate-pulse"></div>
          <p className="text-muted">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      // Salvar os metadados do usuário no Supabase
      if (user) {
        const { data, error } = await supabase.auth.updateUser({
          data: {
            full_name: profile.name,
            phone: profile.phone,
            bio: profile.bio,
            location: profile.location,
            company: profile.company,
          },
        });

        if (error) {
          console.error("Erro ao atualizar perfil:", error);
          alert("Erro ao salvar perfil. Tente novamente.");
          return;
        }

        console.log("Perfil atualizado com sucesso:", data);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil. Tente novamente.");
    }
  };

  const handleCancel = () => {
    // Restaurar dados originais do usuário
    if (user) {
      const userName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Usuário";

      setProfile((prev) => ({
        ...prev,
        name: userName,
        email: user.email || "",
        phone: user.user_metadata?.phone || "+55 (11) 99999-9999",
        bio:
          user.user_metadata?.bio ||
          "Especialista em gestão financeira e análise de investimentos.",
        location: user.user_metadata?.location || "São Paulo, Brasil",
        company: user.user_metadata?.company || "Controle Financeiro",
      }));
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">👤 Perfil</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                isEditing
                  ? "glass-subtle text-primary hover:glass-accent hover:text-white"
                  : "glass-accent text-white hover:glass-subtle hover:text-primary"
              }`}
            >
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-glass-medium p-6 rounded-xl text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto glass-accent rounded-full flex items-center justify-center animate-liquid overflow-hidden">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Avatar do usuário"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-6xl">👨‍💼</span>
                  )}
                </div>

                {/* Input oculto para seleção de arquivo */}
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Botão para upload */}
                <button
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                  disabled={isUploading}
                  className="absolute bottom-2 right-1/2 transform translate-x-6 w-10 h-10 glass-subtle rounded-full flex items-center justify-center hover:glass-accent transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-lg group-hover:text-white">📷</span>
                  )}
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
                      className="glass-accent px-4 py-2 rounded-lg text-white font-medium hover:glass-subtle hover:text-primary transition-all cursor-pointer"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all cursor-pointer"
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
                  <button className="glass-accent px-4 py-2 rounded-lg text-white font-medium hover:glass-subtle hover:text-primary transition-all cursor-pointer">
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
                  <button className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all cursor-pointer">
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
                  <button className="glass-subtle px-4 py-2 rounded-lg text-primary font-medium hover:glass-accent hover:text-white transition-all cursor-pointer">
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
                  <button className="w-12 h-6 glass-accent rounded-full relative cursor-pointer">
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
                  <button className="w-12 h-6 glass-accent rounded-full relative cursor-pointer">
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
                  <button className="w-12 h-6 glass-subtle rounded-full relative cursor-pointer">
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
