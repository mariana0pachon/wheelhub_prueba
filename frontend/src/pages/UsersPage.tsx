import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';

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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Star Sign',
    dataIndex: 'starSign',
    key: 'starSign',
  },
  {
    title: 'Lucky Number',
    dataIndex: 'luckyNumber',
    key: 'luckyNumber',
  },
  {
    title: 'Superpowers',
    dataIndex: 'superpowers',
    key: 'superpowers',
    render: (superpowers: string[] | null) => {
      if (!superpowers) return '-';
      return superpowers.slice(0, 3).map((s) => <Tag key={s}>{s}</Tag>);
    },
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users')
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
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>
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
