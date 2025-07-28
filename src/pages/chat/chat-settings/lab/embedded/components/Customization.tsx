
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Paper,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const Customization: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Bot Setting
    botName: "Botify",
    chatBg: "#f7f7fa",
    botTriggerImage: undefined as string | undefined,
    botHeaderBg: "#1976d2",
    botHeaderTextColor: "#fff",
    tagline: "We typically reply in few minutes.",
    // quickReplies removed
    showAttachment: true,
    showEmoji: true,
    showPoweredBy: true,
    // Bot Setting
    botAvatar: undefined as string | undefined,
    botBubbleBg: "#e3f2fd",
    botBubbleTextColor: "#222",
    // User Setting
    userAvatar: undefined as string | undefined,
    userBubbleBg: "#1976d2",
    userBubbleTextColor: "#fff",
    // Sound
    userMessageSound: true,
    botMessageSound: true,
    typingSound: true,
    // Misc
    fontSize: 15,
    bubbleStyle: true
  });

  // Handle avatar or image upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'botAvatar' | 'userAvatar' | 'botTriggerImage') => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setSettings(prev => ({ ...prev, [key]: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };



  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Bot Customization
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Personalize your chat bot's appearance and behavior. Adjust settings below and preview your changes live.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Settings column */}
        <Box flex={1} minWidth={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: { xs: 0, md: 2 } }}>
            <Paper elevation={2} sx={{ p: 0, borderRadius: 3, background: '#f9fafe' }}>
              <Accordion defaultExpanded sx={{ boxShadow: 'none', background: 'transparent' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>General Bot Setting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {/* Bot Name */}
                    <TextField
                      label="Bot Name"
                      value={settings.botName}
                      onChange={e => setSettings(prev => ({ ...prev, botName: e.target.value }))}
                      fullWidth
                    />
                    {/* Tagline/Status */}
                    <TextField
                      label="Tagline/Status"
                      value={settings.tagline}
                      onChange={e => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                      fullWidth
                    />
                    {/* Chat Window Background Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Chat Background</Typography>
                      <TextField
                        type="color"
                        value={settings.chatBg}
                        onChange={e => setSettings(prev => ({ ...prev, chatBg: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the background color for the chat window.
                      </Typography>
                    </Box>

                    {/* Bot Trigger Image */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bot Trigger</Typography>
                      <label htmlFor="bot-trigger-upload">
                        <InputAdornment position="start">
                          <input
                            accept="image/*"
                            id="bot-trigger-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={e => handleAvatarChange(e, 'botTriggerImage')}
                          />
                          <IconButton component="span">
                            {settings.botTriggerImage ? (
                              <Avatar src={settings.botTriggerImage} />
                            ) : (
                              <NotificationsActiveIcon />
                            )}
                            <PhotoCamera fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      </label>
                      <Typography variant="caption" color="text.secondary">
                        Upload or change the trigger image for the bot (chat launcher).
                      </Typography>
                    </Box>
                    {/* Show Attachments/Emoji/PoweredBy */}
                    <Box display="flex" gap={2} flexDirection={'column'}>
                      <FormControlLabel
                        control={<Switch checked={settings.showAttachment} onChange={() => setSettings(prev => ({ ...prev, showAttachment: !prev.showAttachment }))} />}
                        label="Show Attachment Icon"
                      />
                      <FormControlLabel
                        control={<Switch checked={settings.showEmoji} onChange={() => setSettings(prev => ({ ...prev, showEmoji: !prev.showEmoji }))} />}
                        label="Show Emoji Icon"
                      />
                      <FormControlLabel
                        control={<Switch checked={settings.showPoweredBy} onChange={() => setSettings(prev => ({ ...prev, showPoweredBy: !prev.showPoweredBy }))} />}
                        label="Show Powered By"
                      />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Header Background</Typography>
                      <TextField
                        type="color"
                        value={settings.botHeaderBg}
                        onChange={e => setSettings(prev => ({ ...prev, botHeaderBg: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the background color of the chat window header.
                      </Typography>
                    </Box>
                    {/* Bot Header Text Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Header Text Color</Typography>
                      <TextField
                        type="color"
                        value={settings.botHeaderTextColor}
                        onChange={e => setSettings(prev => ({ ...prev, botHeaderTextColor: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the text color of the chat window header.
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
            <Paper elevation={2} sx={{ p: 0, borderRadius: 3, background: '#f9fafe' }}>
              <Accordion sx={{ boxShadow: 'none', background: 'transparent' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Bot Setting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {/* Bot Avatar */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bot Avatar</Typography>
                      <label htmlFor="bot-avatar-upload">
                        <InputAdornment position="start">
                          <input
                            accept="image/*"
                            id="bot-avatar-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={e => handleAvatarChange(e, 'botAvatar')}
                          />
                          <IconButton component="span">
                            <Avatar src={settings.botAvatar} />
                            <PhotoCamera fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      </label>
                      <Typography variant="caption" color="text.secondary">
                        Upload or change the avatar image for your bot.
                      </Typography>
                    </Box>
                    {/* Bot Bubble Background Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bubble BG</Typography>
                      <TextField
                        type="color"
                        value={settings.botBubbleBg}
                        onChange={e => setSettings(prev => ({ ...prev, botBubbleBg: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the background color for bot messages.
                      </Typography>
                    </Box>
                    {/* Bot Bubble Text Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bubble Text</Typography>
                      <TextField
                        type="color"
                        value={settings.botBubbleTextColor}
                        onChange={e => setSettings(prev => ({ ...prev, botBubbleTextColor: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the text color for bot messages.
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
            <Paper elevation={2} sx={{ p: 0, borderRadius: 3, background: '#f9fafe' }}>
              <Accordion sx={{ boxShadow: 'none', background: 'transparent' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>User Setting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {/* User Avatar */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">User Avatar</Typography>
                      <label htmlFor="user-avatar-upload">
                        <InputAdornment position="start">
                          <input
                            accept="image/*"
                            id="user-avatar-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={e => handleAvatarChange(e, 'userAvatar')}
                          />
                          <IconButton component="span">
                            <Avatar src={settings.userAvatar} />
                            <PhotoCamera fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      </label>
                      <Typography variant="caption" color="text.secondary">
                        Upload or change the avatar image for the user.
                      </Typography>
                    </Box>
                    {/* User Bubble Background Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bubble BG</Typography>
                      <TextField
                        type="color"
                        value={settings.userBubbleBg}
                        onChange={e => setSettings(prev => ({ ...prev, userBubbleBg: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the background color for user messages.
                      </Typography>
                    </Box>
                    {/* User Bubble Text Color */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography minWidth={120} variant="body2">Bubble Text</Typography>
                      <TextField
                        type="color"
                        value={settings.userBubbleTextColor}
                        onChange={e => setSettings(prev => ({ ...prev, userBubbleTextColor: e.target.value }))}
                        sx={{ width: 48, p: 0, minWidth: 0 }}
                        inputProps={{ style: { padding: 0, width: 32, height: 32 } }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Set the text color for user messages.
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
            <Paper elevation={2} sx={{ p: 0, borderRadius: 3, background: '#f9fafe' }}>
              <Accordion sx={{ boxShadow: 'none', background: 'transparent' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Sound</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.userMessageSound}
                          onChange={() => setSettings(prev => ({ ...prev, userMessageSound: !prev.userMessageSound }))}
                          color="primary"
                        />
                      }
                      label="User Message Sound"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.botMessageSound}
                          onChange={() => setSettings(prev => ({ ...prev, botMessageSound: !prev.botMessageSound }))}
                          color="primary"
                        />
                      }
                      label="Bot Message Sound"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.typingSound}
                          onChange={() => setSettings(prev => ({ ...prev, typingSound: !prev.typingSound }))}
                          color="primary"
                        />
                      }
                      label="Typing Sound"
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Box>
        </Box>
        {/* Preview column */}
        <Box flex={1} minWidth={0}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Live Preview
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <Paper sx={{ p: 0, background: 'transparent', borderRadius: 2, minHeight: 500, boxShadow: 0, overflow: 'hidden' }}>
              {/* Chat Window */}
              <Box sx={{
                background: settings.chatBg,
                borderRadius: 3,
                mx: 2,
                my: 2,
                boxShadow: 2,
                overflow: 'hidden',
                minWidth: 340,
                maxWidth: 370,
                border: '1.5px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 480
              }}>
                {/* Header */}
                <Box sx={{ background: settings.botHeaderBg, color: settings.botHeaderTextColor, px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderTopLeftRadius: 12, borderTopRightRadius: 12, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
                  <Avatar src={settings.botAvatar} sx={{ width: 32, height: 32, mr: 1 }} />
                  <Box flex={1}>
                    <Typography fontWeight={600} fontSize={18}>{settings.botName}</Typography>
                    <Typography fontSize={13} color={settings.botHeaderTextColor} sx={{ opacity: 0.85 }}>{settings.tagline}</Typography>
                  </Box>
                  <Button size="small" sx={{ minWidth: 32, color: settings.botHeaderTextColor, fontWeight: 700, fontSize: 22, p: 0, background: 'transparent', boxShadow: 'none', '&:hover': { background: 'rgba(0,0,0,0.04)' } }}>⋮</Button>
                </Box>
                <Divider />
                {/* Chat Body */}
                <Box sx={{ p: 2, minHeight: 120, display: 'flex', flexDirection: 'column', gap: 2, background: 'transparent' }}>
                  {/* Bot message */}
                  <Box display="flex" alignItems="flex-end" mb={1}>
                    <Avatar src={settings.botAvatar} sx={{ mr: 1 }} />
                    <Box
                      sx={{
                        background: settings.botBubbleBg,
                        color: settings.botBubbleTextColor,
                        fontSize: settings.fontSize,
                        fontFamily: 'inherit',
                        borderRadius: settings.bubbleStyle ? 18 : 4,
                        px: 2.5,
                        py: 1.2,
                        maxWidth: 320,
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
                        border: '1px solid #e0e0e0',
                        mb: 0.5,
                        transition: 'box-shadow 0.2s',
                        '&:hover': { boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }
                      }}
                    >
                      Hi
                    </Box>
                  </Box>
                  {/* User message */}
                  <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
                    <Box
                      sx={{
                        background: settings.userBubbleBg,
                        color: settings.userBubbleTextColor,
                        fontSize: settings.fontSize,
                        fontFamily: 'inherit',
                        borderRadius: settings.bubbleStyle ? 18 : 4,
                        px: 2.5,
                        py: 1.2,
                        maxWidth: 320,
                        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
                        border: '1px solid #e0e0e0',
                        mb: 0.5,
                        mr: 1,
                        transition: 'box-shadow 0.2s',
                        '&:hover': { boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }
                      }}
                    >
                      Shipping rates to USA
                    </Box>
                    <Avatar src={settings.userAvatar} />
                  </Box>
                </Box>
                <Divider />
                {/* Chat Input */}
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1, background: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTop: '1px solid #e0e0e0' }}>
                  {settings.showAttachment && <IconButton size="small"><span role="img" aria-label="attachment">📎</span></IconButton>}
                  {settings.showEmoji && <IconButton size="small"><span role="img" aria-label="emoji">😊</span></IconButton>}
                  <TextField
                    placeholder="Enter your message..."
                    size="small"
                    fullWidth
                    sx={{ background: '#f7f7fa', borderRadius: 2, '& .MuiInputBase-root': { py: 0.5 } }}
                    InputProps={{ style: { fontSize: settings.fontSize } }}
                  />
                  <Button variant="contained" color="primary">
                    <PlayArrowIcon />
                  </Button>
                </Box>
                {/* Powered by */}
                {settings.showPoweredBy && (
                  <Box sx={{ textAlign: 'center', fontSize: 11, color: 'text.secondary', py: 0.5, background: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTop: '1px solid #e0e0e0', letterSpacing: 0.2 }}>
                    Powered by <b>Botify</b>
                  </Box>
                )}
              </Box>
              {/* Bot Trigger (Launcher) at bottom right */}
              <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 2 }}>
                <Button variant="contained" sx={{ borderRadius: '50%', minWidth: 56, minHeight: 56, width: 56, height: 56, background: settings.botHeaderBg }}>
                  {settings.botTriggerImage ? (
                    <Avatar src={settings.botTriggerImage} sx={{ width: 40, height: 40 }} />
                  ) : (
                    <NotificationsActiveIcon fontSize="large" />
                  )}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Customization;
