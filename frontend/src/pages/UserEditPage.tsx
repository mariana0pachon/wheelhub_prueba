import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, DatePicker, Descriptions, Input, InputNumber, Spin, Tag } from 'antd';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AvatarCanvas from '../components/AvatarCanvas';

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

export default function UserEditPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const location = useLocation();
  const backUrl = location.state?.from || '/users';

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState<string | null>(null);
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [superInput, setSuperInput] = useState('');
  const [avatarDraft, setAvatarDraft] = useState<{ bgColor: string; svg: string } | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setName(data.name);
        setBirthday(data.birthday);
        setLuckyNumber(data.luckyNumber);
        setSuperpowers(data.superpowers ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const avatar = avatarDraft ?? user?.avatar;

    const body = {
      name,
      birthday: birthday || undefined,
      luckyNumber: luckyNumber ?? undefined,
      superpowers: superpowers.length ? superpowers : undefined,
      avatar,
    };

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      navigate(`/users/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'unknown error');
      setSaving(false);
    }
  }

  function handleAddSuperpower() {
    const val = superInput.trim();
    if (val && !superpowers.includes(val)) setSuperpowers((prev) => [...prev, val]);
    setSuperInput('');
  }

  if (loading) return <Spin style={{ marginTop: 48, display: 'block' }} />;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div style={{ maxWidth: 800 }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <a onClick={() => navigate(backUrl)}>Personajes</a> },
          { title: <a onClick={() => navigate(`/users/${id}`)}>{user.name}</a> },
          { title: 'Editar' },
        ]}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='nombre'
          size='large'
          style={{ maxWidth: 600 }}
        />
        <Button icon={<CloseOutlined />} onClick={() => navigate(`/users/${id}`)} size='large' />
        <Button icon={<SaveOutlined />} onClick={handleSave} loading={saving} size='large' />
      </div>

      <AvatarCanvas
        initialBgColor={user.avatar?.bgColor}
        existingAvatar={user.avatar}
        onChange={setAvatarDraft}
      />

      <Descriptions column={1} bordered>
        <Descriptions.Item label='cumpleaños'>
          <DatePicker
            value={birthday ? dayjs(birthday) : null}
            onChange={(d) => setBirthday(d ? d.format('YYYY-MM-DD') : null)}
            style={{ width: '100%' }}
          />
        </Descriptions.Item>
        <Descriptions.Item label='número de la suerte'>
          <InputNumber value={luckyNumber} onChange={(v) => setLuckyNumber(v)} />
        </Descriptions.Item>
        <Descriptions.Item label='superpoderes'>
          <div
            style={{ display: 'flex', gap: 4, maxWidth: 500, marginBottom: 8, flexWrap: 'wrap' }}
          >
            {superpowers.map((s) => (
              <Tag
                key={s}
                closable
                onClose={() => setSuperpowers((prev) => prev.filter((p) => p !== s))}
              >
                {s}
              </Tag>
            ))}
          </div>
          <Input
            size='small'
            value={superInput}
            onChange={(e) => setSuperInput(e.target.value)}
            onPressEnter={handleAddSuperpower}
            placeholder='nuevo superpoder + Enter'
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
