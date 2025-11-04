import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);

  const balance = 45280.50;

  const expenses = [
    { category: 'Еда', amount: 12800, icon: 'UtensilsCrossed', percentage: 40, color: '#FF6B6B', emoji: '🍕' },
    { category: 'Транспорт', amount: 6400, icon: 'Car', percentage: 20, color: '#6A5AE0', emoji: '⛽' },
    { category: 'Развлечения', amount: 4800, icon: 'Gamepad2', percentage: 15, color: '#00C896', emoji: '🎮' },
    { category: 'Покупки', amount: 4000, icon: 'ShoppingBag', percentage: 12.5, color: '#FEC6A1', emoji: '🛍️' },
    { category: 'Другое', amount: 4000, icon: 'MoreHorizontal', percentage: 12.5, color: '#D6BCFA', emoji: '📦' }
  ];

  const goals = [
    { name: 'Ноутбук', current: 80000, target: 100000, icon: 'Laptop', emoji: '💻' },
    { name: 'Отпуск', current: 150000, target: 150000, icon: 'Plane', emoji: '✈️' }
  ];

  const transactions = [
    { id: 1, name: 'Кафе "Уют"', amount: -350, date: 'Сегодня, 14:30', icon: 'Coffee', color: '#FF6B6B' },
    { id: 2, name: 'АЗС', amount: -1200, date: 'Сегодня, 09:15', icon: 'Fuel', color: '#6A5AE0' },
    { id: 3, name: 'Зарплата', amount: 75000, date: 'Вчера, 10:00', icon: 'Wallet', color: '#00C896' },
    { id: 4, name: 'Продуктовый', amount: -2450, date: '2 ноября, 18:20', icon: 'ShoppingCart', color: '#FF6B6B' }
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
        <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-[2rem] shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Icon name="Home" size={28} />
            </div>
            <h1 className="text-2xl font-bold">Главная</h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CreditCard" size={18} className="opacity-80" />
              <p className="text-sm opacity-90 font-semibold">Общий баланс</p>
            </div>
            <p className="text-4xl font-bold tracking-tight">₽{balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="px-4 mt-6 space-y-4">
          <Card className="p-6 shadow-lg border-0 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="PieChart" size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-bold">Расходы в этом месяце</h2>
            </div>
            
            <div className="relative w-56 h-56 mx-auto mb-8">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {expenses.map((exp, idx) => {
                  const previousPercentages = expenses.slice(0, idx).reduce((sum, e) => sum + e.percentage, 0);
                  const circumference = 2 * Math.PI * 85;
                  const offset = (previousPercentages / 100) * circumference;
                  const dashArray = (exp.percentage / 100) * circumference;

                  return (
                    <circle
                      key={exp.category}
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke={exp.color}
                      strokeWidth={selectedSegment === idx ? "32" : "28"}
                      strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedSegment(selectedSegment === idx ? null : idx)}
                      opacity={selectedSegment === null || selectedSegment === idx ? 1 : 0.3}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {selectedSegment !== null ? (
                  <>
                    <span className="text-3xl mb-1">{expenses[selectedSegment].emoji}</span>
                    <p className="text-sm text-muted-foreground font-semibold">{expenses[selectedSegment].category}</p>
                    <p className="text-2xl font-bold mt-1">₽{expenses[selectedSegment].amount.toLocaleString('ru-RU')}</p>
                    <p className="text-base font-semibold text-primary">{expenses[selectedSegment].percentage}%</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground font-semibold">Всего расходов</p>
                    <p className="text-3xl font-bold mt-1">₽{totalExpenses.toLocaleString('ru-RU')}</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {expenses.map((exp, idx) => (
                <div 
                  key={exp.category} 
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    selectedSegment === idx ? 'bg-muted/60 scale-[1.02]' : 'hover:bg-muted/30'
                  }`}
                  onClick={() => setSelectedSegment(selectedSegment === idx ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                      style={{ backgroundColor: exp.color }}
                    >
                      <span className="text-xl">{exp.emoji}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{exp.category}</p>
                      <p className="text-sm text-muted-foreground">{exp.percentage}% от общего</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">₽{exp.amount.toLocaleString('ru-RU')}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-0 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon name="Target" size={20} className="text-accent" />
              </div>
              <h2 className="text-lg font-bold">Цели</h2>
            </div>
            <div className="space-y-5">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const isCompleted = progress >= 100;
                
                return (
                  <div 
                    key={goal.name} 
                    className="space-y-3 p-4 rounded-xl hover:bg-muted/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          isCompleted ? 'bg-accent/10' : 'bg-muted'
                        }`}>
                          {goal.emoji}
                        </div>
                        <div>
                          <p className="font-bold">{goal.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₽{goal.current.toLocaleString('ru-RU')} из ₽{goal.target.toLocaleString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${isCompleted ? 'text-accent' : 'text-primary'}`}>
                          {Math.round(progress)}%
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={Math.min(progress, 100)} 
                        className="h-3"
                      />
                      {isCompleted && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Icon name="CheckCircle2" size={16} className="text-accent" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-0 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-bold">Последние операции</h2>
            </div>
            
            <div className="space-y-1">
              {transactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="flex items-center justify-between py-4 px-3 rounded-xl hover:bg-muted/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tx.color + '20' }}
                    >
                      <Icon 
                        name={tx.icon as any} 
                        size={22} 
                        style={{ color: tx.color }} 
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{tx.name}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      tx.amount > 0 ? 'text-accent' : 'text-foreground'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}₽{Math.abs(tx.amount).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-2xl">
          <div className="max-w-md mx-auto flex justify-around px-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'text-primary bg-primary/10 scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon name={item.icon as any} size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
