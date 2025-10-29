import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Search, Filter, Edit, Trash2 } from "lucide-react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Tech Fest 2024",
      date: "June 15, 2024",
      location: "Main Auditorium",
      participants: 450,
      status: "ongoing",
      category: "Technical",
    },
    {
      id: 2,
      title: "Cultural Night",
      date: "June 20, 2024",
      location: "Open Theatre",
      participants: 380,
      status: "upcoming",
      category: "Cultural",
    },
    {
      id: 3,
      title: "Sports Championship",
      date: "June 25, 2024",
      location: "Sports Complex",
      participants: 320,
      status: "upcoming",
      category: "Sports",
    },
    {
      id: 4,
      title: "Annual Hackathon",
      date: "May 28, 2024",
      location: "Computer Lab",
      participants: 280,
      status: "completed",
      category: "Technical",
    },
    {
      id: 5,
      title: "Workshop on AI",
      date: "June 30, 2024",
      location: "Seminar Hall",
      participants: 150,
      status: "upcoming",
      category: "Workshop",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-secondary/20 text-secondary";
      case "upcoming":
        return "bg-primary/20 text-primary";
      case "completed":
        return "bg-muted-foreground/20 text-muted-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Event Management</h1>
          <p className="text-muted-foreground">Create, manage, and track all college events</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card 
            key={event.id} 
            className="card-shadow border-0 hover:shadow-2xl transition-all duration-300 group animate-fade-in hover-scale"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {event.participants} participants
              </div>
              <div className="pt-3 border-t border-border">
                <Badge variant="outline">{event.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
