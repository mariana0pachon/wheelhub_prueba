import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Descriptions, Spin, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface User {
  id: number;
  name: string;
  birthday: string | null;
  luckyNumber: number | null;
  superpowers: string[] | null;
  starSign: string | null;
  createdAt: string;
  avatar: { bgColor?: string; svg?: string } | null;
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin style={{ marginTop: 48, display: 'block' }} />;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div style={{ maxWidth: 600 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {user.name}
        </Typography.Title>
        <Button icon={<EditOutlined />} onClick={() => navigate(`/users/${id}/edit`)} />
      </div>

      {user.avatar?.svg && (
        <div
          style={{
            display: 'inline-block',
            marginBottom: 24,
          }}
          dangerouslySetInnerHTML={{ __html: user.avatar.svg }}
        />
      )}

      <Descriptions column={1} bordered>
        <Descriptions.Item label='cumpleaños'>{user.birthday ?? '-'}</Descriptions.Item>
        <Descriptions.Item label='signo'>{user.starSign ?? '-'}</Descriptions.Item>
        <Descriptions.Item label='número de la suerte'>{user.luckyNumber ?? '-'}</Descriptions.Item>
        <Descriptions.Item label='superpoderes'>
          {user.superpowers?.length ? user.superpowers.map((s) => <Tag key={s}>{s}</Tag>) : '-'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
