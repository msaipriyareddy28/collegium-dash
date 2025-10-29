import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Calendar, Award } from "lucide-react";

const Reports = () => {
  const monthlyParticipation = [
    { month: "Jan", participants: 320, events: 8 },
    { month: "Feb", participants: 450, events: 10 },
    { month: "Mar", participants: 580, events: 12 },
    { month: "Apr", participants: 490, events: 9 },
    { month: "May", participants: 720, events: 15 },
    { month: "Jun", participants: 850, events: 18 },
  ];

  const departmentData = [
    { name: "Computer Science", value: 450 },
    { name: "Electronics", value: 380 },
    { name: "Mechanical", value: 320 },
    { name: "Civil", value: 280 },
    { name: "Others", value: 150 },
  ];

  const categoryData = [
    { name: "Technical", participants: 1200 },
    { name: "Cultural", participants: 900 },
    { name: "Sports", participants: 750 },
    { name: "Workshop", participants: 450 },
  ];

  const COLORS = ["hsl(248, 73%, 65%)", "hsl(195, 100%, 50%)", "hsl(220, 100%, 60%)", "hsl(280, 73%, 65%)", "hsl(160, 100%, 50%)"];

  const stats = [
    {
      title: "Avg. Participation",
      value: "520",
      subtitle: "per event",
      icon: Users,
      change: "+15%",
    },
    {
      title: "Total Events",
      value: "72",
      subtitle: "this year",
      icon: Calendar,
      change: "+23%",
    },
    {
      title: "Engagement Rate",
      value: "87%",
      subtitle: "overall",
      icon: TrendingUp,
      change: "+8%",
    },
    {
      title: "Top Performer",
      value: "CS Dept",
      subtitle: "most active",
      icon: Award,
      change: "450 students",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">View participation stats and event engagement</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-shadow border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-primary">
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              <p className="text-xs text-primary mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle>Monthly Participation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyParticipation}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  name="Participants"
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                  name="Events"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle>Department-wise Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="participants" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
