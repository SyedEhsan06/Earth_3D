// Controls.js
import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Switch,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon

const Controls = ({ onToggleTheme, onToggleFeature }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to toggle the drawer visibility



  const toggleFeature = (feature) => (event) => {
    setCheckedFeatures({
      ...checkedFeatures,
      [feature]: event.target.checked,
    });
    onToggleFeature(feature, event.target.checked);
    
  };
  const [checkedFeatures, setCheckedFeatures] = useState({
    darkMode: false,
    moon: false,
    sun: false,
    clouds: true,
    stars: true,
    moonMotion: false,
    earthMotion: true,
    cloudMotion: true,
  });
  
  return (
    <div
      className="absolute top-0 left-0  h-full flex flex-col items-center justify-center"

      // }
    >
      {/* Hamburger icon for drawer toggle */}
      <IconButton
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 200,
          color: "white",
          transform: isDrawerOpen ? "translateX(200px)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
        aria-label="menu"
      >
        <FaBars size={24} />
      </IconButton>

      {/* Controls Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: "75vh", // 65% of the viewport height
            backgroundColor: "#ffffff2b", // More transparent for a stronger glass effect
            backdropFilter: "blur(2px)", // Increase blur for glassmorphism
            borderRadius: "8px", // Rounded corners for a modern look
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            color: "white", // White text color for better contrast
          },
        }}
      >
        {/* Drawer Content */}

        <Box sx={{ width: 200, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 2,
            }}
          >
            <div className="bg-gray-500 p-1 w-full rounded-lg flex items-center justify-between">
              <Typography variant="body1" sx={{ color: "white" ,fontSize: "20px", fontWeight: "bold"}}>
                {checkedFeatures.darkMode ? "Night" : "Day"}
              </Typography>
              <Switch
                size="medium"
                checked={checkedFeatures.darkMode}
                onChange={toggleFeature("darkMode")}
                color="primary"
              />
            </div>
          </Box>
          {/* Divider */}
          <Divider sx={{ backgroundColor: "white" }} />

          {/* Additional Controls */}
          <List>
            {[
              { label: "Moon", feature: "moon" },
              // { label: "Sun", feature: "sun" },
              { label: "Clouds", feature: "clouds" },
              { label: "Stars", feature: "stars" },
              { label: "Moon Motion", feature: "moonMotion" },
              { label: "Earth Motion", feature: "earthMotion" },
              { label: "Cloud Motion", feature: "cloudMotion" },
            ].map((control, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <ListItemText
                  primary={control.label}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "white",
                    fontSize: "16px",
                  }}
                />
                <Switch
                  size="small"
                  checked={checkedFeatures[control.feature]}
                  onChange={toggleFeature(control.feature)}
                  color="secondary"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Controls;
