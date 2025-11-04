import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  icon: string;
  category: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [account, setAccount] = useState('tinkoff');
  const [date, setDate] = useState('today');
  const [comment, setComment] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipedTransaction, setSwipedTransaction] = useState<number | null>(null);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([
    { id: 1, name: 'Кафе "Уют"', amount: -350, date: 'Сегодня, 14:30', icon: 'Coffee', category: 'food' },
    { id: 2, name: 'АЗС', amount: -1200, date: 'Сегодня, 09:15', icon: 'Fuel', category: 'transport' },
    { id: 3, name: 'Зарплата', amount: 75000, date: 'Вчера, 10:00', icon: 'Wallet', category: 'other' },
    { id: 4, name: 'Продуктовый', amount: -2450, date: '2 ноября, 18:20', icon: 'ShoppingCart', category: 'food' },
    { id: 5, name: 'Кинотеатр', amount: -800, date: '1 ноября, 19:00', icon: 'Ticket', category: 'entertainment' }
  ]);

  const balance = 45280.50;
  const categories = [
    { id: 'food', label: 'Еда', emoji: '🍕', icon: 'UtensilsCrossed', color: '#FF6B6B', budget: 15000 },
    { id: 'transport', label: 'Транспорт', emoji: '⛽', icon: 'Car', color: '#6A5AE0', budget: 8000 },
    { id: 'entertainment', label: 'Развлечения', emoji: '🎮', icon: 'Gamepad2', color: '#00C896', budget: 5000 },
    { id: 'shopping', label: 'Покупки', emoji: '🛍️', icon: 'ShoppingBag', color: '#FEC6A1', budget: 10000 },
    { id: 'other', label: 'Другое', emoji: '📦', icon: 'MoreHorizontal', color: '#D6BCFA', budget: 5000 }
  ];

  const accounts = [
    { id: 'tinkoff', label: 'Tinkoff', emoji: '💳' },
    { id: 'sber', label: 'Сбербанк', emoji: '🏦' },
    { id: 'cash', label: 'Наличные', emoji: '💵' }
  ];

  const expenses = [
    { category: 'Еда', amount: 12800, icon: 'UtensilsCrossed', percentage: 40, color: '#FF6B6B', id: 'food', budget: 15000 },
    { category: 'Транспорт', amount: 6400, icon: 'Car', percentage: 20, color: '#6A5AE0', id: 'transport', budget: 8000 },
    { category: 'Развлечения', amount: 4800, icon: 'Gamepad2', percentage: 15, color: '#00C896', id: 'entertainment', budget: 5000 },
    { category: 'Покупки', amount: 4000, icon: 'ShoppingBag', percentage: 12.5, color: '#FEC6A1', id: 'shopping', budget: 10000 },
    { category: 'Другое', amount: 4000, icon: 'MoreHorizontal', percentage: 12.5, color: '#D6BCFA', id: 'other', budget: 5000 }
  ];

  const goals = [
    { name: 'Ноутбук', current: 80000, target: 100000, icon: 'Laptop', emoji: '💻' },
    { name: 'Отпуск', current: 150000, target: 150000, icon: 'Plane', emoji: '✈️' }
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'operations', label: 'Операции', icon: 'Receipt' },
    { id: 'plan', label: 'План', icon: 'Calendar' },
    { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
    { id: 'profile', label: 'Профиль', icon: 'User' }
  ];

  const suggestCategory = (text: string): string | null => {
    const suggestions: Record<string, string> = {
      'макдональдс': 'food',
      'кфс': 'food',
      'бургер': 'food',
      'кафе': 'food',
      'ресторан': 'food',
      'азс': 'transport',
      'такси': 'transport',
      'автобус': 'transport',
      'метро': 'transport',
      'кино': 'entertainment',
      'концерт': 'entertainment',
      'игра': 'entertainment',
      'магазин': 'shopping',
      'одежда': 'shopping'
    };

    const lowerText = text.toLowerCase();
    for (const [keyword, cat] of Object.entries(suggestions)) {
      if (lowerText.includes(keyword)) {
        return cat;
      }
    }
    return null;
  };

  useEffect(() => {
    if (comment) {
      const suggested = suggestCategory(comment);
      if (suggested) {
        setCategory(suggested);
        toast.info('Категория подобрана автоматически');
      }
    }
  }, [comment]);

  const handleSaveTransaction = () => {
    if (!amount || parseFloat(amount) === 0) {
      toast.error('Введите сумму операции');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      name: comment || 'Без описания',
      amount: -parseFloat(amount),
      date: date === 'today' ? 'Сегодня' : date === 'yesterday' ? 'Вчера' : date,
      icon: categories.find(c => c.id === category)?.icon || 'Circle',
      category: category
    };

    setTransactionsList([newTransaction, ...transactionsList]);
    toast.success('Операция добавлена');
    setIsAddDialogOpen(false);
    setAmount('');
    setComment('');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Данные обновлены');
    setIsRefreshing(false);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactionsList(transactionsList.filter(t => t.id !== id));
    setSwipedTransaction(null);
    toast.success('Операция удалена');
  };

  const filteredTransactions = transactionsList.filter(tx => {
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getBudgetColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage < 70) return '#00C896';
    if (percentage < 90) return '#FEC6A1';
    return '#FF6B6B';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Home" size={28} />
              Главная
            </h1>
            <button onClick={handleRefresh} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Icon name="RefreshCw" size={20} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
          </div>
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
                      strokeWidth={selectedSegment === idx ? "35" : "30"}
                      strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedSegment(selectedSegment === idx ? null : idx)}
                      opacity={selectedSegment === null || selectedSegment === idx ? 1 : 0.4}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {selectedSegment !== null ? (
                  <>
                    <p className="text-xs text-muted-foreground">{expenses[selectedSegment].category}</p>
                    <p className="text-2xl font-bold">₽{expenses[selectedSegment].amount.toLocaleString('ru-RU')}</p>
                    <p className="text-sm text-muted-foreground">{expenses[selectedSegment].percentage}%</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Всего</p>
                    <p className="text-2xl font-bold">₽{totalExpenses.toLocaleString('ru-RU')}</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {expenses.map((exp, idx) => {
                const budgetPercentage = (exp.amount / exp.budget) * 100;
                const budgetColor = getBudgetColor(exp.amount, exp.budget);
                
                return (
                  <div 
                    key={exp.category} 
                    className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
                      selectedSegment === idx ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => setSelectedSegment(selectedSegment === idx ? null : idx)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: exp.color + '20' }}>
                        <Icon name={exp.icon as any} size={20} style={{ color: exp.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{exp.category}</p>
                          <Badge variant="outline" style={{ borderColor: budgetColor, color: budgetColor }}>
                            {Math.round(budgetPercentage)}%
                          </Badge>
                        </div>
                        <div className="mt-1">
                          <Progress 
                            value={budgetPercentage} 
                            className="h-1.5"
                            style={{ 
                              backgroundColor: budgetColor + '20'
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          ₽{exp.amount.toLocaleString('ru-RU')} из ₽{exp.budget.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold ml-2">₽{exp.amount.toLocaleString('ru-RU')}</p>
                  </div>
                );
              })}
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
                  <div 
                    key={goal.name} 
                    className="space-y-2 cursor-pointer hover:bg-muted/30 p-3 rounded-lg transition-all"
                    onClick={() => toast.info(`Откройте детали цели "${goal.name}"`)}
                  >
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
              <h2 className="text-lg font-semibold">Операции</h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <Input
                placeholder="Поиск по операциям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <div className="flex gap-2 flex-wrap">
                <Badge 
                  variant={filterCategory === null ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilterCategory(null)}
                >
                  Все
                </Badge>
                {categories.map(cat => (
                  <Badge 
                    key={cat.id}
                    variant={filterCategory === cat.id ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterCategory(cat.id)}
                  >
                    {cat.emoji} {cat.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTransactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="relative overflow-hidden"
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    const startX = touch.clientX;
                    const handleMove = (e: TouchEvent) => {
                      const moveX = e.touches[0].clientX;
                      if (startX - moveX > 50) {
                        setSwipedTransaction(tx.id);
                      }
                    };
                    const handleEnd = () => {
                      document.removeEventListener('touchmove', handleMove);
                      document.removeEventListener('touchend', handleEnd);
                    };
                    document.addEventListener('touchmove', handleMove);
                    document.addEventListener('touchend', handleEnd);
                  }}
                >
                  {swipedTransaction === tx.id && (
                    <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-3 bg-destructive/10">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          toast.info('Изменение категории');
                          setSwipedTransaction(null);
                        }}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteTransaction(tx.id)}
                      >
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                  )}
                  <div 
                    className={`flex items-center justify-between py-3 px-2 border-b last:border-0 bg-card transition-transform ${
                      swipedTransaction === tx.id ? '-translate-x-28' : ''
                    }`}
                  >
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
                </div>
              ))}
            </div>
          </Card>
        </div>

        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <Icon name="Plus" size={28} />
        </button>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Добавить операцию
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Сумма</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">₽</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`pl-8 text-lg font-semibold h-12 ${!amount && 'border-destructive/50'}`}
                  />
                </div>
                {!amount && <p className="text-xs text-destructive mt-1">Введите сумму</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Комментарий</label>
                <Textarea
                  placeholder="Например: Макдональдс, АЗС, Кино..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Категория</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cat.emoji}</span>
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Счет</label>
                <Select value={account} onValueChange={setAccount}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{acc.emoji}</span>
                          <span>{acc.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Дата</label>
                <Select value={date} onValueChange={setDate}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Сегодня</SelectItem>
                    <SelectItem value="yesterday">Вчера</SelectItem>
                    <SelectItem value="custom">Выбрать дату</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1 h-12"
                >
                  Отменить
                </Button>
                <Button
                  onClick={handleSaveTransaction}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
