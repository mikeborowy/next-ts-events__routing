export type EventModel = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type CommentModel = {
  _id?: string;
  email: string;
  name: string;
  text: string;
  eventId?: string;
};

export type NewsletterModel = {
  email: string;
};

export type StatusType = "success" | "pending" | "error";

export type NotificationModel = {
  title: string;
  status: StatusType;
  message: string;
};
