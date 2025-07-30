
import React, { useState } from "react";
import { Typography, IconButton, TextField, Tooltip, Paper, Tabs, Tab, Box, Switch, FormControlLabel } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChatTopPannel from "../../../ChatTopPannel";
import { useParams } from "react-router-dom";
import UserSessions from "./components/UserSessions";
import Customization from "./components/Customization";
import FAQs from "./components/FAQs";
import AuthenticateUser from "./components/AuthenticateUser";


const TAB_LABELS = [
  "Embeded",
  "User Sessions",
  "Customization",
  "Faq",
  "Authenticate User"
];

const Embedded: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { chatBotId } = useParams();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`<script src="https://botify.exyconn.com/static/embed/chat/botify-chat.js?chatBotId=${chatBotId}"></script>`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  const EMBED_SCRIPT = `<script src="https://botify.exyconn.com/static/embed/chat/botify-chat.js?chatBotId=${chatBotId}"></script>`;

  return (
    <section className="chat-lab">
      <ChatTopPannel />
      <div className="container py-4">
        <Box>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            {TAB_LABELS.map((label) => (
              <Tab key={label} label={label} sx={{ minWidth: 160, fontWeight: 600 }} />
            ))}
          </Tabs>
          <Box sx={{}}>
            {tab === 0 && (
              <div>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  Embed Botify Chat Widget
                </Typography>
                <Box mb={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enabled}
                        onChange={() => setEnabled((prev) => !prev)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {enabled ? "Widget is enabled. The script below will work on your site." : "Widget is disabled. The script will not function until enabled."}
                      </Typography>
                    }
                  />
                  <Typography variant="caption" color="text.secondary">
                    Use this switch to turn the chat widget on or off for your website. Disabling will prevent the widget from loading even if the script is present.
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Copy and paste the following script tag into your website's <b>&lt;head&gt;</b> or <b>&lt;body&gt;</b> to enable the Botify chat widget.
                </Typography>
                <Paper sx={{ display: "flex", alignItems: "center", p: 2, background: "#f7f7fa", borderRadius: 2, mb: 2 }}>
                  <TextField
                    value={EMBED_SCRIPT}
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: 'monospace', fontSize: 15, background: "#f7f7fa" },
                      endAdornment: (
                        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                          <span>
                            <IconButton onClick={handleCopy} edge="end" color={copied ? "success" : "primary"} disabled={!enabled}>
                              <ContentCopyIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    disabled={!enabled}
                  />
                </Paper>
                {copied && (
                  <Typography color="success.main" fontWeight={500} mt={1}>
                    Script copied to clipboard!
                  </Typography>
                )}
              </div>
            )}
            {tab === 1 && (
              <UserSessions />
            )}
            {tab === 2 && (
              <Customization />
            )}
            {tab === 3 && (
              <FAQs />
            )}
            {tab === 4 && (
              <AuthenticateUser />
            )}
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default Embedded;
