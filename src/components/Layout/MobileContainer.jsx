import React from 'react';

const MobileContainer = ({ children }) => {
    return (
        <div style={{
            paddingTop: 'var(--safe-area-top)',
            paddingBottom: 'var(--safe-area-bottom)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            {children}
        </div>
    );
};

export default MobileContainer;
