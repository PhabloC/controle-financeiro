import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/lib/supabase";

export function useAvatar() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvatar = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Verificar metadados primeiro
        const avatarUrl = user.user_metadata?.avatar_url;

        if (avatarUrl) {
          // Adicionar timestamp para evitar cache
          setAvatar(`${avatarUrl}?t=${Date.now()}`);
          console.log("Avatar carregado dos metadados:", avatarUrl);
          setIsLoading(false);
          return;
        }

        // Tentar buscar no storage
        const possibleExtensions = ["png", "jpg", "jpeg", "webp"];

        for (const ext of possibleExtensions) {
          const fileName = `${user.id}.${ext}`;
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(fileName);

          if (data?.publicUrl) {
            try {
              const response = await fetch(data.publicUrl, { method: "HEAD" });
              if (response.ok) {
                const avatarWithTimestamp = `${data.publicUrl}?t=${Date.now()}`;
                setAvatar(avatarWithTimestamp);

                // Atualizar metadados
                await supabase.auth.updateUser({
                  data: { avatar_url: data.publicUrl },
                });

                console.log("Avatar encontrado no storage:", data.publicUrl);
                setIsLoading(false);
                return;
              }
            } catch {
              continue;
            }
          }
        }

        console.log("Nenhum avatar encontrado para o usuário");
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar avatar:", error);
        setIsLoading(false);
      }
    };

    loadAvatar();
  }, [user]);

  return { avatar, isLoading, setAvatar };
}
