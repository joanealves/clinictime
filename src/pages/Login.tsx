import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/AuthContext';
import { Button } from '../components/components/ui/button';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ClinicTime</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de agendamento para clínicas
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Contas de teste:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@clinictime.com / admin123</p>
              <p><strong>Médico:</strong> doctor@clinictime.com / doctor123</p>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => navigate('/public')}
            className="text-blue-600"
          >
            Agendar consulta (área pública)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
