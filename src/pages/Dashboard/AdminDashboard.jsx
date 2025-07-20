import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  ShowChart,
  Category,
  CalendarToday,
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

// Dummy data for the dashboard
const currentMonthListings = 120;
const previousMonthListings = 109;
const growthRate =
  ((currentMonthListings - previousMonthListings) / previousMonthListings) *
  100;
const isGrowthPositive = growthRate >= 0;

// Dummy data for the chart
const chartData = [
  { month: "Jan", listings: 80 },
  { month: "Feb", listings: 95 },
  { month: "Mar", listings: 87 },
  { month: "Apr", listings: 109 },
  { month: "May", listings: 120 },
  { month: "Jun", listings: 150 },
];

// Dummy data for category breakdown
const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Home", value: 20 },
];

// Dummy data for today's products
const todayProductsData = [
  { name: "Home Products", value: 24 },
  { name: "Digital Products", value: 38 },
];

// Modern color palette
const COLORS = ["#6366F1", "#EC4899", "#8B5CF6", "#10B981", "#F59E0B"];
const PRODUCT_COLORS = ["#10B981", "#6366F1"];

function Dashboard() {
  const theme = useTheme();

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
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 700,
            background: "linear-gradient(90deg, #1a237e 0%, #534bae 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Analytics Dashboard
        </Typography>

        {/* Metric Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
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
                  {currentMonthListings}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isGrowthPositive ? "#10B981" : "#EF4444",
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 600,
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      bgcolor: isGrowthPositive
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    {isGrowthPositive ? (
                      <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    {Math.abs(growthRate).toFixed(1)}% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

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
                      bgcolor: isGrowthPositive
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      color: isGrowthPositive ? "#10B981" : "#EF4444",
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {isGrowthPositive ? <TrendingUp /> : <TrendingDown />}
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
                    color: isGrowthPositive ? "#10B981" : "#EF4444",
                  }}
                >
                  {growthRate.toFixed(1)}%
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Compared to {previousMonthListings} listings last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

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
                      bgcolor: "rgba(236, 72, 153, 0.1)",
                      color: "#EC4899",
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    $
                  </Avatar>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontWeight: 500 }}
                  >
                    Average Listing Price
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  $249.99
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 600,
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      bgcolor: "rgba(16, 185, 129, 0.1)",
                    }}
                  >
                    <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                    5.2% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
                action={
                  <IconButton sx={{ color: "#94a3b8" }}>
                    <MoreVert />
                  </IconButton>
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
                      data={chartData}
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
                action={
                  <IconButton sx={{ color: "#94a3b8" }}>
                    <MoreVert />
                  </IconButton>
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
                action={
                  <IconButton sx={{ color: "#94a3b8" }}>
                    <MoreVert />
                  </IconButton>
                }
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                  bgcolor: "rgba(248, 250, 252, 0.8)",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={todayProductsData}
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
                        {todayProductsData.map((entry, index) => (
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
