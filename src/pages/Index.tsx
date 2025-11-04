import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Globe" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Вокруг света</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Информационная система турагентства
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Icon name="Phone" size={18} className="mr-2" />
                +7 999 999 999
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
            <div 
              className="relative bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/f5d3536c-cb70-4d3c-8788-bd9108a5705f.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            <div 
              className="relative bg-cover bg-center hidden md:block"
              style={{ 
                backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/eb75f569-08cc-4699-897a-b9f3e453bef4.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
            </div>
            <div 
              className="relative bg-cover bg-center hidden md:block"
              style={{ 
                backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/1d6bc4bd-76c8-46f0-b224-cd5957c77569.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Найдите свое идеальное
                  <span className="block text-primary mt-2">путешествие</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                  Мы поможем вам открыть мир
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-lg px-12 py-6 rounded-xl shadow-2xl hover:scale-105 transition-transform"
                  onClick={() => window.location.href = '/login'}
                >
                  <Icon name="LogIn" size={24} className="mr-3" />
                  Авторизация
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-12 py-6 rounded-xl bg-white/95 hover:bg-white border-2 hover:scale-105 transition-transform shadow-xl"
                  onClick={() => window.location.href = '/register'}
                >
                  <Icon name="UserPlus" size={24} className="mr-3" />
                  Регистрация
                </Button>
              </div>

              <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <Icon name="MapPin" size={32} className="text-white" />
                  </div>
                  <p className="text-white/90 font-semibold">150+ стран</p>
                  <p className="text-white/70 text-sm">по всему миру</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <Icon name="Users" size={32} className="text-white" />
                  </div>
                  <p className="text-white/90 font-semibold">10,000+</p>
                  <p className="text-white/70 text-sm">довольных клиентов</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <Icon name="Star" size={32} className="text-white" />
                  </div>
                  <p className="text-white/90 font-semibold">15 лет</p>
                  <p className="text-white/70 text-sm">опыта работы</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" size={40} className="text-white/60" />
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
                <p className="text-xl text-muted-foreground">
                  Профессиональный подход к организации вашего отдыха
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon name="Shield" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Надежность</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    15 лет на рынке туристических услуг. Официальная регистрация и страхование всех туров.
                  </p>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon name="Heart" size={32} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Индивидуальный подход</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Подберем тур под ваши пожелания и бюджет. Учитываем все детали вашего путешествия.
                  </p>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon name="Headphones" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Поддержка 24/7</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Всегда на связи во время вашего путешествия. Решаем любые вопросы в режиме реального времени.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Популярные направления</h2>
                <p className="text-xl text-muted-foreground">
                  Откройте для себя лучшие места планеты
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/f5d3536c-cb70-4d3c-8788-bd9108a5705f.jpg)'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Тропические острова</h3>
                    <p className="text-white/90 mb-3">Мальдивы, Бали, Таиланд</p>
                    <Button variant="secondary" size="sm">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/eb75f569-08cc-4699-897a-b9f3e453bef4.jpg)'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Горные курорты</h3>
                    <p className="text-white/90 mb-3">Альпы, Кавказ, Гималаи</p>
                    <Button variant="secondary" size="sm">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: 'url(https://cdn.poehali.dev/projects/201f6889-2477-4ac1-a920-9db4783a90bb/files/1d6bc4bd-76c8-46f0-b224-cd5957c77569.jpg)'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Европейские города</h3>
                    <p className="text-white/90 mb-3">Париж, Рим, Барселона</p>
                    <Button variant="secondary" size="sm">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Globe" size={28} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Вокруг света</h3>
                    <p className="text-sm text-muted-foreground">Турагентство</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Организуем незабываемые путешествия по всему миру с 2010 года
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Контакты</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <span>+7 999 999 999</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <span>info@vokrugsveta.ru</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <span>Москва, ул. Примерная, 123</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Рабочее время</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Пн-Пт: 9:00 - 20:00</p>
                  <p>Сб-Вс: 10:00 - 18:00</p>
                  <p className="text-primary font-semibold pt-2">Поддержка 24/7</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border text-center text-muted-foreground">
              <p>© Турагентство «Вокруг света», 2025. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}