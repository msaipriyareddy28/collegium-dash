import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Send } from "lucide-react";

const Notifications = () => {
  const recentNotifications = [
    {
      id: 1,
      title: "Tech Fest Registration Open",
      message: "Register now for the annual Tech Fest 2024. Limited seats available!",
      date: "2 hours ago",
      recipients: "All Students",
    },
    {
      id: 2,
      title: "Library Closure Notice",
      message: "The library will be closed on Sunday for maintenance work.",
      date: "1 day ago",
      recipients: "All Students",
    },
    {
      id: 3,
      title: "Sports Day Schedule",
      message: "Sports Day events will commence from 9 AM on June 25th.",
      date: "2 days ago",
      recipients: "Sports Department",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Notifications</h1>
        <p className="text-muted-foreground">Send announcements and alerts to students</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Send Notification Form */}
        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send New Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Notification title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input id="recipients" placeholder="All Students / Department" />
            </div>
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {notification.recipients}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
