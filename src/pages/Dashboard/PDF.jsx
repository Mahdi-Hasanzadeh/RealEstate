import React, { useState } from "react";
import {
  pdf,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { CheckRounded, PictureAsPdfRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";

// Colors
const COLORS = {
  primary: "#4361ee",
  secondary: "#5f72ff",
  success: "#4cc9f0",
  danger: "#f72585",
  dark: "#14213d",
  light: "#f8f9fa",
  cardBg: "#ffffff",
  cardBorder: "#e9ecef",
  text: "#212529",
};

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: COLORS.light,
  },
  container: { backgroundColor: COLORS.cardBg, padding: 25, borderRadius: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: `1px solid ${COLORS.cardBorder}`,
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: COLORS.dark },
  dateText: { fontSize: 11, color: "#6c757d" },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottom: `2px solid ${COLORS.primary}`,
  },
  card: {
    width: "100%",
    marginBottom: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
    border: `1px solid #e0e0e0`,
  },
  cardTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 6 },
  cardValue: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  cardSubtext: { fontSize: 9, color: "#6c757d" },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  productCard: {
    width: "31.5%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.cardBorder}`,
    marginRight: "1%",
    marginBottom: 10,
  },
  productName: {
    fontWeight: 600,
    marginBottom: 5,
    color: COLORS.text,
    fontSize: 11,
  },
  productValue: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  deletionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  deletionItem: {
    width: "48%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.cardBg,
    border: "1px solid #e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "2%",
  },
  reasonText: { fontSize: 10, color: COLORS.text, fontWeight: "500" },
  countText: { fontSize: 10, fontWeight: "bold", color: COLORS.primary },
  footer: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: 9,
    paddingTop: 5,
    borderTop: `1px solid ${COLORS.cardBorder}`,
    marginTop: 5,
  },
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoText: { fontWeight: "bold", fontSize: 14, color: COLORS.primary },
});

// Icons
const GrowthIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M12 6l-8 8h16l-8-8z" fill={COLORS.success} />
  </Svg>
);
const DeclineIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M12 18l8-8H4l8 8z" fill={COLORS.danger} />
  </Svg>
);

// PDF Component
const DashboardPDF = ({ dashboardData }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  fill="none"
                  stroke={COLORS.primary}
                  strokeWidth="2"
                />
              </Svg>
              <Text style={styles.logoText}>AnalyticsHub</Text>
            </View>
            <Text style={styles.dateText}>
              Report generated on {currentDate}
            </Text>
          </View>

          {/* Metric Cards */}
          <View style={styles.section}>
            {[
              {
                title: "TOTAL LISTINGS THIS MONTH",
                value: dashboardData.totalThisMonth,
                subtext: `Compared to ${dashboardData.totalLastMonth} last month`,
                growth: dashboardData.growth,
              },
              {
                title: "MONTHLY GROWTH RATE",
                value: dashboardData.growth + "%",
                color:
                  dashboardData.growth > 0 ? COLORS.success : COLORS.danger,
              },
              { title: "TOTAL LISTINGS", value: dashboardData.totalItems },
            ].map((card, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text
                  style={{
                    ...styles.cardValue,
                    color: card.color || COLORS.dark,
                  }}
                >
                  {card.value}
                </Text>
                {card.growth !== undefined && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    {card.growth > 0 ? <GrowthIcon /> : <DeclineIcon />}
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: card.growth > 0 ? COLORS.success : COLORS.danger,
                        marginLeft: 6,
                      }}
                    >
                      {card.growth > 0 ? "+" : ""}
                      {card.growth}% from last month
                    </Text>
                  </View>
                )}
                {card.subtext && (
                  <Text style={styles.cardSubtext}>{card.subtext}</Text>
                )}
              </View>
            ))}
          </View>

          {/* Products Posted Today */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Products Posted Today</Text>
            <View style={styles.productGrid}>
              {dashboardData.todayProductsData.map((product, i) => (
                <View key={i} style={styles.productCard}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productValue}>{product.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Deletion Reasons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deletion Reasons</Text>
            <View style={styles.deletionContainer}>
              {Object.keys(dashboardData.deletionStats).map((reason) => (
                <View key={reason} style={styles.deletionItem}>
                  <Text style={styles.reasonText}>
                    {reason.replace(/_/g, " ")}
                  </Text>
                  <Text style={styles.countText}>
                    {dashboardData.deletionStats[reason]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>AnalyticsHub Dashboard Report • Confidential</Text>
        </View>
      </Page>
    </Document>
  );
};

const DownloadDashboardPDF = ({ dashboardData }) => {
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("idle"); // 'idle', 'preparing', 'generating'

  const handleDownload = async () => {
    if (loading) return;

    setPhase("preparing");

    // preparation animation (1.5s)
    await new Promise((res) => setTimeout(res, 3500));

    setPhase("generating");
    setLoading(true);

    try {
      const blob = await pdf(
        <DashboardPDF dashboardData={dashboardData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "analytics_dashboard_report.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
      setPhase("idle");
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleDownload}
      disabled={loading}
      startIcon={
        <Box
          sx={{
            position: "relative",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* PDF Icon */}
          <Box
            sx={{
              position: "absolute",
              transform: phase === "preparing" ? "scale(1.2)" : "scale(1)",
              animation:
                phase === "preparing"
                  ? "icon-pulse-glow 3s ease-in-out"
                  : "none",
              "@keyframes icon-pulse-glow": {
                "0%": {
                  transform: "scale(1)",
                  filter: "drop-shadow(0 0 0px #5f72ff)",
                },
                "25%": {
                  transform: "scale(1.3)",
                  filter: "drop-shadow(0 0 6px #5f72ff)",
                },
                "50%": {
                  transform: "scale(1.4)",
                  filter: "drop-shadow(0 0 12px #5f72ff)",
                },
                "75%": {
                  transform: "scale(1.3)",
                  filter: "drop-shadow(0 0 6px #5f72ff)",
                },
                "100%": {
                  transform: "scale(1)",
                  filter: "drop-shadow(0 0 0px #5f72ff)",
                },
              },
            }}
          >
            <PictureAsPdfRounded fontSize="medium" />
          </Box>

          {/* Particles */}
          {phase === "preparing" &&
            [...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "white",
                  opacity: 0,
                  animation: `particle-emit 1.2s ease-out ${
                    i * 0.15
                  }s forwards`,
                  "@keyframes particle-emit": {
                    "0%": {
                      opacity: 1,
                      transform: "translate(-50%, -50%) scale(0)",
                    },
                    "50%": {
                      transform: `translate(-50%, -50%) translate(${
                        Math.cos((i * 60 * Math.PI) / 180) * 20
                      }px, ${
                        Math.sin((i * 60 * Math.PI) / 180) * 20
                      }px) scale(1)`,
                      opacity: 1,
                    },
                    "100%": {
                      transform: `translate(-50%, -50%) translate(${
                        Math.cos((i * 60 * Math.PI) / 180) * 40
                      }px, ${
                        Math.sin((i * 60 * Math.PI) / 180) * 40
                      }px) scale(0.5)`,
                      opacity: 0,
                    },
                  },
                }}
              />
            ))}
        </Box>
      }
      sx={{
        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
        color: "#fff",
        px: 4,
        py: 1.5,
        fontWeight: 600,
        fontSize: "14px",
        borderRadius: "14px",
        boxShadow: "0 6px 16px rgba(67,97,238,0.3)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px) scale(1.05)",
          boxShadow: "0 12px 24px rgba(67,97,238,0.5)",
          background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`,
        },
      }}
    >
      <Box
        component="span"
        sx={{
          position: "relative",
          zIndex: 1,
          animation:
            phase === "preparing" ? "text-glow 3s ease-in-out" : "none",
          "@keyframes text-glow": {
            "0%": { textShadow: "0 0 0px rgba(255,255,255,0.4)" },
            "50%": { textShadow: "0 0 8px rgba(255,255,255,0.8)" },
            "100%": { textShadow: "0 0 0px rgba(255,255,255,0.4)" },
          },
        }}
      >
        {phase === "preparing"
          ? "Preparing Report..."
          : phase === "generating"
          ? "Generating PDF..."
          : "Download Report"}
      </Box>
    </Button>
  );
};

export default DownloadDashboardPDF;
