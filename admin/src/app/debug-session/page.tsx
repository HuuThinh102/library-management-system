'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Box, Typography, Paper, Button } from '@mui/material';
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default function DebugSessionPage() {
    const [sessionData, setSessionData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            try {
                const session = await getSession();
                console.log('Session data:', session);
                setSessionData(session);
            } catch (error) {
                console.error('Error fetching session:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb={2}>Session Debug Page</Typography>

            {loading ? (
                <Typography>Loading session data...</Typography>
            ) : (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" mb={2}>Session Data:</Typography>
                    {sessionData ? (
                        <pre style={{ overflow: 'auto', maxWidth: '100%' }}>
                            {JSON.stringify(sessionData, null, 2)}
                        </pre>
                    ) : (
                        <Typography color="error">No session found!</Typography>
                    )}
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.location.href = '/librarians'}
                        >
                            Back to App
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}