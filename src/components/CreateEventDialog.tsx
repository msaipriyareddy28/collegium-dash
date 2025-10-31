import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus, CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createEvent } from "@/lib/api";

interface CreateEventDialogProps {
  trigger?: React.ReactNode;
  onEventCreated?: () => void;
}

const CreateEventDialog = ({ trigger, onEventCreated }: CreateEventDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
    maxParticipants: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !date || !formData.location || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await createEvent({
        title: formData.title,
        date: date.toISOString(),
        category: formData.category,
        location: formData.location,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        description: formData.description,
      });
      
      toast.success("Event created successfully!", {
        description: `${formData.title} has been scheduled for ${format(date, "PPP")}`,
      });
      
      // Reset form
      setFormData({
        title: "",
        location: "",
        category: "",
        description: "",
        maxParticipants: "",
      });
      setDate(undefined);
      setOpen(false);
      
      // Refresh events list
      if (onEventCreated) {
        onEventCreated();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new college event
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Tech Fest 2024"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Date and Category Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location and Max Participants */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Main Auditorium"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                placeholder="e.g., 500"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the event, its objectives, and what participants can expect..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Event Banner Upload */}
          <div className="space-y-2">
            <Label htmlFor="banner">Event Banner</Label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Banner Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended size: 1200x600px (JPG, PNG)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
