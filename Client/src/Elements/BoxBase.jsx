import { Box } from '@mantine/core';
import React from 'react';

function BoxBase({ children }) {
    return (
        <Box
            style={{ 
                borderRadius: "20px",
                border: "1px solid var(--mantine-color-dark-4)",
            }}
        >
            {children}
        </Box>
    );
}

export default BoxBase;
