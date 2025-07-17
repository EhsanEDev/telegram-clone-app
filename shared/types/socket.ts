export interface BasePayload {
  from: string;
  text: string;
  time: string;
}

export type RegisterUserPayload = Pick<BasePayload, "from">;

export interface PrivateMessagePayload extends BasePayload {
  to: string;
}

export interface GroupMessagePayload extends BasePayload {
  room: string;
}
