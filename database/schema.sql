-- Tabela para armazenar os ativos dos usuários
CREATE TABLE IF NOT EXISTS public.ativos (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome_ativo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Ação', 'FII', 'Renda Fixa', 'Cripto', 'Internacional')),
    quantidade DECIMAL(15,8) NOT NULL CHECK (quantidade > 0),
    preco_medio DECIMAL(15,2) NOT NULL CHECK (preco_medio > 0),
    url_investing TEXT, -- URL do Investing.com para buscar preços atualizados
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar coluna url_investing se ela não existir (para bancos existentes)
ALTER TABLE public.ativos ADD COLUMN IF NOT EXISTS url_investing TEXT;

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_ativos_user_id ON public.ativos(user_id);
CREATE INDEX IF NOT EXISTS idx_ativos_tipo ON public.ativos(tipo);
CREATE INDEX IF NOT EXISTS idx_ativos_criado_em ON public.ativos(criado_em);

-- Função para atualizar automaticamente o campo atualizado_em
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar automaticamente o campo atualizado_em
CREATE TRIGGER update_ativos_updated_at 
    BEFORE UPDATE ON public.ativos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Política de Row Level Security (RLS)
ALTER TABLE public.ativos ENABLE ROW LEVEL SECURITY;

-- Política para que usuários só vejam seus próprios ativos
CREATE POLICY "Users can view their own ativos" ON public.ativos
    FOR SELECT USING (auth.uid() = user_id);

-- Política para que usuários só possam inserir seus próprios ativos
CREATE POLICY "Users can insert their own ativos" ON public.ativos
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para que usuários só possam atualizar seus próprios ativos
CREATE POLICY "Users can update their own ativos" ON public.ativos
    FOR UPDATE USING (auth.uid() = user_id);

-- Política para que usuários só possam deletar seus próprios ativos
CREATE POLICY "Users can delete their own ativos" ON public.ativos
    FOR DELETE USING (auth.uid() = user_id);