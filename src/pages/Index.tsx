import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  const balance = 45280.50;
  const expenses = [
    { category: 'Еда', amount: 12800, icon: 'UtensilsCrossed', percentage: 40, color: '#FF6B6B' },
    { category: 'Транспорт', amount: 6400, icon: 'Car', percentage: 20, color: '#6A5AE0' },
    { category: 'Развлечения', amount: 4800, icon: 'Gamepad2', percentage: 15, color: '#00C896' },
    { category: 'Покупки', amount: 4000, icon: 'ShoppingBag', percentage: 12.5, color: '#FEC6A1' },
    { category: 'Другое', amount: 4000, icon: 'MoreHorizontal', percentage: 12.5, color: '#D6BCFA' }
  ];

  const goals = [
    { name: 'Ноутбук', current: 80000, target: 100000, icon: 'Laptop', emoji: '💻' },
    { name: 'Отпуск', current: 150000, target: 150000, icon: 'Plane', emoji: '✈️' }
  ];

  const transactions = [
    { id: 1, name: 'Кафе "Уют"', amount: -350, date: 'Сегодня, 14:30', icon: 'Coffee' },
    { id: 2, name: 'АЗС', amount: -1200, date: 'Сегодня, 09:15', icon: 'Fuel' },
    { id: 3, name: 'Зарплата', amount: 75000, date: 'Вчера, 10:00', icon: 'Wallet' },
    { id: 4, name: 'Продуктовый', amount: -2450, date: '2 ноября, 18:20', icon: 'ShoppingCart' }
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'operations', label: 'Операции', icon: 'Receipt' },
    { id: 'plan', label: 'План', icon: 'Calendar' },
    { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
    { id: 'profile', label: 'Профиль', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Icon name="Home" size={28} />
            Главная
          </h1>
          <div className="mt-6">
            <p className="text-sm opacity-90 mb-1 flex items-center gap-2">
              <Icon name="CreditCard" size={16} />
              Общий баланс
            </p>
            <p className="text-4xl font-bold">₽{balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="px-4 mt-6 space-y-4">
          <Card className="p-6 shadow-md animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="PieChart" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Расходы в этом месяце</h2>
            </div>
            
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {expenses.map((exp, idx) => {
                  const previousPercentages = expenses.slice(0, idx).reduce((sum, e) => sum + e.percentage, 0);
                  const circumference = 2 * Math.PI * 80;
                  const offset = (previousPercentages / 100) * circumference;
                  const dashArray = (exp.percentage / 100) * circumference;

                  return (
                    <circle
                      key={exp.category}
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={exp.color}
                      strokeWidth="30"
                      strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground">Всего</p>
                <p className="text-2xl font-bold">₽{totalExpenses.toLocaleString('ru-RU')}</p>
              </div>
            </div>

            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: exp.color + '20' }}>
                      <Icon name={exp.icon as any} size={20} style={{ color: exp.color }} />
                    </div>
                    <div>
                      <p className="font-medium">{exp.category}</p>
                      <p className="text-sm text-muted-foreground">{exp.percentage}%</p>
                    </div>
                  </div>
                  <p className="font-semibold">₽{exp.amount.toLocaleString('ru-RU')}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-md animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Target" size={20} className="text-accent" />
              <h2 className="text-lg font-semibold">Цели</h2>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{goal.emoji}</span>
                        <span className="font-medium">{goal.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₽{goal.current.toLocaleString('ru-RU')}</span>
                      <span>₽{goal.target.toLocaleString('ru-RU')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 shadow-md animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Clock" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold">Последние операции</h2>
            </div>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.amount > 0 ? 'bg-accent/10' : 'bg-muted'
                    }`}>
                      <Icon name={tx.icon as any} size={20} className={tx.amount > 0 ? 'text-accent' : 'text-muted-foreground'} />
                    </div>
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-accent' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}₽{Math.abs(tx.amount).toLocaleString('ru-RU')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
          <div className="max-w-md mx-auto flex justify-around py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'text-primary scale-110'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
