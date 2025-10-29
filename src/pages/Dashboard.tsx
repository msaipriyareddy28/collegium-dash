import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Events",
      value: "48",
      change: "+12%",
      icon: Calendar,
      gradient: "from-violet-500 to-cyan-500",
    },
    {
      title: "Total Students",
      value: "2,847",
      change: "+8%",
      icon: Users,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Ongoing Events",
      value: "5",
      change: "Active",
      icon: TrendingUp,
      gradient: "from-blue-500 to-violet-500",
    },
    {
      title: "Upcoming Events",
      value: "12",
      change: "This month",
      icon: CheckCircle2,
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const participationData = [
    { month: "Jan", participants: 320 },
    { month: "Feb", participants: 450 },
    { month: "Mar", participants: 580 },
    { month: "Apr", participants: 490 },
    { month: "May", participants: 720 },
    { month: "Jun", participants: 850 },
  ];

  const eventData = [
    { name: "Tech Fest", participants: 450 },
    { name: "Cultural Night", participants: 380 },
    { name: "Sports Day", participants: 320 },
    { name: "Hackathon", participants: 280 },
    { name: "Workshop", participants: 150 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="card-shadow border-0 hover:shadow-2xl transition-all duration-300 animate-fade-in hover-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle>Participation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
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
                <Line 
                  type="monotone" 
                  dataKey="participants" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle>Event Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventData}>
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
                <Bar 
                  dataKey="participants" 
                  fill="url(#gradient)" 
                  radius={[8, 8, 0, 0]}
                />
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

      {/* Recent Events */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Tech Fest 2024", date: "June 15, 2024", status: "Ongoing", participants: 450 },
              { name: "Cultural Night", date: "June 20, 2024", status: "Upcoming", participants: 380 },
              { name: "Sports Championship", date: "June 25, 2024", status: "Upcoming", participants: 320 },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{event.participants} participants</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.status === "Ongoing" 
                      ? "bg-secondary/20 text-secondary" 
                      : "bg-primary/20 text-primary"
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
