import { useState } from 'react';
import { Box, Button, Typography, Drawer, IconButton } from '@mui/material';
import RegisteredTools from "./RegisteredTools";
import EventSource from './EventSource';
import ChatTest from "./chat-test/ChatTest";
import CloseIcon from '@mui/icons-material/Close';

const MCPClientWithChatGPT = () => {
  const [tools, setTools] = useState<any[]>([]);
  const [mcpClient, setMcpClient] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className='col-12'>
          <EventSource
            onConnected={(tools, mcpClient) => {
              setTools(tools);
              setMcpClient(mcpClient);
            }}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <Box
            sx={{
              background: "#fff",
              borderRadius: 2,
              p: 2,
              mb: 1,
              border: "1px solid #e0e0e0"
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: "100%",
                mb: 2,
                fontSize: 15,
                fontWeight: 500,
                textAlign: "center",
                background: "#e3f2fd",
                borderRadius: 1,
                px: 2,
                py: 1,
                color: "#1976d2"
              }}
            >
              Save the server for this chat. When you're done testing, click here to start chatting in the main window.
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 180, fontWeight: 600 }}
                disabled={!mcpClient}
                onClick={() => setDrawerOpen(true)}
              >
                Test your server before saving
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 180, fontWeight: 600 }}
                disabled={!mcpClient}
              >
                Save Server For Chat
              </Button>
            </Box>
          </Box>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 500 }, maxWidth: '100vw', p: 0 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Test Your Server
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <RegisteredTools tools={tools} />
        </Box>
        <Box sx={{ p: 2 }}>
          <ChatTest tools={tools} mcpClient={mcpClient} />
        </Box>
      </Drawer>
    </div>
  );
};

export default MCPClientWithChatGPT;
