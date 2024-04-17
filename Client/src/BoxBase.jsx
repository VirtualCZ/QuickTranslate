import { Box } from '@mantine/core';
import React from 'react';

function BoxBase({ children }) {
    return (
        <Box
            bg="dark.5"
            style={{ borderRadius: 15 }}
        >
            {children}
        </Box>
    );
}

export default BoxBase;
