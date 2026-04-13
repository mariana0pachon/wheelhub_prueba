import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Checkbox, Table, Tag, Slider } from 'antd';

// TODO: these could come from backend enum directly
const ELEMENTS = ['fuego', 'aire', 'agua', 'tierra'];

// TODO: move this somewhere shared probably
interface User {
  id: number;
  name: string;
  birthday: string | null;
  luckyNumber: number | null;
  superpowers: string[] | null;
  starSign: string | null;
  createdAt: string;
  avatar: any; // it's a jsonb in the db
}

const columns = [
  {
    title: 'nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'signo',
    dataIndex: 'starSign',
    key: 'starSign',
  },
  {
    title: 'número de la suerte',
    dataIndex: 'luckyNumber',
    key: 'luckyNumber',
  },
  {
    title: 'superpowers',
    dataIndex: 'superpowers',
    key: 'superpowers',
    render: (superpowers: string[] | null) => {
      if (!superpowers) return '-';
      return (
        <div className='flex space-between'>
          {superpowers.slice(0, 3).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      );
    },
  },
];

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const elements = searchParams.getAll('elements');
  const fromLuckyNumber = searchParams.get('fromLuckyNumber');
  const toLuckyNumber = searchParams.get('toLuckyNumber');

  useEffect(() => {
    fetch(`/api/users?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);

  function handleElementsChange(values: string[]) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('elements');
      values.forEach((el) => next.append('elements', el));
      return next;
    });
  }

  function handleLuckyRangeChange(values: [number, number]) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('fromLuckyNumber', String(values[0]));
      next.set('toLuckyNumber', String(values[1]));
      return next;
    });
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Personajes</h1>
      <Form.Item label='Signo de'>
        <Checkbox.Group
          options={ELEMENTS}
          value={elements}
          onChange={(values) => handleElementsChange(values as string[])}
        />
      </Form.Item>
      <Form.Item label='Número de la suerte'>
        <Slider
          range
          min={1}
          max={100}
          value={[Number(fromLuckyNumber), Number(toLuckyNumber)]}
          onChange={(values) => handleLuckyRangeChange(values as [number, number])}
        />
      </Form.Item>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
