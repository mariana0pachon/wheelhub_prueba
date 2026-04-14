import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Form, Checkbox, Table, Tag, Slider, DatePicker, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';

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
        <div style={{ display: 'flex', gap: 4, maxWidth: 500, marginBottom: 8, flexWrap: 'wrap' }}>
          {superpowers.slice(0, 3).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      );
    },
  },
];

const PAGE_SIZE = 5;

export default function UsersPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const elements = searchParams.getAll('elements');
  const fromLuckyNumber = searchParams.get('fromLuckyNumber');
  const toLuckyNumber = searchParams.get('toLuckyNumber');
  const fromBirthday = searchParams.get('fromBirthday');
  const toBirthday = searchParams.get('toBirthday');
  const skip = Number(searchParams.get('skip') ?? 0);
  const currentPage = Math.floor(skip / PAGE_SIZE) + 1;

  useEffect(() => {
    fetch(`/api/users?${searchParams}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);

  function handlePageChange(newPage: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('skip', String((newPage - 1) * PAGE_SIZE));
      return next;
    });
  }

  function handleElementsChange(values: string[]) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('elements');
      values.forEach((el) => next.append('elements', el));
      next.delete('skip');
      return next;
    });
  }

  function handleLuckyRangeChange(values: [number, number]) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (values[0] == 0 && values[1] == 0) {
        next.delete('fromLuckyNumber');
        next.delete('toLuckyNumber');
      } else {
        next.set('fromLuckyNumber', String(values[0]));
        next.set('toLuckyNumber', String(values[1]));
      }

      next.delete('skip');
      return next;
    });
  }

  function handleBirthdayRangeChange(values: [Dayjs | null, Dayjs | null] | null) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (values?.[0] && values?.[1]) {
        next.set('fromBirthday', values[0].format('YYYY-MM-DD'));
        next.set('toBirthday', values[1].format('YYYY-MM-DD'));
      } else {
        next.delete('fromBirthday');
        next.delete('toBirthday');
      }
      next.delete('skip');
      return next;
    });
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>Personajes</h1>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate('/users/new', { state: { from: `/users?${searchParams}` } })}
        ></Button>
      </div>
      <Form.Item label='Signo de'>
        <Checkbox.Group
          options={ELEMENTS}
          value={elements}
          onChange={(values) => handleElementsChange(values as string[])}
        />
      </Form.Item>
      <Form.Item label='Número de la suerte (> 0)'>
        <Slider
          range
          min={0}
          max={100}
          value={[Number(fromLuckyNumber), Number(toLuckyNumber)]}
          onChange={(values) => handleLuckyRangeChange(values as [number, number])}
        />
      </Form.Item>
      <Form.Item label='Cumpleaños'>
        <DatePicker.RangePicker
          value={[fromBirthday ? dayjs(fromBirthday) : null, toBirthday ? dayjs(toBirthday) : null]}
          onChange={handleBirthdayRangeChange}
        />
      </Form.Item>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={false}
        onRow={(user) => ({
          onClick: () =>
            navigate(`/users/${user.id}`, { state: { from: `/users?${searchParams}` } }),
          style: { cursor: 'pointer' },
        })}
      />
      <Pagination
        simple
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={total}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
