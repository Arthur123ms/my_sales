export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  update_at: Date;
  avatar: string;
  getAvatarUrl(): string | null;
}
