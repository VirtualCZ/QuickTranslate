import { Stack } from '@mantine/core';
import React from 'react';

function StackBase({ children }) {
    return (
        <Stack
            align="stretch"
            justify="center"
            gap="md"
            bg="dark.5"
            style={{ borderRadius: 15 }}
            p={10}
        >
            {children}
        </Stack>
    );
}

export default StackBase;
