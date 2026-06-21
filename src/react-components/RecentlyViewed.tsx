import React, { useEffect, useState } from 'react';

interface ViewedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Styles {
  wrapper: React.CSSProperties;
  heading: React.CSSProperties;
  scrollRow: React.CSSProperties;
  card: React.CSSProperties;
  image: React.CSSProperties;
  name: React.CSSProperties;
  price: React.CSSProperties;
}

const styles: Styles = {
  wrapper: {
    padding: '2rem 5%',
    fontFamily: 'inherit',
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#1A1A2E',
    marginBottom: '1.2rem',
  },
  scrollRow: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem',
  },
  card: {
    flex: '0 0 auto',
    width: '150px',
    textDecoration: 'none',
    color: 'inherit',
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '0.8rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.6rem',
  },
  name: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#1A1A2E',
    margin: '0 0 0.3rem 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: '0.9rem',
    fontWeight: 800,
    color: '#FF6B35',
    margin: 0,
  },
};

function RecentlyViewed() {
  const [items, setItems] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setItems(JSON.parse(stored));
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem('recentlyViewed');
      setItems(updated ? JSON.parse(updated) : []);
    };

    window.addEventListener('recentlyViewedUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('recentlyViewedUpdated', handleStorageChange);
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Recently Viewed</h2>
      <div style={styles.scrollRow}>
        {items.map((item) => (
          <a key={item.id} href={`/product/${item.id}`} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <p style={styles.name}>{item.name}</p>
            <p style={styles.price}>KSh {item.price.toLocaleString()}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;