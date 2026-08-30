import { useState } from 'react';

function ReferFriend() {
  const [open, setOpen] = useState(false);
  const siteUrl = 'https://coretechtalents.com';
  const shareText = `Check out Coretech Talents - find your next job or hire top talent: ${siteUrl}`;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent('Check out Coretech Talents')}&body=${encodeURIComponent(shareText)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      alert('Link copied!');
    } catch (err) {
      console.error('Copy failed:', err);
    }
    setOpen(false);
  };

  return (
    <div className="refer-friend-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className="refer-friend-btn"
        onClick={() => setOpen(!open)}
        style={{
          background: 'transparent',
          border: '1px solid #2554E8',
          color: '#2554E8',
          padding: '6px 14px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600
        }}
      >
        Refer a Friend
      </button>

      {open && (
        <div
          className="refer-friend-menu"
          style={{
            position: 'absolute',
            bottom: '110%',
            left: 0,
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minWidth: '160px',
            zIndex: 10
          }}
        >
          <button onClick={handleWhatsApp} style={menuItemStyle}>WhatsApp</button>
          <button onClick={handleEmail} style={menuItemStyle}>Email</button>
          <button onClick={handleCopyLink} style={menuItemStyle}>Copy Link</button>
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  padding: '8px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#0B2E59'
};

export default ReferFriend;