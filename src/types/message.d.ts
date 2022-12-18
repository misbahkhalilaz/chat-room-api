export interface Message {
  message: string;
  fromUserName: string;
  toUserName: string;
  isRead: boolean;
}

export interface MessagePayload {
  message: string;
  toUserName: string;
}
