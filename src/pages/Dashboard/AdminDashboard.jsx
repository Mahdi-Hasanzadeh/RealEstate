import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  Category,
  CalendarToday,
  ThumbUp,
  RemoveShoppingCart,
  ReportProblem,
  HelpOutline,
  ExpandMore,
} from "@mui/icons-material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import DownloadDashboardPDF from "./PDF";

// Modern color palette
const COLORS = ["#6366F1", "#EC4899", "#8B5CF6", "#10B981", "#F59E0B"];
const PRODUCT_COLORS = ["#10B981", "#6366F1"];
const reasonIcons = {
  sold: <ThumbUp />,
  no_longer_selling: <RemoveShoppingCart />,
  incorrect_info: <ReportProblem />,
  other: <HelpOutline />,
};

const reasonColors = {
  sold: "#10B981",
  no_longer_selling: "#F59E0B",
  incorrect_info: "#EF4444",
  other: "#6366F1",
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    growth: 0,
    totalThisMonth: 0,
    totalLastMonth: 0,
    chartData: [],
    todayProductsData: [],
    deletionStats: {
      sold: 0,
      incorrect_info: 0,
      no_longer_selling: 0,
      other: 0,
    },
  });

  const [categoryData, setCategoryDate] = useState([
    { name: "Home", value: 0 },
    { name: "Digital", value: 0 },
  ]);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("api/dashboard");
      const data = response.data.data;
      setDashboardData(data);
      setCategoryDate([
        { name: "Home", value: data?.totalListings },
        { name: "Digital", value: data?.totalCellPhone + data?.totalComputers },
      ]);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {label}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {payload[0].value} {payload[0].name}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // makes it responsive
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #1a237e 0%, #534bae 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
              mb: { xs: 2, md: 0 }, // adds bottom margin only on small screens
            }}
          >
            Analytics Dashboard
          </Typography>

          <DownloadDashboardPDF dashboardData={dashboardData} />
        </Box>

        {/* Metric Cards */}

        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Listings Overview
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Total Listings This Month */}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-4px)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(99, 102, 241, 0.1)",
                          color: "#6366F1",
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        <ShowChart />
                      </Avatar>
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontWeight: 500 }}
                      >
                        Total Listings This Month
                      </Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {dashboardData.totalThisMonth}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            dashboardData.growth > 0 ? "#10B981" : "#EF4444",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 600,
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          bgcolor:
                            dashboardData.growth > 0
                              ? "rgba(16, 185, 129, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                        }}
                      >
                        {dashboardData.growth > 0 ? (
                          <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                        ) : (
                          <TrendingDown
                            color="error"
                            fontSize="small"
                            sx={{ mr: 0.5 }}
                          />
                        )}
                        {dashboardData.growth}% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Monthly Growth Rate */}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-4px)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: dashboardData.growth
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                          color: dashboardData.growth ? "#10B981" : "#EF4444",
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        {dashboardData.growth > 0 ? (
                          <TrendingUp />
                        ) : (
                          <TrendingDown color="error" />
                        )}
                      </Avatar>
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontWeight: 500 }}
                      >
                        Monthly Growth Rate
                      </Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: dashboardData.growth > 0 ? "#10B981" : "#EF4444",
                      }}
                    >
                      {dashboardData.growth}%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Compared to {dashboardData.totalLastMonth} listings last
                      month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Total Listings */}
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: 1,
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-4px)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(99, 102, 241, 0.1)",
                          color: "#6366F1",
                          width: 48,
                          height: 48,
                          mr: 2,
                        }}
                      >
                        <ShowChart />
                      </Avatar>
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontWeight: 500 }}
                      >
                        Total Listings
                      </Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {dashboardData.totalItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Deletion Reasons
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              {Object.keys(dashboardData?.deletionStats).map((reason) => {
                const count = dashboardData?.deletionStats[reason] || 0;
                return (
                  <Grid item xs={12} sm={6} md={4} key={reason}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 4,
                        p: 1,
                        height: "100%",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                        transition:
                          "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                          transform: "translateY(-4px)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: `${reasonColors[reason]}33`,
                              color: reasonColors[reason],
                              width: 48,
                              height: 48,
                              mr: 2,
                            }}
                          >
                            {reasonIcons[reason]}
                          </Avatar>
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                            sx={{ fontWeight: 500 }}
                          >
                            {reason
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{ fontWeight: 700 }}
                        >
                          {count}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday sx={{ mr: 1, color: "#6366F1" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Listing Activity (Last 6 Months)
                    </Typography>
                  </Box>
                }
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                  bgcolor: "rgba(248, 250, 252, 0.8)",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dashboardData.chartData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorListings"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{
                          paddingTop: 20,
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="listings"
                        stroke="#6366F1"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
                        activeDot={{ r: 8, strokeWidth: 0, fill: "#6366F1" }}
                        name="Listings"
                        fillOpacity={1}
                        fill="url(#colorListings)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                height: "100%",
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Category sx={{ mr: 1, color: "#8B5CF6" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Listings by Category
                    </Typography>
                  </Box>
                }
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                  bgcolor: "rgba(248, 250, 252, 0.8)",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                    "& .recharts-surface": {
                      outline: "none",
                    },
                    "& .recharts-sector:focus, & .recharts-sector:active": {
                      outline: "none",
                      stroke: "none",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart style={{ outline: "none" }}>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={90}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                        style={{ outline: "none" }}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            style={{ outline: "none" }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{
                          fontSize: 12,
                          paddingTop: 20,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Today's Products Chart */}
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday sx={{ mr: 1, color: "#10B981" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Products Posted Today
                    </Typography>
                  </Box>
                }
                // action={
                //   <IconButton sx={{ color: "#94a3b8" }}>
                //     <MoreVert />
                //   </IconButton>
                // }
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                  bgcolor: "rgba(248, 250, 252, 0.8)",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData.todayProductsData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                      barSize={60}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value, name) => [`${value}`, "Products"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                        labelStyle={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          paddingTop: 20,
                          fontSize: 12,
                        }}
                      />
                      <Bar
                        dataKey="value"
                        name="Number of Products"
                        radius={[4, 4, 0, 0]}
                      >
                        {dashboardData.todayProductsData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
