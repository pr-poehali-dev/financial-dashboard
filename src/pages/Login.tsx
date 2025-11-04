import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Globe" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Вокруг света</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Информационная система турагентства
                </p>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-muted/30 py-12 px-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="LogIn" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-3xl text-center">Авторизация</CardTitle>
            <CardDescription className="text-center text-base">
              Войдите в систему для доступа к личному кабинету
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login" className="text-base">
                  Логин
                </Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="Введите ваш логин"
                  value={formData.login}
                  onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите ваш пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base"
                size="lg"
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>

              <div className="pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base"
                  size="lg"
                  onClick={() => window.location.href = '/register'}
                >
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Еще не зарегистрированы? Регистрация
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
