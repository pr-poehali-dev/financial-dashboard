import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Request {
  id: number;
  userName: string;
  email: string;
  phone: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  adults: number;
  children: number;
  budget: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  comment?: string;
}

const mockRequests: Request[] = [
  {
    id: 1,
    userName: 'Иванов Иван Иванович',
    email: 'ivanov@mail.ru',
    phone: '+7 999 111 22 33',
    destination: 'Мальдивы',
    dateFrom: '2025-12-15',
    dateTo: '2025-12-25',
    adults: 2,
    children: 0,
    budget: '300000-400000',
    status: 'new',
    createdAt: '2025-11-01 10:30',
    comment: 'Хотелось бы отель на первой линии с all inclusive'
  },
  {
    id: 2,
    userName: 'Петрова Мария Сергеевна',
    email: 'petrova@gmail.com',
    phone: '+7 999 222 33 44',
    destination: 'Италия (Рим, Венеция)',
    dateFrom: '2025-11-20',
    dateTo: '2025-11-27',
    adults: 2,
    children: 1,
    budget: '200000-250000',
    status: 'processing',
    createdAt: '2025-10-28 14:15',
    comment: 'Интересуют экскурсионные туры'
  },
  {
    id: 3,
    userName: 'Сидоров Петр Алексеевич',
    email: 'sidorov@yandex.ru',
    phone: '+7 999 333 44 55',
    destination: 'Таиланд (Пхукет)',
    dateFrom: '2026-01-10',
    dateTo: '2026-01-20',
    adults: 4,
    children: 2,
    budget: '500000-600000',
    status: 'new',
    createdAt: '2025-11-02 09:20',
    comment: 'Большая семья, нужны два номера рядом'
  },
  {
    id: 4,
    userName: 'Кузнецова Анна Владимировна',
    email: 'kuznetsova@mail.ru',
    phone: '+7 999 444 55 66',
    destination: 'Франция (Париж)',
    dateFrom: '2025-12-01',
    dateTo: '2025-12-08',
    adults: 1,
    children: 0,
    budget: '150000-200000',
    status: 'completed',
    createdAt: '2025-10-20 16:45'
  },
  {
    id: 5,
    userName: 'Смирнов Дмитрий Игоревич',
    email: 'smirnov@gmail.com',
    phone: '+7 999 555 66 77',
    destination: 'ОАЭ (Дубай)',
    dateFrom: '2025-11-15',
    dateTo: '2025-11-22',
    adults: 2,
    children: 0,
    budget: '250000-300000',
    status: 'processing',
    createdAt: '2025-10-25 11:30',
    comment: 'Интересует шоппинг и экскурсии'
  },
  {
    id: 6,
    userName: 'Волкова Елена Петровна',
    email: 'volkova@yandex.ru',
    phone: '+7 999 666 77 88',
    destination: 'Турция (Анталья)',
    dateFrom: '2025-11-25',
    dateTo: '2025-12-02',
    adults: 3,
    children: 1,
    budget: '180000-220000',
    status: 'new',
    createdAt: '2025-11-03 13:10'
  }
];

export default function Admin() {
  const [requests] = useState<Request[]>(mockRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusBadge = (status: Request['status']) => {
    const variants = {
      new: { label: 'Новая', variant: 'default' as const },
      processing: { label: 'В обработке', variant: 'secondary' as const },
      completed: { label: 'Завершена', variant: 'outline' as const },
      cancelled: { label: 'Отменена', variant: 'destructive' as const }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    processing: requests.filter(r => r.status === 'processing').length,
    completed: requests.filter(r => r.status === 'completed').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Панель администратора</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Управление заявками турагентства
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Icon name="User" size={18} className="mr-2" />
                Администратор
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/'}
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Всего заявок</CardDescription>
                <CardTitle className="text-4xl">{stats.total}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="FileText" size={18} />
                  <span className="text-sm">За все время</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Новые</CardDescription>
                <CardTitle className="text-4xl text-primary">{stats.new}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="AlertCircle" size={18} />
                  <span className="text-sm">Требуют внимания</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>В обработке</CardDescription>
                <CardTitle className="text-4xl text-secondary-foreground">{stats.processing}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={18} />
                  <span className="text-sm">В работе</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Завершено</CardDescription>
                <CardTitle className="text-4xl text-green-600">{stats.completed}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="CheckCircle" size={18} />
                  <span className="text-sm">Успешно</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Заявки от клиентов</CardTitle>
                  <CardDescription className="mt-1">
                    Управление запросами на туристические услуги
                  </CardDescription>
                </div>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить заявку
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск по имени, email или направлению..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                  >
                    Все
                  </Button>
                  <Button
                    variant={filterStatus === 'new' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('new')}
                  >
                    Новые
                  </Button>
                  <Button
                    variant={filterStatus === 'processing' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('processing')}
                  >
                    В работе
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Контакты</TableHead>
                      <TableHead>Направление</TableHead>
                      <TableHead>Даты</TableHead>
                      <TableHead>Гости</TableHead>
                      <TableHead>Бюджет (₽)</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          <Icon name="Search" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Заявки не найдены</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">#{request.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Icon name="User" size={16} className="text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{request.userName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {request.createdAt}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Icon name="Mail" size={14} />
                                <span>{request.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Icon name="Phone" size={14} />
                                <span>{request.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon name="MapPin" size={16} className="text-primary" />
                              <span className="font-medium">{request.destination}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{request.dateFrom}</div>
                              <div className="text-muted-foreground">{request.dateTo}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>Взр: {request.adults}</div>
                              <div className="text-muted-foreground">Дет: {request.children}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-sm">{request.budget}</div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(request.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Edit" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
