import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/integrations/supabase/client'

export const AuthUI = () => {
  return (
    <div className="w-full max-w-[400px] mx-auto p-4">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#F2CED0',
                brandAccent: '#e6b5b7',
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Senha',
              button_label: 'Entrar',
              loading_button_label: 'Entrando...',
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Senha',
              button_label: 'Cadastrar',
              loading_button_label: 'Cadastrando...',
              link_text: 'Não tem uma conta? Cadastre-se',
            },
          },
        }}
        providers={[]}
      />
    </div>
  )
}