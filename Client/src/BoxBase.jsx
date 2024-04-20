import { Box } from '@mantine/core';
import React from 'react';

function BoxBase({ children }) {
    return (
        <Box
            bg="dark.5"
            style={{ 
                border: "1px solid var(--mantine-color-dark-4)",
                borderRadius: "20px"
            }}
        >
            {children}
        </Box>
    );
}

export default BoxBase;
