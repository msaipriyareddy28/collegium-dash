import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Mail, Phone } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@college.edu",
      phone: "+91 98765 43210",
      department: "Computer Science",
      year: "3rd Year",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      phone: "+91 98765 43211",
      department: "Electronics",
      year: "2nd Year",
      status: "active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@college.edu",
      phone: "+91 98765 43212",
      department: "Mechanical",
      year: "4th Year",
      status: "active",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@college.edu",
      phone: "+91 98765 43213",
      department: "Civil",
      year: "1st Year",
      status: "active",
    },
    {
      id: 5,
      name: "Arjun Singh",
      email: "arjun.singh@college.edu",
      phone: "+91 98765 43214",
      department: "Computer Science",
      year: "3rd Year",
      status: "inactive",
    },
    {
      id: 6,
      name: "Riya Verma",
      email: "riya.verma@college.edu",
      phone: "+91 98765 43215",
      department: "Electronics",
      year: "2nd Year",
      status: "active",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Students & Users</h1>
        <p className="text-muted-foreground">Manage all registered college users</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or department..."
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

      {/* Users List */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle>All Students ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-gradient-primary">
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {user.department}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{user.year}</p>
                  </div>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
